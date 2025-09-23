-- Fix security issues by implementing proper RLS policies

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view merchant authentication" ON public.merchant_auth;
DROP POLICY IF EXISTS "Anyone can insert merchant authentication" ON public.merchant_auth;
DROP POLICY IF EXISTS "Anyone can update merchant authentication" ON public.merchant_auth;
DROP POLICY IF EXISTS "Anyone can delete merchant authentication" ON public.merchant_auth;

DROP POLICY IF EXISTS "Anyone can view merchants" ON public.merchants;
DROP POLICY IF EXISTS "Anyone can insert merchants" ON public.merchants;
DROP POLICY IF EXISTS "Anyone can update merchants" ON public.merchants;
DROP POLICY IF EXISTS "Anyone can delete merchants" ON public.merchants;

-- Create secure policies for merchant_auth table
CREATE POLICY "Merchants can view their own auth" 
ON public.merchant_auth 
FOR SELECT 
USING (false); -- No public access to auth data

CREATE POLICY "System can insert merchant auth" 
ON public.merchant_auth 
FOR INSERT 
WITH CHECK (true); -- Allow creation during registration

CREATE POLICY "Merchants can update their own auth" 
ON public.merchant_auth 
FOR UPDATE 
USING (false); -- Restrict updates for now

CREATE POLICY "Merchants can delete their own auth" 
ON public.merchant_auth 
FOR DELETE 
USING (false); -- Restrict deletions for now

-- Create secure policies for merchants table
CREATE POLICY "Anyone can view merchants" 
ON public.merchants 
FOR SELECT 
USING (true); -- Allow public read for marketplace

CREATE POLICY "System can insert merchants" 
ON public.merchants 
FOR INSERT 
WITH CHECK (true); -- Allow creation during registration

CREATE POLICY "Merchants can update their own data" 
ON public.merchants 
FOR UPDATE 
USING (false); -- Restrict updates for now

CREATE POLICY "Merchants can delete their own data" 
ON public.merchants 
FOR DELETE 
USING (false); -- Restrict deletions for now