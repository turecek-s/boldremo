-- Create table for guide requests (leads)
CREATE TABLE public.guide_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guide_requests ENABLE ROW LEVEL SECURITY;

-- Deny all anonymous access
CREATE POLICY "Deny anonymous access to guide_requests"
ON public.guide_requests
AS RESTRICTIVE
FOR SELECT
USING (false);

CREATE POLICY "Deny anonymous insert to guide_requests"
ON public.guide_requests
AS RESTRICTIVE
FOR INSERT
WITH CHECK (false);

CREATE POLICY "Deny anonymous update to guide_requests"
ON public.guide_requests
AS RESTRICTIVE
FOR UPDATE
USING (false);

CREATE POLICY "Deny anonymous delete to guide_requests"
ON public.guide_requests
AS RESTRICTIVE
FOR DELETE
USING (false);

-- Allow service role to insert (for edge function)
CREATE POLICY "Service role can insert guide_requests"
ON public.guide_requests
AS RESTRICTIVE
FOR INSERT
WITH CHECK (true);

-- Only admins can view guide requests
CREATE POLICY "Only admins can view guide_requests"
ON public.guide_requests
AS RESTRICTIVE
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));