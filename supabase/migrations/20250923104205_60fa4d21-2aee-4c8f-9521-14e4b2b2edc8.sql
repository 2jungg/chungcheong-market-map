-- Create a view for public merchant information that excludes sensitive data
CREATE OR REPLACE VIEW public.merchants_public AS
SELECT 
    id,
    name,
    description,
    market_day,
    opening_time,
    closing_time,
    is_open,
    image_url,
    latitude,
    longitude,
    region,
    created_at,
    updated_at,
    -- Provide general location info without exact address
    CASE 
        WHEN address IS NOT NULL THEN 
            CONCAT(
                SPLIT_PART(address, ' ', 1), ' ', 
                SPLIT_PART(address, ' ', 2), ' 일대'
            )
        ELSE '위치 정보 없음'
    END as general_location
FROM public.merchants;

-- Grant SELECT permissions on the view to anonymous users
GRANT SELECT ON public.merchants_public TO anon;
GRANT SELECT ON public.merchants_public TO authenticated;

-- Drop the existing public policy on merchants table
DROP POLICY IF EXISTS "Anyone can view merchants" ON public.merchants;

-- Create restrictive policies for the merchants table
-- Public users cannot access the main merchants table directly
CREATE POLICY "No public access to full merchant data" 
ON public.merchants 
FOR SELECT 
USING (false);

-- Only authenticated users can see full merchant details
CREATE POLICY "Authenticated users can view full merchant data" 
ON public.merchants 
FOR SELECT 
TO authenticated
USING (true);