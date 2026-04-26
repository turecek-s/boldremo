## Plan: Backlink support — 4 deliverables

I'll do these in order so you can start outreach immediately while the bigger builds happen.

---

### Deliverable 1 — Houston Backlink Target List (PDF)

A printable, prioritized PDF of the top 20+ backlink targets, written specifically for a Houston luxury bathroom remodeler. For each target: name, URL, type (directory / press / partner / community), priority (🟢🟡🔴), estimated effort, what to send, and a sample pitch line.

**Sections:**
1. Foundation citations (free, do this week) — Google Business Profile, Houzz, Yelp, BBB, Angi, NextDoor, Foursquare, Manta, Yellowpages, Hotfrog
2. Houston-specific directories — Greater Houston Builders Association, Houston Chamber of Commerce, NARI Houston, Visit Houston business directory
3. Local press & lifestyle media — *Houstonia*, *PaperCity*, *Houston Chronicle Home*, *Houston Modern Luxury*, *CultureMap Houston*
4. Partnership targets — local realtors, interior designers, tile/plumbing suppliers (with template outreach email)
5. Ongoing tactics — HARO/Qwoted/Featured.com, podcasts, sponsorships
6. Sample pitch templates (3 versions: realtor, journalist, supplier)

**Output:** `/mnt/documents/BoldREMO-Backlink-Targets.pdf` (~6–8 pages, branded with logo color, printable). Generated with ReportLab + visual QA.

---

### Deliverable 2 — Press & Partners page

New route `/press` showing media mentions, partner logos, trust badges, and certifications. Built to look credible even when empty (placeholder copy + skeleton badges) so you have a real page to point pitches at on day one.

**Files:**
- **Create** `src/pages/Press.tsx`
- **Create** `src/data/press-mentions.ts` — easily editable array of `{ outlet, logo, quote, url, date }`
- **Create** `src/data/partners.ts` — `{ name, type, logo, url }`
- **Edit** `src/App.tsx` — add `/press` lazy route
- **Edit** `src/components/Footer.tsx` — add Press link
- **Edit** `src/lib/seo-content.ts` — add SEO content for `/press`
- **Edit** `vite-plugin-prerender.ts` — add `/press` to prerender list
- **Edit** `public/sitemap.xml` — add `/press` URL

**Sections on the page:** "As featured in" logo strip (with placeholder slots ready), "Trusted partners" grid (suppliers/designers/realtors), "Certifications & memberships" badges (BBB, NARI, Houzz Pro placeholders), CTA to "Become a partner" → links to `/realtors-designers`.

---

### Deliverable 3 — For Realtors & Designers page

New route `/realtors-designers` — partnership landing page with a clear pitch and intake form that emails Stan directly via the existing `send-contact-email` edge function (you confirmed: no DB table needed).

**Files:**
- **Create** `src/pages/RealtorsDesigners.tsx` with sections:
  1. Hero — "Partner with Houston's luxury bathroom remodeler"
  2. Why partner with BoldREMO — referral fee structure, white-glove client treatment, fast turnarounds, professional photos for your listings
  3. How it works — 3-step partnership process
  4. Co-marketing benefits — featured on `/press` page, trade pricing on consults, joint social posts
  5. Testimonials slot (placeholder ready)
  6. Partner intake form — name, business name, role (Realtor / Interior Designer / Architect / Other), email, phone, message
- **Edit** `supabase/functions/send-contact-email/index.ts` — accept optional `formType` field; when `formType === 'partnership'`, change subject to "🤝 New Partnership Inquiry" and add business name + role to the email body. Backwards-compatible with the existing contact form.
- **Edit** `src/App.tsx` — add `/realtors-designers` lazy route
- **Edit** `src/components/Footer.tsx` — add "For Realtors & Designers" link
- **Edit** `src/lib/seo-content.ts` — SEO for `/realtors-designers`
- **Edit** `vite-plugin-prerender.ts` — prerender it
- **Edit** `public/sitemap.xml` — add it

---

### Deliverable 4 — Houston Bathroom Cost Calculator (link bait + lead magnet)

New route `/cost-calculator` — interactive estimator that produces a price range. After the result, optional email capture sends the full estimate as a branded PDF (lead magnet).

**Calculator inputs (7):**
1. Bathroom size — Half / Small full (~40 sq ft) / Standard (~60 sq ft) / Large master (~100+ sq ft)
2. Scope — Refresh / Mid-range remodel / Full luxury renovation
3. Neighborhood — Houston / Heights / Bellaire / River Oaks / Kingwood / Memorial / Other (modifies multiplier slightly to reflect local labor/material expectations)
4. Shower — Keep existing / New standard / Walk-in glass / Walk-in glass with custom tile
5. Vanity count — Single / Double
6. Tile grade — Standard ceramic / Porcelain / Natural stone or marble
7. Plumbing changes — None / Minor / Major (move fixtures)

**Output:** Low–high price range with a one-paragraph explanation, breakdown bar (labor / tile / fixtures / vanity / plumbing / contingency), and a "Book your $75 in-home design consult" CTA.

**Email capture (optional):** "Email me a printable PDF estimate" → name + email → submits to a new edge function that saves to a new `calculator_leads` table and emails the user a branded PDF estimate (generated server-side with `pdf-lib` in the edge function), and emails Stan a notification.

**Files:**
- **Create** `src/pages/CostCalculator.tsx` — multi-step calculator UI with progress indicator
- **Create** `src/lib/calculator-pricing.ts` — pricing logic (multipliers, base costs per Houston market) — kept transparent and easy to tune
- **Create** `src/components/CalculatorResult.tsx` — results display + breakdown chart + email-PDF form
- **Create** `supabase/functions/send-calculator-estimate/index.ts` — generates PDF, saves lead, emails customer + Stan via the existing Gmail SMTP setup (reusing `GMAIL_USER` / `GMAIL_APP_PASSWORD` secrets — no new secrets required)
- **Migration** — new `calculator_leads` table: `id, name, email, inputs jsonb, low_estimate int, high_estimate int, created_at`. RLS: deny anon all, service-role insert, admin select (mirroring `guide_requests`).
- **Edit** `src/integrations/supabase/types.ts` — auto-regenerated, no manual edit
- **Edit** `src/App.tsx` — add `/cost-calculator` lazy route
- **Edit** `src/components/Header.tsx` — add "Cost Calculator" to main nav (it's link bait, should be discoverable)
- **Edit** `src/components/Footer.tsx` — add Cost Calculator link
- **Edit** `src/lib/seo-content.ts` — strong SEO content for `/cost-calculator`
- **Edit** `vite-plugin-prerender.ts` — prerender it (with descriptive meta for Google snippets)
- **Edit** `public/sitemap.xml` — add it
- **Edit** `src/pages/Resources.tsx` — add a card linking to the calculator

---

### Sequencing

1. Generate the **PDF first** so it's in your hands within minutes
2. Build **Press & Partners** (smallest, sets up the partner page link target)
3. Build **For Realtors & Designers** (needs the email function tweak)
4. Build **Cost Calculator** (largest — calculator UI + PDF generation + new table + new edge function)

### What's NOT in this plan (clarify if you want any added)

- Auto-deploying any of this — you'll publish from the editor when ready
- Submitting to Google Search Console / directories / GBP — those still require your action; the PDF lists every step
- Real partner logos — placeholders shipped; you swap them as deals close
- Real press mentions — placeholders shipped; you swap them as you earn coverage