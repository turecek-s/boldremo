// Twilio inbound SMS webhook → log message → draft AI reply → queue for approval.
// Inbound messages from OWNER_PHONE are treated as approval commands, not lead messages.
//
// Required env vars (set in Supabase Dashboard → Edge Functions → Secrets):
//   ANTHROPIC_API_KEY
//   TWILIO_ACCOUNT_SID
//   TWILIO_AUTH_TOKEN
//   TWILIO_PHONE_NUMBER   (your Twilio number, e.g. +17135550100)
//   OWNER_PHONE           (your number, e.g. +18325135737 — commands from this number are processed)
//
// Owner commands (reply to any notification text):
//   Y [code]  or  YES [code]  — approve and send the draft as-is
//   N [code]  or  NO  [code]  — discard the draft
//   Anything else             — returns a short help message
//
// Twilio webhook URL: https://<project-ref>.supabase.co/functions/v1/receive-sms
// Set in Twilio Console → Phone Numbers → Active Numbers → Messaging → Webhook (HTTP POST)

import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js";

const SYSTEM_PROMPT = `You are drafting a text message reply for Stan Turecek, owner of BoldREMO LLC — a luxury bathroom remodeling company in Houston, TX.

Tone: casual, direct, customer-first. Write exactly like Stan texts — friendly but professional, short sentences, no corporate speak, no exclamation marks every sentence.

Hard rules — never break these:
- Never quote a specific price or dollar amount, not even a ballpark
- Never confirm a specific date or time without checking Stan's calendar first; instead say you'll check and get back to them
- Never make promises about warranty coverage, project scope, or what's included
- Never guarantee a timeline
- If the question is complex, technical, or needs a nuanced answer, end with: "Want me to give you a call and walk you through it?"
- Do not sign as "Stan, BoldREMO" unless this appears to be the very first exchange

Keep it concise: 2–4 sentences max. Match the lead's energy — if they're brief, be brief. If they wrote a paragraph, a couple sentences is still fine.

Output only the reply text. No quotes, no preamble, no explanation.`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/** First 6 hex chars of a UUID (no dashes), uppercased — short enough to type back. */
function shortCode(id: string): string {
  return id.replace(/-/g, "").slice(0, 6).toUpperCase();
}

/** Escape special XML characters so they're safe inside a TwiML <Message> element. */
function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Return a TwiML response. If replyBody is provided, Twilio sends it as a reply to the inbound message. */
function twiml(replyBody?: string): Response {
  const content = replyBody
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(replyBody)}</Message></Response>`
    : `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
  return new Response(content, { headers: { ...corsHeaders, "Content-Type": "text/xml" } });
}

/** Send an outbound SMS via Twilio REST API. Returns true on success. */
async function sendTwilioSms(
  sid: string,
  token: string,
  from: string,
  to: string,
  body: string,
): Promise<boolean> {
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }),
    },
  );
  if (!res.ok) console.error("Twilio send failed:", await res.text());
  return res.ok;
}

