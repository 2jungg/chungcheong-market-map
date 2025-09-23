-- Drop the problematic view
DROP VIEW IF EXISTS public.merchants_public;

-- Update the merchants table policies to allow selective column access
DROP POLICY IF EXISTS "No public access to full merchant data" ON public.merchants;

-- Create a policy that allows public read access but applications should only select safe columns
CREATE POLICY "Public can view merchants with limited data" 
ON public.merchants 
FOR SELECT 
USING (true);

-- Create a security definer function to get public merchant data safely
CREATE OR REPLACE FUNCTION public.get_public_merchants(region_filter text DEFAULT NULL)
RETURNS TABLE (
    id uuid,
    name text,
    description text,
    market_day text,
    opening_time time,
    closing_time time,
    is_open boolean,
    image_url text,
    latitude double precision,
    longitude double precision,
    region text,
    general_location text,
    created_at timestamptz,
    updated_at timestamptz
) 
LANGUAGE sql 
SECURITY DEFINER 
SET search_path = public
AS $$
    SELECT 
        m.id,
        m.name,
        m.description,
        m.market_day,
        m.opening_time,
        m.closing_time,
        m.is_open,
        m.image_url,
        m.latitude,
        m.longitude,
        m.region,
        CASE 
            WHEN m.address IS NOT NULL THEN 
                CONCAT(
                    SPLIT_PART(m.address, ' ', 1), ' ', 
                    SPLIT_PART(m.address, ' ', 2), ' 일대'
                )
            ELSE '위치 정보 없음'
        END as general_location,
        m.created_at,
        m.updated_at
    FROM public.merchants m
    WHERE (region_filter IS NULL OR m.region = region_filter);
$$;