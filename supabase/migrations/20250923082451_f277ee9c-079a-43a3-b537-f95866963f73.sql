-- Create storage bucket for merchant images
INSERT INTO storage.buckets (id, name, public) VALUES ('merchant-images', 'merchant-images', true);

-- Create merchants table
CREATE TABLE public.merchants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  address TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  market_day TEXT NOT NULL,
  opening_time TIME,
  closing_time TIME,
  is_open BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view merchant and product info)
CREATE POLICY "Anyone can view merchants" 
ON public.merchants 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Create storage policies for merchant images
CREATE POLICY "Anyone can view merchant images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'merchant-images');

CREATE POLICY "Anyone can upload merchant images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'merchant-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_merchants_updated_at
BEFORE UPDATE ON public.merchants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.merchants (name, owner_name, description, phone, address, latitude, longitude, market_day, opening_time, closing_time, is_open) VALUES
('김치마켓', '김영희', '전통 김치와 젓갈류를 판매하는 오래된 가게입니다.', '010-1234-5678', '충청남도 천안시 동남구', 36.8151, 127.1139, '화, 목, 토', '08:00', '18:00', true),
('과일나라', '박철수', '신선한 제철 과일을 저렴하게 판매합니다.', '010-2345-6789', '충청남도 아산시', 36.7898, 127.0014, '수, 금, 일', '07:00', '19:00', false),
('바다횟집', '이순신', '서해안에서 잡은 신선한 회와 생선을 판매합니다.', '010-3456-7890', '충청남도 서산시', 36.7847, 126.4507, '월, 수, 금', '09:00', '20:00', true),
('한우정육점', '정한우', '충청도 한우 전문점으로 최고급 한우만 취급합니다.', '010-4567-8901', '충청남도 공주시', 36.4465, 127.1187, '화, 목, 토', '08:30', '19:30', true),
('옥수수농장', '최옥수', '달콤한 옥수수와 고구마를 직접 재배하여 판매합니다.', '010-5678-9012', '충청북도 청주시', 36.6424, 127.4890, '토, 일', '06:00', '16:00', false);

-- Insert sample products
INSERT INTO public.products (merchant_id, name, category, price, description) VALUES
((SELECT id FROM public.merchants WHERE name = '김치마켓'), '배추김치', '김치류', 15000, '국산 배추로 만든 맛있는 김치'),
((SELECT id FROM public.merchants WHERE name = '김치마켓'), '깍두기', '김치류', 12000, '아삭한 무로 만든 깍두기'),
((SELECT id FROM public.merchants WHERE name = '과일나라'), '사과', '과일', 8000, '달콤한 충주 사과 1kg'),
((SELECT id FROM public.merchants WHERE name = '과일나라'), '배', '과일', 10000, '수분 가득한 나주배 1kg'),
((SELECT id FROM public.merchants WHERE name = '바다횟집'), '광어회', '수산물', 35000, '신선한 광어회 중자'),
((SELECT id FROM public.merchants WHERE name = '한우정육점'), '한우등심', '정육', 45000, '최고급 한우등심 500g'),
((SELECT id FROM public.merchants WHERE name = '옥수수농장'), '옥수수', '농산물', 5000, '달콤한 찰옥수수 10개');