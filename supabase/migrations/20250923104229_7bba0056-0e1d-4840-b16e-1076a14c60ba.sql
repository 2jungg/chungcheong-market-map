-- Drop the problematic view and recreate without security definer
DROP VIEW IF EXISTS public.merchants_public;

-- Create a simple view without security definer (uses default INVOKER rights)
CREATE VIEW public.merchants_public AS
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

-- Enable RLS on the view
ALTER VIEW public.merchants_public SET (security_invoker = on);

-- Grant permissions
GRANT SELECT ON public.merchants_public TO anon;
GRANT SELECT ON public.merchants_public TO authenticated;

-- Create RLS policy for the view that allows public access
CREATE POLICY "Public can view merchant public data" 
ON public.merchants_public 
FOR SELECT 
USING (true);