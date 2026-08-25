-- Record every SMS sent or received per lead.
-- message_template_id is nullable (manual messages have no template).
-- ON DELETE SET NULL preserves log history when a template is deleted.
-- No updated_at — log rows are immutable.

CREATE TYPE public.sms_direction AS ENUM ('outbound', 'inbound');

CREATE TABLE public.sms_log (
  id                  UUID                 NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id             UUID                 NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  message_template_id UUID                 REFERENCES public.message_templates(id) ON DELETE SET NULL,
  body                TEXT                 NOT NULL,
  direction           public.sms_direction NOT NULL DEFAULT 'outbound',
  sent_at             TIMESTAMPTZ          NOT NULL DEFAULT now()
);

CREATE INDEX idx_sms_log_lead_id ON public.sms_log (lead_id);
CREATE INDEX idx_sms_log_sent_at ON public.sms_log (sent_at DESC);

ALTER TABLE public.sms_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users manage sms_log"
  ON public.sms_log FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
