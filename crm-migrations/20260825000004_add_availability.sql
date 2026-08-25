-- Track daily availability. One row per calendar date (UNIQUE constraint).
-- is_flip_committed: true when the day is reserved for a flip/other project.

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.availability (
  id                UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date              DATE        NOT NULL UNIQUE,
  is_flip_committed BOOLEAN     NOT NULL DEFAULT false,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users manage availability"
  ON public.availability FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE TRIGGER set_availability_updated_at
  BEFORE UPDATE ON public.availability
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
