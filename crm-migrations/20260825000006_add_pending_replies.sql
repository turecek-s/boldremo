-- Make sms_log.lead_id nullable to support inbound SMS from unmatched phone numbers
ALTER TABLE public.sms_log ALTER COLUMN lead_id DROP NOT NULL;

-- Status enum for the pending reply queue
CREATE TYPE public.reply_status AS ENUM ('pending', 'approved', 'discarded');

-- AI-drafted reply queue: one row per draft awaiting owner approval
CREATE TABLE public.pending_replies (
  id             UUID                NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id        UUID                NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  inbound_sms_id UUID                REFERENCES public.sms_log(id) ON DELETE SET NULL,
  draft_body     TEXT                NOT NULL,
  edited_body    TEXT,               -- populated if owner edits before approving
  status         public.reply_status NOT NULL DEFAULT 'pending',
  created_at     TIMESTAMPTZ         NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ         NOT NULL DEFAULT now()
);

CREATE INDEX idx_pending_replies_lead_id ON public.pending_replies (lead_id);
-- Partial index covering only the hot path: the pending queue, newest first
CREATE INDEX idx_pending_replies_pending ON public.pending_replies (created_at DESC)
  WHERE status = 'pending';

ALTER TABLE public.pending_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users manage pending_replies"
  ON public.pending_replies FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE TRIGGER set_pending_replies_updated_at
  BEFORE UPDATE ON public.pending_replies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
