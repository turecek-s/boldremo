-- Add AI tier classification to sms_log rows (inbound only; outbound left null).
-- Tier 1 = auto-sent, 2 = approve/deny queue, 3 = task created, no reply.
ALTER TABLE public.sms_log
  ADD COLUMN ai_tier        SMALLINT,
  ADD COLUMN ai_tier_reason TEXT;

-- Runtime-editable key/value config (pricing guidance lives here).
CREATE TABLE public.app_config (
  key        TEXT        PRIMARY KEY,
  value      TEXT        NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users manage app_config"
  ON public.app_config FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE TRIGGER set_app_config_updated_at
  BEFORE UPDATE ON public.app_config
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed pricing guidance. Edit this row in the Supabase dashboard or via the app
-- to update ranges without touching code.
INSERT INTO public.app_config (key, value) VALUES ('pricing_guidance', $pricing$
Master bath full remodel:               $25,000 – $60,000
Guest / hall bath remodel:             $12,000 – $25,000
Half bath / powder room:               $5,000  – $12,000
Shower-only conversion or rebuild:     $8,000  – $20,000
Tub-to-shower conversion:              $6,000  – $15,000
Tile work only (labor + materials):    $4,000  – $12,000
Vanity replacement (single):           $1,500  –  $5,000
Vanity replacement (double):           $3,000  –  $8,000

Note: Ranges assume typical scope. High-end tile, custom fixtures, layout changes,
or structural work push to the top of the range or beyond. Always phrase as
"typically ranges from X to Y depending on materials and scope" — never a firm quote.
$pricing$);
