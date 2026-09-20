# BoldREMO Connect — Claude Session Notes

This file is maintained by Claude across sessions to preserve context, decisions, and system state.
Update it at the end of every session with a log entry and any changed architectural facts.

---

## System Overview

**BoldREMO Connect** is a CRM + AI SMS system for a Houston luxury bathroom remodeling company.
Inbound texts from leads are classified by AI, auto-replied (Tier 1), queued for owner approval (Tier 2), or escalated as tasks (Tier 3). Out-of-scope inquiries get a warm deflection and a task.

---

## Architecture: Two Projects, Two Databases

### Lovable Projects
| Project | ID | URL | Purpose |
|---|---|---|---|
| BoldREMO Website | `aea0099f` | boldremo.com | Public marketing site |
| BoldREMO Connect CRM | `724b613a-816a-4b68-a6ef-87f87e151115` | boldremo-flow.lovable.app | CRM + SMS webhook (always use full UUID) |

### Supabase Projects
| Project | ID | Purpose |
|---|---|---|
| Website DB | `ubbparyexygltuyjpdqg` | Public website data |
| CRM DB | `ytrgwfkilmcjsvpfbtup` | All CRM data: leads, sms_log, pending_replies, tasks, app_config |

---

## Key Files

### SMS Webhook (live, production)
**`src/routes/api/public/receive-sms.ts`** (in Lovable project `724b613a-...`)
- TanStack Start server route — NOT a Supabase edge function
- Twilio points to: `https://boldremo-flow.lovable.app/api/public/receive-sms?token=<SMS_WEBHOOK_SECRET>`
- All changes go through `mcp__Lovable__send_message`, not local edits
- Contains: `classify()` (Anthropic AI call), `handleOwnerCommand()`, POST handler

### Pricing Reference (runtime, injected into AI prompt)
**`crm-migrations/pricing-ranges.md`** — source of truth for pricing figures  
Stored in Supabase CRM `app_config` table, key `pricing_guidance`. Updated there directly for live effect.

### CRM Migrations
**`crm-migrations/`** — SQL migration files for CRM Supabase schema changes

---

## Database Schema (CRM — `ytrgwfkilmcjsvpfbtup`)

### `leads`
```
id, first_name, email, neighborhood, phone, stage, source, notes, created_at
```
- `stage` enum: New Lead | Estimate Sent | Awaiting Decision | Approved - Unscheduled | Scheduled | In Progress | Complete | Lost
- `source` enum: referral | website | Yelp | Google organic | other
- `neighborhood` enum: Heights | River Oaks | Bellaire | Kingwood | Memorial | Other
- `notes`: free text; `[OUT_OF_SCOPE]` marker appended by webhook when AI deflects non-bathroom inquiry

### `sms_log`
```
id, lead_id, direction (inbound|outbound), body, sent_at, ai_tier (1|2|3), ai_tier_reason
```
- `ai_tier_reason` doubles as error capture: starts with `ERROR: ` when classification throws

### `pending_replies`
```
id, lead_id, inbound_sms_id, draft_body, status (pending|approved|denied|discarded), created_at
```

### `tasks`
```
id, lead_id, title, type, due_date, created_at
```

### `app_config`
```
key, value
```
- Row `pricing_guidance`: full pricing text injected into AI system prompt at runtime

---

## Environment Variables (Lovable CRM project)

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | AI classification — model: `claude-sonnet-5` |
| `TWILIO_ACCOUNT_SID` | Twilio REST API auth |
| `TWILIO_AUTH_TOKEN` | Twilio REST API auth |
| `TWILIO_PHONE_NUMBER` | The BoldREMO Twilio number (FROM) |
| `OWNER_PHONE` | `+18325135737` — Stan's number; inbound from this → owner command handler |
| `SMS_WEBHOOK_SECRET` | Token auth on webhook URL |

---

## SMS Routing Logic

