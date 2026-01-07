import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const GMAIL_USER = Deno.env.get("GMAIL_USER");
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const ContactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name too long").trim(),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long").trim(),
  email: z.string().email("Invalid email address").max(100, "Email too long"),
  phone: z.string().min(10, "Phone number too short").max(20, "Phone number too long").regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone format"),
  message: z.string().min(10, "Message too short").max(2000, "Message too long").trim(),
});

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute per IP

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

// Honeypot check - if filled, it's a bot
function isHoneypotFilled(data: Record<string, unknown>): boolean {
  const honeypotValue = data.website;
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

// HTML escape function to prevent XSS in email templates
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received contact form submission request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment before trying again." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse input
    const rawData = await req.json();
    
    // Honeypot check - silently reject bot submissions
    if (isHoneypotFilled(rawData)) {
      console.warn("Honeypot triggered - likely bot submission");
      // Return success to not alert the bot
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate input
    const validationResult = ContactSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.warn("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid form data. Please check your inputs.",
          details: validationResult.error.errors.map(e => e.message)
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { firstName, lastName, email, phone, message } = validationResult.data;
    console.log("Processing validated contact form for:", email);

    // Save to database
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        message: message,
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Continue with email even if DB fails
    } else {
      console.log("Submission saved to database");
    }

    // Escape all user inputs to prevent XSS in email
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    // Send notification email via Gmail SMTP
    try {
      const client = new SMTPClient({
        connection: {
          hostname: "smtp.gmail.com",
          port: 465,
          tls: true,
          auth: {
            username: GMAIL_USER!,
            password: GMAIL_APP_PASSWORD!,
          },
        },
      });

      await client.send({
        from: GMAIL_USER!,
        to: GMAIL_USER!,
        subject: `New Contact Form Submission from ${safeFirstName} ${safeLastName}`,
        content: "auto",
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <h3>Message:</h3>
          <p>${safeMessage}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
        `,
      });

      await client.close();
      console.log("Email sent successfully via Gmail SMTP");
    } catch (emailError) {
      console.error("Gmail SMTP error:", emailError);
      // Don't throw - submission was saved to DB
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    // Return generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
