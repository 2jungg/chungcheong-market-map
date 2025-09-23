import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowLeft, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { marketData } from "@/utils/marketData";

interface Market {
  id: string;
  name: string;
  address: string;
  market_day: string;
  is_open: boolean;
  latitude: number;
  longitude: number;
}

interface MarketSelectorProps {
  selectedRegion: string;
  onMarketSelect: (marketId: string) => void;
  onBackToRegions: () => void;
  userLocation?: { latitude: number; longitude: number };
}

const MarketSelector = ({ 
  selectedRegion, 
  onMarketSelect, 
  onBackToRegions,
  userLocation 
}: MarketSelectorProps) => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const regionNames = {
    chungnam: "충청남도",
    chungbuk: "충청북도", 
    sejong: "세종특별자치시",
    daejeon: "대전광역시"
  };

  useEffect(() => {
    fetchMarkets();
  }, [selectedRegion]);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      
      // Get market data for the selected region
      const regionMarkets = marketData[selectedRegion as keyof typeof marketData] || [];
      setMarkets(regionMarkets.map(market => ({ ...market, is_open: false })));
    } catch (err) {
      console.error('Error fetching markets:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat: number, lng: number) => {
    if (!userLocation) return null;
    
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat - userLocation.latitude) * Math.PI / 180;
    const dLng = (lng - userLocation.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.latitude * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place
  };

  const getMarketDayText = (marketDay: string) => {
    const days = marketDay.split(',').map(d => d.trim());
    return `매월 ${days.join('일, ')}일`;
  };

  const isMarketOpenToday = (marketDay: string) => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const lastDigit = dayOfMonth % 10;
    const marketDays = marketDay.split(',').map(d => parseInt(d.trim()));
    return marketDays.includes(lastDigit);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">시장 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500 mb-4">시장 정보를 불러오는데 실패했습니다.</p>
          <Button onClick={() => fetchMarkets()}>다시 시도</Button>
        </div>
      </div>
    );
  }

  // Sort markets by distance if user location is available
  const sortedMarkets = userLocation 
    ? [...markets].sort((a, b) => {
        const distA = calculateDistance(a.latitude, a.longitude) || Infinity;
        const distB = calculateDistance(b.latitude, b.longitude) || Infinity;
        return distA - distB;
      })
    : markets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToRegions}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            지역 선택으로 돌아가기
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {regionNames[selectedRegion as keyof typeof regionNames]} 전통시장
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            방문하고 싶은 시장을 선택해주세요
          </p>
          
          {userLocation && (
            <div className="bg-primary/10 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">
                📍 현재 위치를 기반으로 가까운 순서대로 정렬되었습니다
              </p>
            </div>
          )}
        </div>

        {/* Markets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sortedMarkets.map((market) => {
            const distance = userLocation ? calculateDistance(market.latitude, market.longitude) : null;
            const isOpen = isMarketOpenToday(market.market_day);
            
            return (
              <Card 
                key={market.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/50"
                onClick={() => onMarketSelect(market.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold mb-2">
                        {market.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={isOpen ? "default" : "secondary"}>
                          {isOpen ? "오늘 장날" : "휴장일"}
                        </Badge>
                        {distance && (
                          <Badge variant="outline">
                            {distance}km
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {market.address}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {getMarketDayText(market.market_day)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        전통시장
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    variant={isOpen ? "default" : "outline"}
                  >
                    {market.name} 둘러보기
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {markets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              해당 지역에 등록된 시장이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketSelector;