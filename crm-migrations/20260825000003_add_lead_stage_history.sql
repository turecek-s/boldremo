-- Log every stage change on a lead with a timestamp.
-- from_stage is NULL on initial lead creation.
-- Time-in-stage: LEAD(changed_at) OVER (PARTITION BY lead_id ORDER BY changed_at) - changed_at

CREATE TABLE public.lead_stage_history (
  id         UUID              NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id    UUID              NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  from_stage public.lead_stage,
  to_stage   public.lead_stage NOT NULL,
  changed_at TIMESTAMPTZ       NOT NULL DEFAULT now()
);

CREATE INDEX idx_lead_stage_history_lead_id    ON public.lead_stage_history (lead_id);
CREATE INDEX idx_lead_stage_history_changed_at ON public.lead_stage_history (changed_at);

ALTER TABLE public.lead_stage_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users manage lead_stage_history"
  ON public.lead_stage_history FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.log_lead_stage_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.lead_stage_history (lead_id, from_stage, to_stage)
    VALUES (NEW.id, NULL, NEW.stage);
  ELSIF TG_OP = 'UPDATE' AND OLD.stage IS DISTINCT FROM NEW.stage THEN
    INSERT INTO public.lead_stage_history (lead_id, from_stage, to_stage)
    VALUES (NEW.id, OLD.stage, NEW.stage);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER lead_stage_change_log
  AFTER INSERT OR UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.log_lead_stage_change();
