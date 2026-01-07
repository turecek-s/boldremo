-- Add explicit deny policies for anonymous access to prevent any potential data exposure

-- Deny anonymous SELECT on contact_submissions
CREATE POLICY "Deny anonymous access to contact_submissions"
ON public.contact_submissions
FOR SELECT
TO anon
USING (false);

-- Deny anonymous INSERT on contact_submissions (service role handles inserts)
CREATE POLICY "Deny anonymous insert to contact_submissions"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (false);

-- Deny anonymous UPDATE on contact_submissions
CREATE POLICY "Deny anonymous update to contact_submissions"
ON public.contact_submissions
FOR UPDATE
TO anon
USING (false);

-- Deny anonymous DELETE on contact_submissions
CREATE POLICY "Deny anonymous delete to contact_submissions"
ON public.contact_submissions
FOR DELETE
TO anon
USING (false);

-- Deny anonymous SELECT on user_roles
CREATE POLICY "Deny anonymous access to user_roles"
ON public.user_roles
FOR SELECT
TO anon
USING (false);

-- Deny anonymous INSERT on user_roles
CREATE POLICY "Deny anonymous insert to user_roles"
ON public.user_roles
FOR INSERT
TO anon
WITH CHECK (false);

-- Deny anonymous UPDATE on user_roles
CREATE POLICY "Deny anonymous update to user_roles"
ON public.user_roles
FOR UPDATE
TO anon
USING (false);

-- Deny anonymous DELETE on user_roles
CREATE POLICY "Deny anonymous delete to user_roles"
ON public.user_roles
FOR DELETE
TO anon
USING (false);