

## Enhanced Bathroom Remodel Planning Guide

### The Problem
Currently, the form just simulates sending a guide. We'll create a genuinely valuable email guide that helps homeowners plan their project while building trust in BoldREMO.

---

### Guide Content Structure

The email guide will include 5 valuable sections:

**1. Houston Pricing Reality Check**
- Guest/Hall Bathroom: $8,500 - $16,000
- Full Renovation: $18,000 - $32,000  
- Luxury Spa Bathroom: $35,000+
- Cost breakdown: Labor (40-50%), Tile ($10-50/sqft), Vanity ($500-$5,000+)
- Why to always budget 15-20% contingency

**2. Step-by-Step Planning Checklist**
Before You Start:
- Set realistic budget with contingency
- Research licensed, insured contractors
- Obtain necessary permits
- Create detailed design plan with measurements
- Select all materials in advance

Design Decisions:
- Layout: keep plumbing or relocate?
- Vanity style, size, countertop
- Tile for floors, walls, shower
- Lighting fixtures and placement
- Hardware finishes

**3. Houston-Specific Considerations**
- Humidity control (minimum 50 CFM exhaust fan)
- Mold-resistant drywall in wet areas
- Foundation/clay soil waterproofing
- City permit requirements for plumbing/electrical

**4. Timeline Expectations**
- Refresh remodel: 7-10 days
- Signature remodel: 14-21 days
- Luxury spa remodel: 21+ days
- Add 1-2 weeks for layout changes

**5. Questions to Ask Your Contractor**
- Are you licensed and insured?
- What's included in the quote?
- What's your payment schedule?
- How do you handle change orders?
- Can I see recent references?

---

### Implementation Details

**1. Create Database Table: `guide_requests`**
- `id` (UUID, primary key)
- `name` (text)
- `email` (text)
- `created_at` (timestamp)
- RLS: Service role insert only (same pattern as contact_submissions)

**2. Create Edge Function: `send-guide-email`**

Uses Resend (already configured) to send a professionally formatted HTML email containing:
- BoldREMO branding
- All 5 sections above
- Clear CTA to book a $75 design consultation
- Link to full Resources page for more details

**3. Update `LeadCaptureSection.tsx`**
- Call the edge function on form submit
- Input validation with Zod
- Proper error handling and success messages

---

### Email Design

**Subject:** Your Houston Bathroom Remodel Planning Guide - From BoldREMO

**Email Format:**
- Clean, mobile-responsive HTML
- BoldREMO logo/branding at top
- Sections with clear headings
- Checklist items with checkboxes
- Prominent "Book Your $75 Design Consult" button
- Footer with contact info and unsubscribe note

---

### Files to Create/Modify

| Action | File | Description |
|--------|------|-------------|
| Create | Database migration | Add `guide_requests` table |
| Create | `supabase/functions/send-guide-email/index.ts` | Send comprehensive email guide |
| Update | `src/components/LeadCaptureSection.tsx` | Connect to edge function with validation |

---

### Why This Works

1. **Genuine Value** - Homeowners get actionable information they can use immediately
2. **Lead Qualification** - Only serious homeowners fill out forms for detailed guides
3. **Trust Building** - Professional, comprehensive content positions BoldREMO as the expert
4. **Houston Focus** - Local expertise (humidity, permits, clay soil) shows you know the market
5. **Soft CTA** - Ends with invitation to book a consult, not a hard sell

