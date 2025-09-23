import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url?: string;
}

interface Merchant {
  id: string;
  name: string;
  owner_name: string;
  description: string;
  phone: string;
  address: string;
  market_day: string;
  opening_time: string;
  closing_time: string;
  is_open: boolean;
  image_url?: string;
}

interface MerchantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string | null;
}

const MerchantDetailModal = ({ isOpen, onClose, merchantId }: MerchantDetailModalProps) => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && merchantId) {
      fetchMerchantData();
    }
  }, [isOpen, merchantId]);

  const fetchMerchantData = async () => {
    if (!merchantId) return;

    setLoading(true);
    try {
      // Fetch merchant details
      const { data: merchantData, error: merchantError } = await supabase
        .from('merchants')
        .select('*')
        .eq('id', merchantId)
        .single();

      if (merchantError) throw merchantError;
      setMerchant(merchantData);

      // Fetch merchant products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('merchant_id', merchantId);

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching merchant data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  if (!merchant && !loading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {loading ? '로딩 중...' : merchant?.name}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : merchant ? (
          <div className="space-y-6">
            {/* Merchant Image */}
            {merchant.image_url && (
              <div className="w-full h-48 rounded-lg overflow-hidden">
                <img 
                  src={merchant.image_url} 
                  alt={merchant.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Merchant Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{merchant.owner_name}</h3>
                <Badge variant={merchant.is_open ? "default" : "secondary"}>
                  {merchant.is_open ? '현재 영업 중' : '영업 종료'}
                </Badge>
              </div>

              <p className="text-muted-foreground">{merchant.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{merchant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{merchant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {merchant.opening_time} - {merchant.closing_time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{merchant.market_day}</span>
                </div>
              </div>
            </div>

            {/* Products */}
            {products.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4">판매 상품</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <Card key={product.id} className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>
                        <p className="text-lg font-semibold text-primary">
                          {formatPrice(product.price)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default MerchantDetailModal;