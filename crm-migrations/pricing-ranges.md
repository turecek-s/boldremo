# BoldREMO Pricing Ranges

Derived from `src/lib/calculator-pricing.ts` (Houston market, 2026 labor + material rates).
Edit the constants in that file to adjust; re-run the node script in the commit message to
regenerate this table.

To update what the AI uses in SMS replies, copy the revised text from the
**AI Prompt Block** section at the bottom into the `app_config` table row
(key: `pricing_guidance`) in the Supabase dashboard — no code deployment needed.

---

## Base Ranges by Bathroom Type and Scope

*Assumptions: Houston (no area premium), porcelain tile, single vanity (double for large master),
no plumbing layout changes, existing shower kept. All prices rounded to nearest $500.*

| Bathroom Type       | Refresh       | Midrange        | Luxury          |
|---------------------|---------------|-----------------|-----------------|
| Half bath           | $4,000–$5,500 | $6,500–$9,000   | $11,500–$15,500 |
| Small full bath     | $7,500–$10,500| $11,500–$15,500 | $19,000–$25,500 |
| Standard bath       | $11,500–$15,500| $17,000–$23,500 | $27,000–$36,500 |
| Large master bath   | $20,500–$28,000| $30,500–$41,000 | $47,500–$64,500 |

**Scope definitions:**
- **Refresh** — cosmetic update: new tile, vanity, fixtures, hardware. No layout changes.
- **Midrange** — full remodel: everything replaced, new shower if needed, some layout flexibility.
- **Luxury** — high-end finishes throughout: custom tile, premium fixtures, built-in niches, etc.

---

## Add-Ons (on top of base range)

### Shower
| Option                  | Add to estimate (Houston) |
|-------------------------|--------------------------|
| Keep existing shower    | +$0                      |
| Standard shower rebuild | +$2,500                  |
| Walk-in shower          | +$5,500                  |
| Custom walk-in shower   | +$9,500                  |

Shower costs are included in the estimate total and subject to neighborhood premiums
(e.g. a custom walk-in in River Oaks adds ~$11,875 rather than $9,500).

### Plumbing
| Scope of plumbing work                        | Add to estimate |
|-----------------------------------------------|-----------------|
| None (fixtures in same locations)             | +$0             |
| Minor (new fixture hookups, supply lines)     | +$1,200         |
| Major (moving drains, new walls, layout change)| +$4,500        |

### Vanity (single vs. double)
| Vanity   | Refresh | Midrange | Luxury  |
|----------|---------|----------|---------|
| Single   | $800    | $1,800   | $4,500  |
| Double   | $1,600  | $3,500   | $8,500  |

*The base table uses single vanity for all sizes except large master (double).*

---

## Tile — Installed Cost per Square Foot

*Covers floor + shower walls (~1.6× floor square footage total.*

| Tile Grade      | Installed (material + labor) |
|-----------------|------------------------------|
| Ceramic         | $12–$20 / sqft               |
| Porcelain       | $18–$32 / sqft               |
| Natural stone   | $35–$70 / sqft               |

*Base table uses porcelain. Luxury projects with stone tile push the upper range higher:
a large master with stone tile runs $52,000–$70,500.*

---

## Neighborhood Premiums

Applied to the entire estimate (labor, tile, fixtures, vanity, plumbing).

| Area            | Premium |
|-----------------|---------|
| Houston (base)  | —       |
| The Heights     | +5%     |
| Bellaire        | +10%    |
| Memorial        | +15%    |
| River Oaks      | +25%    |
| Kingwood        | —       |

---

## Quick Reference: Highest Realistic Projects

| Scenario                                                               | Range              |
|------------------------------------------------------------------------|--------------------|
| River Oaks luxury large master (stone, custom walk-in, major plumbing) | $82,000–$111,000   |
| Memorial luxury large master (stone, walk-in, minor plumbing)          | $67,500–$91,000    |
| Houston luxury large master (stone, walk-in)                           | $57,500–$77,500    |
| Standard midrange (Houston, new standard shower)                       | $19,500–$26,500    |

*All include 12% contingency and neighborhood premium. Shower costs are now
correctly included after the bug fix to `calculateEstimate()`.*

---

## AI Prompt Block

Copy this into the `app_config` row (key: `pricing_guidance`) to update what the AI
uses in Tier 1 auto-replies. Keep the phrasing — the system prompt tells the AI to
always say "typically ranges from X to Y depending on materials and scope."

```
Half bath:           $4,000–$9,000   (refresh to midrange)
Small full bath:     $7,500–$15,500  (refresh to midrange)
Standard bath:       $11,500–$23,500 (refresh to midrange)
Large master bath:   $20,500–$41,000 (refresh to midrange)

Luxury finishes add 50–80% above midrange. Examples:
  Standard bath luxury: $27,000–$36,500
  Large master luxury:  $47,500–$64,500 (stone tile and custom shower can reach $80,000+)

Common add-ons (Houston base, neighborhood premiums apply):
  New standard shower: +$2,500
  Walk-in shower: +$5,500
  Custom walk-in: +$9,500
  Moving plumbing (minor): +$1,200
  Major layout change: +$4,500
  Double vanity vs single: +$1,700 midrange, +$4,000 luxury

Area premiums over Houston base:
  Heights +5%, Bellaire +10%, Memorial +15%, River Oaks +25%

All ranges include a 12% contingency and assume typical scope.
High-end tile, custom fixtures, or structural work push to the top of the range or beyond.
Always phrase as "typically ranges from X to Y depending on materials and scope" — never a firm quote.
```
