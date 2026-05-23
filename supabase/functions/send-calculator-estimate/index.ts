import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BreakdownSchema = z.object({
  labor: z.number(),
  tile: z.number(),
  fixtures: z.number(),
  vanity: z.number(),
  plumbing: z.number(),
  contingency: z.number(),
});

const RequestSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255),
  inputs: z.object({
    size: z.enum(["half", "small", "standard", "large"]),
    scope: z.enum(["refresh", "midrange", "luxury"]),
    neighborhood: z.enum(["houston", "heights", "bellaire", "river-oaks", "kingwood", "memorial", "other"]),
    shower: z.enum(["keep", "standard", "walk-in", "walk-in-custom"]),
    vanityCount: z.enum(["single", "double"]),
    tileGrade: z.enum(["ceramic", "porcelain", "stone"]),
    plumbing: z.enum(["none", "minor", "major"]),
  }),
  result: z.object({
    low: z.number().int().nonnegative(),
    high: z.number().int().nonnegative(),
    breakdown: BreakdownSchema,
    summary: z.string(),
  }),
  website: z.string().optional(), // honeypot
});

// Rate limit
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) return false;
  record.count++;
  return true;
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const SIZE_LABELS: Record<string, string> = {
  half: "Half bath (~25 sq ft)",
  small: "Small full bath (~40 sq ft)",
  standard: "Standard bathroom (~60 sq ft)",
  large: "Large master bath (~100+ sq ft)",
};
const SCOPE_LABELS: Record<string, string> = {
  refresh: "Refresh",
  midrange: "Mid-range remodel",
  luxury: "Full luxury renovation",
};
const NEIGHBORHOOD_LABELS: Record<string, string> = {
  houston: "Houston",
  heights: "The Heights",
  bellaire: "Bellaire",
  "river-oaks": "River Oaks",
  kingwood: "Kingwood",
  memorial: "Memorial",
  other: "Greater Houston",
};
const SHOWER_LABELS: Record<string, string> = {
  keep: "Keep existing shower",
  standard: "New standard shower",
  "walk-in": "Walk-in glass shower",
  "walk-in-custom": "Walk-in with custom tile",
};
const VANITY_LABELS: Record<string, string> = {
  single: "Single vanity",
  double: "Double vanity",
};
const TILE_LABELS: Record<string, string> = {
  ceramic: "Standard ceramic",
  porcelain: "Porcelain",
  stone: "Natural stone or marble",
};
const PLUMBING_LABELS: Record<string, string> = {
  none: "None",
  minor: "Minor",
  major: "Major (move fixtures)",
};

const BREAKDOWN_LABELS: Record<string, string> = {
  labor: "Labor & Installation",
  tile: "Tile & Stone",
  fixtures: "Fixtures & Lighting",
  vanity: "Vanity & Cabinetry",
  plumbing: "Plumbing Changes",
  contingency: "12% Contingency",
};

