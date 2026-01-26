

## Update Guide Email Sender Address

### Change Required

Update the `send-guide-email` Edge Function to use your verified domain email address.

### Technical Details

**File:** `supabase/functions/send-guide-email/index.ts`

**Current line (~line 179):**
```typescript
from: "BoldREMO <onboarding@resend.dev>",
```

**Updated to:**
```typescript
from: "BoldREMO <info@boldremo.com>",
```

### What This Fixes

The Resend API was rejecting emails because `onboarding@resend.dev` can only send to the account owner's email. With your verified domain, emails can now be sent to any recipient who requests the planning guide.

### After This Change

The lead capture form will:
1. Save lead data to the database
2. Send the comprehensive planning guide email from `info@boldremo.com`
3. Show success message to the user

