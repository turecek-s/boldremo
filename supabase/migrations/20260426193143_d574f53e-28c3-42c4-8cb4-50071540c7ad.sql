-- Create calculator_leads table
CREATE TABLE public.calculator_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  inputs JSONB NOT NULL,
  low_estimate INTEGER NOT NULL,
  high_estimate INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.calculator_leads ENABLE ROW LEVEL SECURITY;

-- Deny anonymous all
CREATE POLICY "Deny anonymous select to calculator_leads"
ON public.calculator_leads FOR SELECT TO anon USING (false);

CREATE POLICY "Deny anonymous insert to calculator_leads"
ON public.calculator_leads FOR INSERT TO anon WITH CHECK (false);

CREATE POLICY "Deny anonymous update to calculator_leads"
ON public.calculator_leads FOR UPDATE TO anon USING (false);

CREATE POLICY "Deny anonymous delete to calculator_leads"
ON public.calculator_leads FOR DELETE TO anon USING (false);

-- Only admins can view
CREATE POLICY "Only admins can view calculator_leads"
ON public.calculator_leads FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Only admins can delete calculator_leads"
ON public.calculator_leads FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role can insert
CREATE POLICY "Service role can insert calculator_leads"
ON public.calculator_leads FOR INSERT TO service_role
WITH CHECK (true);

-- Index for sorting by date
CREATE INDEX idx_calculator_leads_created_at ON public.calculator_leads(created_at DESC);