// deno-lint-ignore no-explicit-any
async function handleOwnerCommand(cmdBody: string, supabase: any): Promise<Response> {
  const upper = cmdBody.toUpperCase().trim();
  const match = upper.match(/^(Y(?:ES)?|N(?:O)?)\s+([A-F0-9]{6})$/);

  if (!match) {
    return twiml("Commands:\nY [code] — approve & send\nN [code] — discard");
  }

  const [, cmd, code] = match;
  const approve = cmd.startsWith("Y");

  // Fetch all pending replies to find the one matching the short code
  const { data: replies } = await supabase
    .from("pending_replies")
    .select("id, draft_body, lead:leads(id, phone, first_name)")
    .eq("status", "pending");

  // deno-lint-ignore no-explicit-any
  const pr = (replies ?? []).find((r: any) => shortCode(r.id) === code);

  if (!pr) {
    return twiml(`No pending reply for code ${code} — it may have already been handled.`);
  }

  if (!approve) {
    await supabase.from("pending_replies").update({ status: "discarded" }).eq("id", pr.id);
    return twiml(`Discarded draft for ${pr.lead.first_name}.`);
  }

  const phone = pr.lead?.phone;
  if (!phone) return twiml(`${pr.lead.first_name} has no phone number on file.`);

  const sid = Deno.env.get("TWILIO_ACCOUNT_SID")!;
  const token = Deno.env.get("TWILIO_AUTH_TOKEN")!;
  const from = Deno.env.get("TWILIO_PHONE_NUMBER")!;

  const sent = await sendTwilioSms(sid, token, from, phone, pr.draft_body);
  if (!sent) return twiml("SMS failed to deliver. Try again or open the app to edit and send.");

  await supabase.from("sms_log").insert({
    lead_id: pr.lead.id,
    body: pr.draft_body,
    direction: "outbound",
    sent_at: new Date().toISOString(),
  });

  await supabase.from("pending_replies").update({ status: "approved" }).eq("id", pr.id);

  return twiml(`Sent to ${pr.lead.first_name}.`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Twilio sends form-encoded POST
  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return twiml(); // malformed request — return empty TwiML so Twilio doesn't retry endlessly
  }

  const from = formData.get("From")?.toString() ?? "";
  const body = formData.get("Body")?.toString().trim() ?? "";

  if (!from || !body) return twiml();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Normalize to last 10 digits for comparison
  const fromDigits = from.replace(/\D/g, "").slice(-10);
  const ownerDigits = (Deno.env.get("OWNER_PHONE") ?? "").replace(/\D/g, "").slice(-10);

  // Route owner commands before any lead logic
  if (ownerDigits && fromDigits === ownerDigits) {
    return handleOwnerCommand(body, supabase);
  }

  // --- Lead inbound flow ---

  // Match lead by phone — strip formatting and match on last 10 digits
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .ilike("phone", `%${fromDigits}%`);

  const lead = leads?.[0] ?? null;

  // Log inbound message (lead_id may be null if no match)
  const { data: smsRow } = await supabase
    .from("sms_log")
    .insert({
      lead_id: lead?.id ?? null,
      body,
      direction: "inbound",
      sent_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  // Only draft a reply when we can match a lead
  if (lead && smsRow) {
    try {
      // Full conversation history for context
      const { data: history } = await supabase
        .from("sms_log")
        .select("body, direction, sent_at")
        .eq("lead_id", lead.id)
        .order("sent_at", { ascending: true });

      const conversation = (history ?? [])
        .map((m: { direction: string; body: string }) =>
          `${m.direction === "inbound" ? "THEM" : "STAN"}: ${m.body}`
        )
        .join("\n");

      const userMessage =
        `Lead: ${lead.first_name}${lead.last_name ? " " + lead.last_name : ""}` +
        `\nCurrent stage: ${lead.stage}` +
        `\nLead notes: ${lead.notes ?? "None"}` +
        `\n\nConversation so far:\n${conversation}` +
        `\n\nDraft a reply to their most recent message.`;

      const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY")! });
      const response = await anthropic.messages.create({
        model: "claude-sonnet-5",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      });

      const draft =
        response.content[0]?.type === "text" ? response.content[0].text.trim() : "";

      if (draft) {
        const { data: pendingRow } = await supabase
          .from("pending_replies")
          .insert({
            lead_id: lead.id,
            inbound_sms_id: smsRow.id,
            draft_body: draft,
          })
          .select("id")
          .single();

        // Notify owner via SMS
        if (pendingRow && ownerDigits) {
          const ownerPhone = Deno.env.get("OWNER_PHONE")!;
          const sid = Deno.env.get("TWILIO_ACCOUNT_SID")!;
          const token = Deno.env.get("TWILIO_AUTH_TOKEN")!;
          const twilioNum = Deno.env.get("TWILIO_PHONE_NUMBER")!;

          const code = shortCode(pendingRow.id);
          const preview = draft.length > 100 ? draft.slice(0, 97) + "…" : draft;
          const notification =
            `${lead.first_name} texted. Draft [${code}]:\n${preview}\n\nY ${code} to send · N ${code} to discard`;

          await sendTwilioSms(sid, token, twilioNum, ownerPhone, notification);
        }
      }
    } catch (err) {
      // Log but don't crash — Twilio still needs a 200 response
      console.error("AI draft error:", err);
    }
  }

  return twiml();
});
