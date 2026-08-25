// Send an approved reply via Twilio and log it to sms_log.
//
// Required env vars:
//   TWILIO_ACCOUNT_SID
//   TWILIO_AUTH_TOKEN
//   TWILIO_PHONE_NUMBER   (your Twilio number, e.g. +17135550100)
//
// Called by the app when user taps Approve (or Edit + Approve).
// Body: { pending_reply_id: string, final_body: string }

import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pending_reply_id, final_body } = await req.json();

    if (!pending_reply_id || !final_body?.trim()) {
      return json({ error: "pending_reply_id and final_body are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Fetch the pending reply + lead phone in one query
    const { data: pr, error } = await supabase
      .from("pending_replies")
      .select("*, lead:leads(id, phone)")
      .eq("id", pending_reply_id)
      .eq("status", "pending")
      .single();

    if (error || !pr) return json({ error: "Not found or already processed" }, 404);

    const phone = pr.lead?.phone;
    if (!phone) return json({ error: "Lead has no phone number" }, 400);

    // Send via Twilio REST API
    const sid = Deno.env.get("TWILIO_ACCOUNT_SID")!;
    const token = Deno.env.get("TWILIO_AUTH_TOKEN")!;
    const from = Deno.env.get("TWILIO_PHONE_NUMBER")!;

    const twilioRes = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
        },
        body: new URLSearchParams({ From: from, To: phone, Body: final_body.trim() }),
      },
    );

    if (!twilioRes.ok) {
      const errText = await twilioRes.text();
      console.error("Twilio send failed:", errText);
      return json({ error: "SMS delivery failed" }, 502);
    }

    const trimmedBody = final_body.trim();

    // Log outbound message
    await supabase.from("sms_log").insert({
      lead_id: pr.lead.id,
      body: trimmedBody,
      direction: "outbound",
      sent_at: new Date().toISOString(),
    });

    // Mark reply approved; capture edit if user changed the draft
    await supabase
      .from("pending_replies")
      .update({
        status: "approved",
        edited_body: trimmedBody !== pr.draft_body ? trimmedBody : null,
      })
      .eq("id", pending_reply_id);

    return json({ success: true });
  } catch (err) {
    console.error("send-sms error:", err);
    return json({ error: "Internal error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
