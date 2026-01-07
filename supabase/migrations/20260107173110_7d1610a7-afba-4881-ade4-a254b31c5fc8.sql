-- Drop the overly permissive INSERT policy with 'true' condition
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Add DELETE policy for admins to manage submissions (GDPR compliance)
CREATE POLICY "Only admins can delete submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));