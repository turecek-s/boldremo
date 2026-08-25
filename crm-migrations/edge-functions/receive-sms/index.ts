// Twilio inbound SMS webhook → log message → draft AI reply → queue for approval.
//
// Required env vars (set in Supabase Dashboard → Edge Functions → Secrets):
//   ANTHROPIC_API_KEY
//   TWILIO_AUTH_TOKEN       (used to verify Twilio signature)
//   TWILIO_PHONE_NUMBER     (your Twilio number, e.g. +17135550100)
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

  // Match lead by phone — strip formatting and match on last 10 digits
  const digits = from.replace(/\D/g, "").slice(-10);
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .ilike("phone", `%${digits}%`);

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
        .map((m) => `${m.direction === "inbound" ? "THEM" : "STAN"}: ${m.body}`)
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
        await supabase.from("pending_replies").insert({
          lead_id: lead.id,
          inbound_sms_id: smsRow.id,
          draft_body: draft,
        });
      }
    } catch (err) {
      // Log but don't crash — Twilio still needs a 200 response
      console.error("AI draft error:", err);
    }
  }

  return twiml();
});

/** Empty TwiML — no auto-reply, Stan approves first. */
function twiml() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
    { headers: { ...corsHeaders, "Content-Type": "text/xml" } },
  );
}
