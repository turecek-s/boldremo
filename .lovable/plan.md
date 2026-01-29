

## Fix Planning Guide Email - Contact Info & Luxury Redesign

### Issues to Fix

1. **Wrong Phone Number**: The email shows `(713) 555-0123` (placeholder) instead of the real number `(832) 513-5737`
2. **Wrong Website URLs**: Links point to `boldremo.lovable.app` instead of `boldremo.com`
3. **Basic Design**: Current design needs elevation to match BoldREMO's luxury positioning

---

### Design Upgrades

The new email design will feature:

| Element | Current | New Luxury Design |
|---------|---------|-------------------|
| Header | Simple navy box | Elegant gradient with refined typography |
| Section Headers | Text with emojis | Gold accent bars with serif typography |
| Tables | Basic gray rows | Elegant alternating backgrounds with subtle borders |
| CTA Button | Basic gold button | Premium button with refined styling |
| Footer | Plain text | Professional signature block with social links |
| Colors | Navy/Gray | Rich navy (#1a365d), warm gold (#c9a227), soft ivory (#faf9f7) |

---

### Content Changes

**Contact Information:**
- Phone: `(713) 555-0123` → `(832) 513-5737`
- Website URLs: `boldremo.lovable.app` → `www.boldremo.com`
- Copyright year: `2024` → `2025`

**Design Refinements:**
- Replace emoji headers with elegant styled dividers
- Add subtle gold accent lines between sections
- Use warmer background tones (ivory instead of pure white)
- Refined typography with better font weights and spacing
- More generous padding and whitespace
- Professional signature with Stan's title
- Add social media icons/links in footer

---

### Technical Details

**File to Modify:**
`supabase/functions/send-guide-email/index.ts`

**Key Changes in `generateGuideEmailHtml()` function (lines 64-236):**

1. **Line 224** - Fix phone number:
```typescript
// FROM:
Houston, TX | (713) 555-0123 | info@boldremo.com

// TO:
Houston, TX | (832) 513-5737 | info@boldremo.com
```

2. **Lines 201, 211** - Fix website URLs:
```typescript
// FROM:
https://boldremo.lovable.app/contact
https://boldremo.lovable.app/resources

// TO:
https://www.boldremo.com/contact
https://www.boldremo.com/resources
```

3. **Complete HTML template redesign** with:
   - Ivory background (`#faf9f7`) instead of gray (`#f5f5f5`)
   - Refined header with subtle gradient effect
   - Gold (`#c9a227`) accent bars under section headings
   - Better table styling with elegant borders
   - Professional CTA section with refined button
   - Enhanced footer with proper contact info and social links
   - Updated copyright to 2025

---

### After Implementation

The edge function will automatically redeploy, and all new guide emails will feature:
- Correct phone number: (832) 513-5737
- Correct website: www.boldremo.com  
- Luxury spa-inspired visual design matching BoldREMO's brand positioning

