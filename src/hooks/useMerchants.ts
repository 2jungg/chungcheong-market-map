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
}

export const useMerchants = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .order('created_at', { ascending: false });

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

  const getMerchantsWithDistance = () => {
    return merchants.map(merchant => ({
      ...merchant,
      distance: `${calculateDistance(merchant.latitude, merchant.longitude)}km`
    }));
  };

  return {
    merchants: getMerchantsWithDistance(),
    loading,
    error,
    refetch: fetchMerchants
  };
};