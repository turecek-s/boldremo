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

// Input validation schema
const GuideRequestSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").trim(),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
});

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

// Honeypot check
function isHoneypotFilled(data: Record<string, unknown>): boolean {
  const honeypotValue = data.website;
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

// HTML escape function
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate the comprehensive guide email HTML
function generateGuideEmailHtml(name: string): string {
  const safeName = escapeHtml(name);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Houston Bathroom Remodel Planning Guide</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background-color: #1a365d; padding: 30px 40px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: 1px;">BoldREMO</h1>
      <p style="margin: 8px 0 0; color: #a0aec0; font-size: 14px;">Houston's Bathroom Remodeling Experts</p>
    </div>
    
    <!-- Greeting -->
    <div style="padding: 40px;">
      <p style="font-size: 18px; margin: 0 0 20px; color: #1a365d;">Hi ${safeName},</p>
      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px; color: #4a5568;">
        Thank you for requesting our Bathroom Remodel Planning Guide! Below you'll find everything you need to plan a successful bathroom renovation in Houston.
      </p>
      
      <!-- Section 1: Pricing -->
      <div style="margin-bottom: 35px;">
        <h2 style="color: #1a365d; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
          💰 Houston Pricing Reality Check
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr style="background-color: #f7fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Guest/Hall Bathroom</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; color: #2d3748;">$8,500 – $16,000</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Full Renovation</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; color: #2d3748;">$18,000 – $32,000</td>
          </tr>
          <tr style="background-color: #f7fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: 600;">Luxury Spa Bathroom</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; color: #2d3748;">$35,000+</td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #718096; margin: 10px 0 0;">
          <strong>Cost breakdown:</strong> Labor (40-50%), Tile ($10-50/sqft), Vanity ($500-$5,000+)<br>
          <strong>Pro tip:</strong> Always budget 15-20% contingency for unexpected issues.
        </p>
      </div>
      
      <!-- Section 2: Planning Checklist -->
      <div style="margin-bottom: 35px;">
        <h2 style="color: #1a365d; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
          ✅ Step-by-Step Planning Checklist
        </h2>
        
        <p style="font-weight: 600; color: #2d3748; margin: 0 0 10px;">Before You Start:</p>
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #4a5568; line-height: 1.8;">
          <li>☐ Set realistic budget with 15-20% contingency</li>
          <li>☐ Research licensed, insured contractors</li>
          <li>☐ Obtain necessary permits (required in Houston)</li>
          <li>☐ Create detailed design plan with measurements</li>
          <li>☐ Select all materials in advance to avoid delays</li>
        </ul>
        
        <p style="font-weight: 600; color: #2d3748; margin: 0 0 10px;">Design Decisions to Make:</p>
        <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;">
          <li>☐ Layout: Keep existing plumbing or relocate?</li>
          <li>☐ Vanity: Style, size, and countertop material</li>
          <li>☐ Tile: Floor, walls, and shower selections</li>
          <li>☐ Lighting: Fixtures and placement</li>
          <li>☐ Hardware: Faucets, towel bars, finishes</li>
        </ul>
      </div>
      
      <!-- Section 3: Houston-Specific -->
      <div style="margin-bottom: 35px; background-color: #fffbeb; padding: 20px; border-radius: 8px; border-left: 4px solid #d69e2e;">
        <h2 style="color: #744210; font-size: 20px; margin: 0 0 15px;">
          🌴 Houston-Specific Considerations
        </h2>
        <ul style="margin: 0; padding-left: 20px; color: #744210; line-height: 1.8;">
          <li><strong>Humidity control:</strong> Install minimum 50 CFM exhaust fan (we recommend 80+ CFM)</li>
          <li><strong>Mold prevention:</strong> Use mold-resistant drywall in all wet areas</li>
          <li><strong>Foundation awareness:</strong> Houston's clay soil can shift – waterproof carefully</li>
          <li><strong>Permits:</strong> City of Houston requires permits for plumbing & electrical work</li>
        </ul>
      </div>
      
      <!-- Section 4: Timeline -->
      <div style="margin-bottom: 35px;">
        <h2 style="color: #1a365d; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
          📅 Timeline Expectations
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f7fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Refresh Remodel</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: 600;">7-10 days</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Signature Remodel</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: 600;">14-21 days</td>
          </tr>
          <tr style="background-color: #f7fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Luxury Spa Remodel</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; font-weight: 600;">21+ days</td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #718096; margin: 10px 0 0;">
          <em>Add 1-2 weeks if relocating plumbing or electrical.</em>
        </p>
      </div>
      
      <!-- Section 5: Questions to Ask -->
      <div style="margin-bottom: 35px;">
        <h2 style="color: #1a365d; font-size: 20px; margin: 0 0 15px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
          ❓ Questions to Ask Your Contractor
        </h2>
        <ol style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;">
          <li>Are you licensed and insured in Texas?</li>
          <li>What's included in your quote? What's extra?</li>
          <li>What's your payment schedule?</li>
          <li>How do you handle change orders and unexpected issues?</li>
          <li>Can I see recent references and photos of your work?</li>
          <li>Who will be on-site daily managing the project?</li>
          <li>What warranties do you offer on labor and materials?</li>
        </ol>
      </div>
      
      <!-- CTA Section -->
      <div style="background-color: #1a365d; padding: 30px; border-radius: 8px; text-align: center; margin-top: 40px;">
        <h2 style="color: #ffffff; margin: 0 0 10px; font-size: 22px;">Ready for the Next Step?</h2>
        <p style="color: #a0aec0; margin: 0 0 20px; font-size: 16px;">
          Book a $75 in-home design consultation<br>
          <span style="font-size: 14px;">(credited toward your project)</span>
        </p>
        <a href="https://boldremo.lovable.app/contact" 
           style="display: inline-block; background-color: #c9a227; color: #1a365d; padding: 14px 32px; text-decoration: none; font-weight: 600; border-radius: 4px; font-size: 16px;">
          Book My Consultation
        </a>
      </div>
      
      <!-- Resources Link -->
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p style="color: #718096; font-size: 14px; margin: 0;">
          Want even more details? Visit our 
          <a href="https://boldremo.lovable.app/resources" style="color: #1a365d; text-decoration: underline;">Resources Page</a>
          for in-depth guides.
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f7fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0 0 10px; color: #4a5568; font-size: 14px;">
        Best regards,<br>
        <strong>Stan & The BoldREMO Team</strong>
      </p>
      <p style="margin: 0; color: #a0aec0; font-size: 12px;">
        Houston, TX | (713) 555-0123 | info@boldremo.com
      </p>
      <p style="margin: 15px 0 0; color: #a0aec0; font-size: 11px;">
        You received this email because you requested our Bathroom Remodel Planning Guide.<br>
        © 2024 BoldREMO. All rights reserved.
      </p>
    </div>
    
  </div>
</body>
</html>
`;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received guide request");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const rawData = await req.json();
    
    // Honeypot check
    if (isHoneypotFilled(rawData)) {
      console.warn("Honeypot triggered - likely bot");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate input
    const validationResult = GuideRequestSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.warn("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid form data.",
          details: validationResult.error.errors.map(e => e.message)
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email } = validationResult.data;
    console.log("Processing guide request for:", email);

    // Save to database
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    const { error: dbError } = await supabase
      .from('guide_requests')
      .insert({ name, email });

    if (dbError) {
      console.error("Database insert error:", dbError);
    } else {
      console.log("Guide request saved to database");
    }

    // Send email via Resend
    try {
      const { error: emailError } = await resend.emails.send({
        from: "BoldREMO <onboarding@resend.dev>",
        to: [email],
        subject: "Your Houston Bathroom Remodel Planning Guide - From BoldREMO",
        html: generateGuideEmailHtml(name),
      });

      if (emailError) {
        console.error("Resend error:", emailError);
        throw emailError;
      }

      console.log("Guide email sent successfully to:", email);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return new Response(
        JSON.stringify({ error: "Failed to send guide. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-guide-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
