// Twilio inbound SMS webhook — classify, route, and optionally draft a reply.
//
// Three-tier AI routing:
//   Tier 1 — auto-send immediately (basic info requests, general range questions, acks)
//   Tier 2 — queue for owner approval via Y/N SMS (firm details, complaints, negotiation)
//   Tier 3 — create a task, no reply (ready to book, ready to approve, judgment calls)
//
// Owner inbound messages (OWNER_PHONE) are treated as Tier 2 approval commands.
//
// Required env vars (Supabase Dashboard → Edge Functions → Secrets):
//   ANTHROPIC_API_KEY
//   TWILIO_ACCOUNT_SID
//   TWILIO_AUTH_TOKEN
//   TWILIO_PHONE_NUMBER   (your Twilio number, e.g. +17135550100)
//   OWNER_PHONE           (your number, e.g. +18325135737)
//
// Pricing guidance is loaded from the app_config table (key: pricing_guidance).
// Update that row to change ranges without redeploying this function.
//
// Twilio webhook URL: https://<project-ref>.supabase.co/functions/v1/receive-sms

import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function shortCode(id: string): string {
  return id.replace(/-/g, "").slice(0, 6).toUpperCase();
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function twiml(replyBody?: string): Response {
  const content = replyBody
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(replyBody)}</Message></Response>`
    : `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
  return new Response(content, { headers: { ...corsHeaders, "Content-Type": "text/xml" } });
}

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

// ---------------------------------------------------------------------------
// AI classification + draft (single call, returns structured JSON)
// ---------------------------------------------------------------------------

interface Classification {
  tier: 1 | 2 | 3;
  reason: string;
  draft?: string;
  task_title?: string;
}

async function classify(
  lead: Record<string, unknown>,
  conversation: string,
  pricingGuidance: string,
): Promise<Classification> {
  const systemPrompt = `You are an AI assistant for BoldREMO LLC, a luxury bathroom remodeling company in Houston, TX.
Classify the inbound lead SMS and, for Tiers 1–2, draft a reply.

PRICING GUIDANCE (use only in Tier 1 replies — never in Tier 2 or 3):
${pricingGuidance}

TIER CLASSIFICATION RULES:

Tier 1 — Auto-send immediately (no approval needed):
• Lead is requesting basic info to help prepare an estimate: square footage, current layout, fixture preferences, photo requests, project scope questions
• Lead asks a general cost-range question you can answer from the pricing guidance above
• Simple acknowledgment, greeting, thank-you, or request to schedule a call
• Clearly low-stakes, routine exchange where a fast reply builds trust

Tier 2 — Queue for owner approval before sending:
• Anything touching a specific/firm price, date, or contract term
• Complaints or signs of dissatisfaction
• Negotiation attempts ("can you do cheaper?", "another contractor quoted me X")
• Warranty, liability, or guarantee questions
• ANY uncertainty about classification — default to Tier 2, never guess Tier 1

Tier 3 — Create a task for the owner, do NOT draft a reply:
• Lead wants to schedule a site visit, walk-through, or in-person meeting
• Lead is ready to approve, sign, or pay a deposit
• A cold/stalled lead resurfacing with clear intent to move forward
• Any situation requiring a judgment call only a person should make

REPLY STYLE (Tiers 1 and 2 only):
Casual, direct, customer-first. Write like Stan texts — friendly but professional, short sentences, no corporate speak. 2–4 sentences max, match the lead's energy.
Hard rules:
- For range questions use the pricing guidance above; always phrase as "typically ranges from X to Y depending on materials and scope" — never a firm number
- Never confirm a specific date or time; say you'll check and get back to them
- Never promise warranty coverage, project scope, or timeline
- For complex/technical questions end with: "Want me to give you a call and walk you through it?"
- Sign as "Stan, BoldREMO" only if this appears to be the very first exchange

OUTPUT FORMAT — respond with a single JSON object only. No markdown fences, no extra text:
{"tier":1,"reason":"one-sentence explanation","draft":"reply text"}

For Tier 3, use task_title instead of draft:
{"tier":3,"reason":"one-sentence explanation","task_title":"Descriptive task title for the owner"}`;

  const userMessage =
    `Lead: ${lead.first_name}${lead.last_name ? " " + lead.last_name : ""}` +
    `\nCurrent stage: ${lead.stage}` +
    `\nLead notes: ${lead.notes ?? "None"}` +
    `\n\nConversation so far:\n${conversation}` +
    `\n\nClassify the lead's most recent message and respond per the instructions above.`;

  const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY")! });
  const response = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 512,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const raw = response.content[0]?.type === "text" ? response.content[0].text.trim() : "";

  // Strip any accidental markdown fences before parsing
  const json = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
  const parsed = JSON.parse(json) as Classification;

  if (![1, 2, 3].includes(parsed.tier)) throw new Error(`Invalid tier: ${parsed.tier}`);
  return parsed;
}