```
Inbound SMS
  ├── From OWNER_PHONE → handleOwnerCommand() → Y/N/Y1/N1 etc.
  └── From lead
        ├── Lookup lead by phone (last 10 digits)
        │     └── Not found → auto-create {first_name: "Unknown", stage: "New Lead", source: "other"}
        ├── Log inbound to sms_log
        ├── Load app_config.pricing_guidance
        ├── Build conversation history string
        ├── classify(lead, conversation, pricingGuidance) → Anthropic claude-sonnet-5
        │     └── Parses JSON from text block (find by type, not index — handles thinking blocks)
        ├── Extract name/email/neighborhood if provided → update leads table
        ├── Update sms_log.ai_tier + ai_tier_reason
        │
        ├── Tier 1 → auto-send draft via Twilio + FYI to owner
        ├── Tier 2 → insert pending_replies + notify owner (Y/N commands)
        ├── Tier 3 (out of scope, has draft) → auto-send deflection + mark [OUT_OF_SCOPE] + create task
        ├── Tier 3 (escalate, no draft) → create task + notify owner
        └── catch → log ERROR to sms_log + queue fallback Tier 2 pending reply + alert owner
```

### Owner Commands
- `Y` or `N` — approve/discard when exactly 1 pending
- `Y1`, `N2` etc. — indexed when multiple pending (ordered oldest-first)

### First Outbound Compliance
- STOP disclosure appended on first-ever outbound message to any lead

---

## AI Prompt Key Rules (in classify() system prompt)

1. **Scope**: Bathroom/tile ONLY. Deflect anything else with warm out-of-scope message.
2. **Pricing**: Use ONLY figures from the OFFICIAL PRICING REFERENCE — never training-data prices. Default to MIDRANGE unless lead explicitly says "luxury," "high-end," "premium," etc.
3. **Pricing education**: When quoting a range, always follow with one sentence on what's included (waterproofing, permits, licensed labor, quality materials) + warranty for that tier.
4. **Warranty**: Basic 2 yrs · Midrange 5 yrs · Luxury 7 yrs — workmanship only. Never promise manufacturer/material warranties.
5. **No vague promises**: Never say "I'll follow up soon" in Tier 1/2. If follow-up needed → Tier 3.
6. **No fabricated rules**: Never invent service area restrictions or business policies not in the prompt.
7. **No specialty disclosure**: Never mention that the company specializes in bathrooms when responding.
8. **Tone**: Warm, polished, composed. Like a trusted contractor, not a friend texting. No "Awesome!", minimal exclamation points.
9. **Extended thinking**: claude-sonnet-5 uses thinking blocks; code finds text block by type, not index.
10. **Tier 1 boundary**: Giving a price range from the table for clear-scope inquiries = Tier 1 auto-reply. Only firm bids, complaints, discount requests, or genuinely unusual projects → Tier 2.

---

## Pricing Reference (from app_config, last verified 2026-09-20)

```
Half bath:           $4,000–$9,000
Small full bath:     $7,500–$15,500
Standard bath:       $11,500–$23,500
Large master bath:   $20,500–$41,000

Luxury finishes add 50–80% above midrange.
  Standard bath luxury: $27,000–$36,500
  Large master luxury:  $47,500–$64,500 (can reach $80,000+)

Add-ons:
  New standard shower: +$2,500
  Walk-in shower: +$5,500
  Custom walk-in: +$9,500
  Moving plumbing (minor): +$1,200
  Major layout change: +$4,500
  Double vanity vs single: +$1,700 midrange, +$4,000 luxury

Area premiums:
  Kingwood: no premium (Houston base rate)
  Heights +5%, Bellaire +10%, Memorial +15%, River Oaks +25%

Warranty by finish tier:
  Basic (entry-level finishes):    2 years workmanship
  Midrange (standard finishes):    5 years workmanship
  Luxury (premium/custom finishes): 7 years workmanship
```

---

## Known Technical Notes