function generateCustomerEmail(name: string, inputs: any, result: any): string {
  const safeName = escapeHtml(name);
  const breakdownRows = Object.entries(result.breakdown)
    .map(([key, value]) => {
      const label = BREAKDOWN_LABELS[key] || key;
      return `<tr><td style="padding:14px 20px;border-bottom:1px solid #e8e5e0;color:#4a5568;font-family:'Segoe UI',sans-serif;">${label}</td><td style="padding:14px 20px;border-bottom:1px solid #e8e5e0;text-align:right;font-weight:600;color:#1a365d;font-family:'Segoe UI',sans-serif;">$${(value as number).toLocaleString()}</td></tr>`;
    })
    .join("");

  const inputRows = `
    <tr><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;color:#718096;font-size:13px;font-family:'Segoe UI',sans-serif;">Bathroom size</td><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;text-align:right;color:#1a365d;font-size:13px;font-family:'Segoe UI',sans-serif;">${SIZE_LABELS[inputs.size] || inputs.size}</td></tr>
    <tr><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;color:#718096;font-size:13px;font-family:'Segoe UI',sans-serif;">Scope</td><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;text-align:right;color:#1a365d;font-size:13px;font-family:'Segoe UI',sans-serif;">${SCOPE_LABELS[inputs.scope] || inputs.scope}</td></tr>
    <tr><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;color:#718096;font-size:13px;font-family:'Segoe UI',sans-serif;">Neighborhood</td><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;text-align:right;color:#1a365d;font-size:13px;font-family:'Segoe UI',sans-serif;">${NEIGHBORHOOD_LABELS[inputs.neighborhood] || inputs.neighborhood}</td></tr>
    <tr><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;color:#718096;font-size:13px;font-family:'Segoe UI',sans-serif;">Shower</td><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;text-align:right;color:#1a365d;font-size:13px;font-family:'Segoe UI',sans-serif;">${SHOWER_LABELS[inputs.shower] || inputs.shower}</td></tr>
    <tr><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;color:#718096;font-size:13px;font-family:'Segoe UI',sans-serif;">Vanity</td><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;text-align:right;color:#1a365d;font-size:13px;font-family:'Segoe UI',sans-serif;">${VANITY_LABELS[inputs.vanityCount] || inputs.vanityCount}</td></tr>
    <tr><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;color:#718096;font-size:13px;font-family:'Segoe UI',sans-serif;">Tile grade</td><td style="padding:10px 16px;border-bottom:1px solid #e8e5e0;text-align:right;color:#1a365d;font-size:13px;font-family:'Segoe UI',sans-serif;">${TILE_LABELS[inputs.tileGrade] || inputs.tileGrade}</td></tr>
    <tr><td style="padding:10px 16px;color:#718096;font-size:13px;font-family:'Segoe UI',sans-serif;">Plumbing changes</td><td style="padding:10px 16px;text-align:right;color:#1a365d;font-size:13px;font-family:'Segoe UI',sans-serif;">${PLUMBING_LABELS[inputs.plumbing] || inputs.plumbing}</td></tr>
  `;

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Your Bathroom Remodel Estimate</title></head>
<body style="margin:0;padding:0;font-family:Georgia,'Times New Roman',serif;background-color:#faf9f7;color:#2d3748;">
  <div style="max-width:640px;margin:0 auto;background-color:#ffffff;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1a365d 0%,#2c5282 100%);padding:48px 40px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:400;letter-spacing:3px;">BOLDREMO</h1>
      <div style="width:60px;height:1px;background-color:#c9a227;margin:16px auto;"></div>
      <p style="margin:0;color:#c9a227;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Your Bathroom Remodel Estimate</p>
    </div>
    <div style="padding:48px 44px;">
      <p style="font-size:20px;margin:0 0 24px;color:#1a365d;">Dear ${safeName},</p>
      <p style="font-size:16px;line-height:1.8;margin:0 0 32px;color:#4a5568;font-family:'Segoe UI',sans-serif;">
        Here's your printable estimate for your Houston bathroom remodel project, based on the inputs you provided. This range reflects current Houston-area labor and material costs.
      </p>

      <div style="background:linear-gradient(135deg,#fefcf3 0%,#faf6eb 100%);padding:32px;border-radius:4px;border-left:4px solid #c9a227;text-align:center;margin-bottom:36px;">
        <p style="margin:0 0 8px;font-size:13px;color:#8b6914;text-transform:uppercase;letter-spacing:2px;font-family:'Segoe UI',sans-serif;">Estimated Range</p>
        <p style="margin:0;font-size:36px;font-weight:600;color:#1a365d;">$${result.low.toLocaleString()} – $${result.high.toLocaleString()}</p>
      </div>

      <div style="margin-bottom:36px;">
        <h2 style="color:#1a365d;font-size:20px;margin:0 0 16px;font-weight:400;border-left:4px solid #c9a227;padding-left:14px;">Your Project Inputs</h2>
        <table style="width:100%;border-collapse:collapse;background-color:#faf9f7;border-radius:4px;overflow:hidden;">${inputRows}</table>
      </div>

      <div style="margin-bottom:36px;">
        <h2 style="color:#1a365d;font-size:20px;margin:0 0 16px;font-weight:400;border-left:4px solid #c9a227;padding-left:14px;">Estimated Cost Breakdown</h2>
        <table style="width:100%;border-collapse:collapse;">${breakdownRows}</table>
        <p style="font-size:13px;color:#718096;margin:14px 0 0;font-style:italic;font-family:'Segoe UI',sans-serif;">Breakdown shows the mid-point of your estimated range. Final pricing depends on exact selections and site conditions.</p>
      </div>

      <div style="background:linear-gradient(135deg,#1a365d 0%,#2c5282 100%);padding:36px;border-radius:4px;text-align:center;margin-top:40px;">
        <h2 style="color:#ffffff;margin:0 0 12px;font-size:24px;font-weight:400;">Ready for an exact quote?</h2>
        <div style="width:40px;height:1px;background-color:#c9a227;margin:0 auto 16px;"></div>
        <p style="color:#cbd5e0;margin:0 0 20px;font-size:15px;font-family:'Segoe UI',sans-serif;line-height:1.6;">
          Book a $75 in-home design consult — credited toward your project.
        </p>
        <a href="https://www.boldremo.com/contact" style="display:inline-block;background-color:#c9a227;color:#1a365d;padding:14px 36px;text-decoration:none;font-weight:600;border-radius:2px;font-size:14px;letter-spacing:1px;text-transform:uppercase;font-family:'Segoe UI',sans-serif;">Book My Consultation</a>
      </div>
    </div>

    <div style="background-color:#faf9f7;padding:32px 44px;text-align:center;border-top:1px solid #e8e5e0;">
      <p style="margin:0 0 4px;color:#1a365d;font-size:16px;font-weight:600;font-family:'Segoe UI',sans-serif;">Stan & The BoldREMO Team</p>
      <div style="width:40px;height:1px;background-color:#c9a227;margin:14px auto;"></div>
      <p style="margin:0 0 6px;color:#4a5568;font-size:14px;font-family:'Segoe UI',sans-serif;">
        <a href="tel:+18325135737" style="color:#1a365d;text-decoration:none;">(832) 513-5737</a> &nbsp;•&nbsp;
        <a href="mailto:info@boldremo.com" style="color:#1a365d;text-decoration:none;">info@boldremo.com</a>
      </p>
      <p style="margin:0;color:#4a5568;font-size:14px;font-family:'Segoe UI',sans-serif;">
        <a href="https://www.boldremo.com" style="color:#1a365d;text-decoration:none;">www.boldremo.com</a>
      </p>
      <p style="margin:18px 0 0;color:#a0aec0;font-size:11px;font-family:'Segoe UI',sans-serif;">
        © 2026 BoldREMO. All rights reserved.
      </p>
    </div>
  </div>
</body></html>`;
}

function generateOwnerNotification(name: string, email: string, inputs: any, result: any): string {
  return `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#2d3748;">
  <h2 style="color:#1a365d;border-bottom:2px solid #c9a227;padding-bottom:10px;">🧮 New Calculator Lead</h2>
  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
  <p><strong>Estimate range:</strong> $${result.low.toLocaleString()} – $${result.high.toLocaleString()}</p>
  <h3 style="color:#1a365d;margin-top:24px;">Inputs</h3>
  <ul style="line-height:1.8;">
    <li><strong>Size:</strong> ${SIZE_LABELS[inputs.size] || inputs.size}</li>
    <li><strong>Scope:</strong> ${SCOPE_LABELS[inputs.scope] || inputs.scope}</li>
    <li><strong>Neighborhood:</strong> ${NEIGHBORHOOD_LABELS[inputs.neighborhood] || inputs.neighborhood}</li>
    <li><strong>Shower:</strong> ${SHOWER_LABELS[inputs.shower] || inputs.shower}</li>
    <li><strong>Vanity:</strong> ${VANITY_LABELS[inputs.vanityCount] || inputs.vanityCount}</li>
    <li><strong>Tile grade:</strong> ${TILE_LABELS[inputs.tileGrade] || inputs.tileGrade}</li>
    <li><strong>Plumbing:</strong> ${PLUMBING_LABELS[inputs.plumbing] || inputs.plumbing}</li>
  </ul>
  <p style="margin-top:24px;padding:12px;background:#fefcf3;border-left:4px solid #c9a227;">
    <strong>Next step:</strong> Reach out within 24 hours while interest is hot. The customer received a branded PDF-style estimate email.
  </p>
</body></html>`;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Calculator estimate request received");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("x-real-ip") || "unknown";

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const rawData = await req.json();

    // Honeypot
    if (typeof rawData.website === "string" && rawData.website.trim().length > 0) {
      console.warn("Honeypot triggered");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const validation = RequestSchema.safeParse(rawData);
    if (!validation.success) {
      console.warn("Validation failed:", validation.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input", details: validation.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, inputs, result } = validation.data;

    // Save to database
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const { error: dbError } = await supabase
      .from("calculator_leads")
      .insert({
        name,
        email,
        inputs,
        low_estimate: result.low,
        high_estimate: result.high,
      });

    if (dbError) {
      console.error("DB insert error:", dbError);
    } else {
      console.log("Calculator lead saved");
    }

    // Send customer email
    const { error: customerEmailError } = await resend.emails.send({
      from: "BoldREMO <info@boldremo.com>",
      to: [email],
      subject: "Your Houston Bathroom Remodel Estimate — From BoldREMO",
      html: generateCustomerEmail(name, inputs, result),
    });

    if (customerEmailError) {
      console.error("Customer email error:", customerEmailError);
      return new Response(
        JSON.stringify({ error: "Failed to send estimate. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    console.log("Customer estimate sent to:", email);

    // Send owner notification (non-blocking)
    try {
      await resend.emails.send({
        from: "BoldREMO Calculator <info@boldremo.com>",
        to: ["info@boldremo.com"],
        subject: `🧮 New Calculator Lead: ${name} ($${result.low.toLocaleString()}–$${result.high.toLocaleString()})`,
        html: generateOwnerNotification(name, email, inputs, result),
        reply_to: email,
      });
      console.log("Owner notification sent");
    } catch (e) {
      console.error("Owner notification failed (non-blocking):", e);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Handler error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
