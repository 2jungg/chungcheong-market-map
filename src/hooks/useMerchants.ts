import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Merchant {
  id: string;
  name: string;
  owner_name: string;
  description: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  market_day: string;
  opening_time: string;
  closing_time: string;
  is_open: boolean;
  image_url?: string;
  region?: string;
}

export const useMerchants = (selectedRegion?: string, selectedMarket?: string) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMerchants();
  }, [selectedRegion, selectedMarket]);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('merchants')
        .select('*')
        .order('created_at', { ascending: false });

      // Filter by region if provided
      if (selectedRegion) {
        query = query.eq('region', selectedRegion);
      }

      // Filter by specific market if provided
      if (selectedMarket) {
        // Get the market name from the selected market ID
        const { data: marketData } = await supabase
          .from('merchants')
          .select('name')
          .eq('id', selectedMarket)
          .single();

        if (marketData) {
          query = query.eq('name', marketData.name);
        }
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setMerchants(data || []);
    } catch (err) {
      console.error('Error fetching merchants:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Calculate distance (mock implementation)
  const calculateDistance = (lat: number, lng: number) => {
    // Mock calculation - in real app, you'd use actual user location
    const mockUserLat = 36.8;
    const mockUserLng = 127.1;
    
    const distance = Math.sqrt(
      Math.pow(lat - mockUserLat, 2) + Math.pow(lng - mockUserLng, 2)
    ) * 100; // Convert to approximate km
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  // Check if market is open today based on 5-day market system
  const isMarketOpenToday = (marketDay: string) => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const lastDigit = dayOfMonth % 10;
    
    // Parse market days (e.g., "1,6" means days ending in 1 or 6)
    const marketDays = marketDay.split(',').map(d => parseInt(d.trim()));
    return marketDays.includes(lastDigit);
  };

  const getMerchantsWithDistance = () => {
    return merchants.map(merchant => ({
      ...merchant,
      distance: `${calculateDistance(merchant.latitude, merchant.longitude)}km`,
      is_open: isMarketOpenToday(merchant.market_day) // Update is_open based on 5-day system
    }));
  };

  return {
    merchants: getMerchantsWithDistance(),
    loading,
    error,
    refetch: fetchMerchants
  };
};