// ---------------------------------------------------------------------------
// Owner command handler (Y/N [code])
// ---------------------------------------------------------------------------

// deno-lint-ignore no-explicit-any
async function handleOwnerCommand(cmdBody: string, supabase: any): Promise<Response> {
  const upper = cmdBody.toUpperCase().trim();
  const match = upper.match(/^(Y(?:ES)?|N(?:O)?)\s+([A-F0-9]{6})$/);

  if (!match) {
    return twiml("Commands:\nY [code] — approve & send\nN [code] — discard");
  }

  const [, cmd, code] = match;
  const approve = cmd.startsWith("Y");

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

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const formData = await req.formData().catch(() => null);
  if (!formData) return twiml();

  const from = formData.get("From")?.toString() ?? "";
  const body = formData.get("Body")?.toString().trim() ?? "";

  if (!from || !body) return twiml();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const fromDigits = from.replace(/\D/g, "").slice(-10);
  const ownerDigits = (Deno.env.get("OWNER_PHONE") ?? "").replace(/\D/g, "").slice(-10);

  // Route owner commands before any lead logic
  if (ownerDigits && fromDigits === ownerDigits) {
    return handleOwnerCommand(body, supabase);
  }

  // Match lead by phone (last 10 digits)
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .ilike("phone", `%${fromDigits}%`);

  const lead = leads?.[0] ?? null;

  // Log inbound (tier set after classification; nullable until then)
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

  if (!lead || !smsRow) return twiml();

  try {
    // Load pricing guidance from runtime config
    const { data: configRow } = await supabase
      .from("app_config")
      .select("value")
      .eq("key", "pricing_guidance")
      .single();
    const pricingGuidance = configRow?.value ?? "(pricing guidance not configured)";

    // Conversation history for context
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

    const cl = await classify(lead, conversation, pricingGuidance);

    // Record tier on the inbound log row
    await supabase
      .from("sms_log")
      .update({ ai_tier: cl.tier, ai_tier_reason: cl.reason })
      .eq("id", smsRow.id);

    const sid = Deno.env.get("TWILIO_ACCOUNT_SID")!;
    const token = Deno.env.get("TWILIO_AUTH_TOKEN")!;
    const twilioNum = Deno.env.get("TWILIO_PHONE_NUMBER")!;
    const ownerPhone = Deno.env.get("OWNER_PHONE")!;

    // -----------------------------------------------------------------------
    if (cl.tier === 1 && cl.draft) {
      // Auto-send — no approval needed
      const sent = await sendTwilioSms(sid, token, twilioNum, lead.phone, cl.draft);

      if (sent) {
        await supabase.from("sms_log").insert({
          lead_id: lead.id,
          body: cl.draft,
          direction: "outbound",
          sent_at: new Date().toISOString(),
        });

        // Low-priority FYI — no code, no action needed
        const preview = cl.draft.length > 100 ? cl.draft.slice(0, 97) + "…" : cl.draft;
        await sendTwilioSms(
          sid, token, twilioNum, ownerPhone,
          `Auto-sent to ${lead.first_name}: "${preview}"`,
        );
      }
    }

    // -----------------------------------------------------------------------
    else if (cl.tier === 2 && cl.draft) {
      // Queue for approval
      const { data: pendingRow } = await supabase
        .from("pending_replies")
        .insert({
          lead_id: lead.id,
          inbound_sms_id: smsRow.id,
          draft_body: cl.draft,
        })
        .select("id")
        .single();

      if (pendingRow) {
        const code = shortCode(pendingRow.id);
        const preview = cl.draft.length > 100 ? cl.draft.slice(0, 97) + "…" : cl.draft;
        await sendTwilioSms(
          sid, token, twilioNum, ownerPhone,
          `${lead.first_name} texted. Draft [${code}]:\n${preview}\n\nY ${code} to send · N ${code} to discard`,
        );
      }
    }

    // -----------------------------------------------------------------------
    else if (cl.tier === 3) {
      // Create a task — no reply to lead
      const taskTitle = cl.task_title ?? `Follow up with ${lead.first_name}: ${cl.reason}`;
      await supabase.from("tasks").insert({
        lead_id: lead.id,
        title: taskTitle,
        type: "follow-up",
        due_date: new Date().toISOString().split("T")[0],
      });

      await sendTwilioSms(
        sid, token, twilioNum, ownerPhone,
        `Ticket created for ${lead.first_name}: ${cl.reason} Check app.`,
      );
    }
  } catch (err) {
    console.error("SMS routing error:", err);
    // Fall back to Tier 2 queue manually? No — just log and return.
    // Twilio still needs a 200 response.
  }

  return twiml();
});
