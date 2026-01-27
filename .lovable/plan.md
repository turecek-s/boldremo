

## Fix Guide Email Sender Address

### The Problem
The edge function is still using `onboarding@resend.dev` as the sender email (line 303), which Resend rejects when sending to external recipients. The code needs to be updated to use your verified domain.

### The Fix

**File:** `supabase/functions/send-guide-email/index.ts`

**Line 303 - Change from:**
```typescript
from: "BoldREMO <onboarding@resend.dev>",
```

**To:**
```typescript
from: "BoldREMO <info@boldremo.com>",
```

### What Happens After This Fix

1. The edge function will be redeployed automatically
2. Emails will be sent from `info@boldremo.com` (your verified domain)
3. Users will receive the comprehensive planning guide in their inbox

### Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/send-guide-email/index.ts` | Update `from` field on line 303 to use `info@boldremo.com` |

