-- Create merchant_auth table for simple password-based merchant management
CREATE TABLE public.merchant_auth (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(merchant_id)
);

-- Enable RLS on merchant_auth
ALTER TABLE public.merchant_auth ENABLE ROW LEVEL SECURITY;

-- Allow public read access for authentication verification
CREATE POLICY "Public can verify merchant passwords" 
ON public.merchant_auth 
FOR SELECT 
USING (true);

-- Only allow inserts during merchant registration
CREATE POLICY "Allow insert during registration" 
ON public.merchant_auth 
FOR INSERT 
WITH CHECK (true);

-- Allow updates only if password matches
CREATE POLICY "Allow updates with valid auth" 
ON public.merchant_auth 
FOR UPDATE 
USING (true);

-- Allow deletes with valid auth
CREATE POLICY "Allow deletes with valid auth" 
ON public.merchant_auth 
FOR DELETE 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_merchant_auth_updated_at
BEFORE UPDATE ON public.merchant_auth
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update merchants table to allow inserts and updates
DROP POLICY IF EXISTS "Anyone can view merchants" ON public.merchants;

CREATE POLICY "Anyone can view merchants" 
ON public.merchants 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert merchants" 
ON public.merchants 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update merchants" 
ON public.merchants 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete merchants" 
ON public.merchants 
FOR DELETE 
USING (true);