- **Extended thinking bug (fixed)**: `claude-sonnet-5` emits a `thinking` block before the `text` block for complex messages. Fixed by using `response.content.find(b => b.type === "text")` instead of `response.content[0]`.
- **Lovable send_message timeouts**: Tool times out after ~60s but message always goes through. Verify via `list_messages` or `get_message`. Use `wait: false` for long builds.
- **sms_log timestamp column**: named `sent_at`, not `created_at`.
- **pending_replies draft column**: named `draft_body`, not `draft`.
- **Multi-statement SQL**: Lovable `query_database` only returns last result. Run separate queries.

---

## Session Log

### 2026-08-25 — Initial Build
- CRM schema migrations created (leads, sms_log, pending_replies, tasks)
- SMS webhook scaffold in receive-sms.ts

### 2026-08-25/26 — SMS Webhook Hardening
- Three-tier AI routing implemented
- TwiML fix: plain text responses were forwarded as SMS by Twilio → replaced with proper `<Response>` XML
- Auto-create lead for unknown phone numbers
- STOP disclosure on first outbound

### 2026-08-26 — AI Features
- Lead info extraction: name, email, neighborhood
- Owner approval: simplified to Y/N (bare) or Y1/N1 (indexed), dropped hex codes
- Out-of-scope routing: warm deflection + Tier 3 task + [OUT_OF_SCOPE] lead marker
- No-bathroom-specialty-disclosure hard rule

### 2026-08-26 — Bug Fixes
- max_tokens raised from 512 → 1500 (JSON truncation on long conversations)
- Extended thinking fix: find text block by type, not index (root cause of "Empty AI response" errors)
- Robust JSON parsing: extract `{...}` with regex if model adds preamble prose
- Fallback in catch block: Tier 2 pending reply + owner alert instead of silence

### 2026-08-26 — Tone + Prompt
- Tone updated: warm/polished contractor register, no "Awesome!", minimal exclamation points
- Anti-vague-promise rule: no "I'll follow up" from Tier 1/2
- Pricing mandatory when scope known
- No fabricated service area rules (Kingwood hallucination incident)
- Kingwood added to pricing guidance as "no premium (Houston base rate)"

### 2026-09-20 — Conversation UI (queued, building)
- Conversation panel on lead detail: chat-style thread, manual send, pending reply inline approve/edit/discard, 5s polling
- New server routes: POST /api/crm/send-sms, POST /api/crm/resolve-pending

### 2026-09-20 — Session Notes Setup
- CLAUDE.md created with architecture docs and session log
- Architecture diagram artifact created: https://claude.ai/artifact/84oCC179EMoTY6HuJQc6Xa

### 2026-09-20 — Notification + Pricing + UX Fixes
**Owner notifications:**
- Tier 2 approval SMS was truncating draft at 100 chars → now sends two SMS: approval prompt + full draft untruncated
- All tiers now include the lead's inbound message in the owner notification (previously owner couldn't see what the lead wrote)
- Tier 1 owner notification fires even if Twilio fails to deliver to the lead (shows "⚠️ Reply FAILED" so owner knows to follow up manually)

**Pricing fixes:**
- AI was defaulting to luxury-tier pricing when lead didn't specify → added hard rule to default to midrange unless lead says "luxury," "high-end," "premium," etc.
- Tier 1/2 boundary clarified: quoting a range from the table = Tier 1 auto-reply; only firm bids/complaints/discounts → Tier 2

**Customer education (new):**
- Every price quote now includes one sentence explaining what's covered (waterproofing, permits, licensed labor, quality materials) so leads don't just compare raw numbers to cheaper unqualified quotes
- Warranty quoted per tier: Basic 2yr · Midrange 5yr · Luxury 7yr (workmanship only, not manufacturer warranties)
- app_config pricing_guidance updated in Supabase to include warranty tiers

**Verified via internal test:**
- Heights master bath + walk-in + double vanity → Tier 1, $29,000–$50,600, correct value education + 5yr warranty, no hallucinations
