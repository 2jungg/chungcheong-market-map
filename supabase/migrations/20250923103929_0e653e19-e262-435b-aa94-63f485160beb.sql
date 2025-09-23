-- Remove the public read access policy that exposes password hashes
DROP POLICY IF EXISTS "Public can verify merchant passwords" ON public.merchant_auth;

-- Create a more secure policy that prevents any public access to auth data
-- Only the service role (used by Edge Functions) can access this data
CREATE POLICY "No public access to auth data" 
ON public.merchant_auth 
FOR SELECT 
USING (false);