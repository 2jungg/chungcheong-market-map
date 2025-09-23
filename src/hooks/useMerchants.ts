import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Merchant {
  id: string;
  name: string;
  description?: string;
  market_day: string;
  opening_time?: string;
  closing_time?: string;
  is_open?: boolean;
  image_url?: string;
  latitude: number;
  longitude: number;
  region?: string;
  general_location?: string;
  created_at: string;
  updated_at: string;
  // Sensitive fields only available to authenticated users
  owner_name?: string;
  phone?: string;
  address?: string;
  // Computed fields
  distance?: string;
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
      setError(null);

      // Use the secure function to get public merchant data
      const { data, error } = await supabase.rpc('get_public_merchants', {
        region_filter: selectedRegion || null
      });

      if (error) {
        throw error;
      }

      setMerchants(data || []);
    } catch (err) {
      console.error('Error fetching merchants:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch merchants');
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

  const fetchMerchantDetails = async (merchantId: string): Promise<Merchant | null> => {
    try {
      // Try to get full merchant details (requires authentication for sensitive data)
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .eq('id', merchantId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching merchant details:', err);
      return null;
    }
  };

  return {
    merchants: getMerchantsWithDistance(),
    loading,
    error,
    refetch: fetchMerchants,
    fetchMerchantDetails
  };
};