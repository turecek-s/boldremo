-- Replace lead_stage enum with simplified 8-stage pipeline.
-- Tables must be empty before applying (old values cannot cast to new enum).

ALTER TYPE public.lead_stage RENAME TO lead_stage_old;

CREATE TYPE public.lead_stage AS ENUM (
  'New Lead',
  'Estimate Sent',
  'Awaiting Decision',
  'Approved - Unscheduled',
  'Scheduled',
  'In Progress',
  'Complete',
  'Lost'
);

ALTER TABLE public.leads ALTER COLUMN stage DROP DEFAULT;

ALTER TABLE public.leads
  ALTER COLUMN stage TYPE public.lead_stage
  USING stage::text::public.lead_stage;

ALTER TABLE public.message_templates
  ALTER COLUMN stage TYPE public.lead_stage
  USING stage::text::public.lead_stage;

ALTER TABLE public.leads
  ALTER COLUMN stage SET DEFAULT 'New Lead'::public.lead_stage;

DROP TYPE public.lead_stage_old;
