import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import chungnamCi from "@/assets/chungnam-ci.png";
import chungbukCi from "@/assets/chungbuk-ci.png";
import sejongCi from "@/assets/sejong-ci.png";

interface RegionSelectorProps {
  onRegionSelect: (region: string) => void;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const RegionSelector = ({ onRegionSelect }: RegionSelectorProps) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearestRegion, setNearestRegion] = useState<string | null>(null);

  const regions = [
    {
      id: "chungnam",
      name: "충청남도",
      description: "충청남도의 전통시장을 만나보세요",
      image: chungnamCi,
      center: { lat: 36.5, lng: 126.9 }
    },
    {
      id: "chungbuk", 
      name: "충청북도",
      description: "충청북도의 전통시장을 만나보세요",
      image: chungbukCi,
      center: { lat: 36.6, lng: 127.5 }
    },
    {
      id: "sejong",
      name: "세종특별자치시",
      description: "세종시의 전통시장을 만나보세요", 
      image: sejongCi,
      center: { lat: 36.5, lng: 127.3 }
    }
  ];

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 GPS 기능을 지원하지 않습니다.");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setUserLocation(location);
        
        // 가장 가까운 지역 찾기
        let minDistance = Infinity;
        let closest = "";
        
        regions.forEach(region => {
          const distance = calculateDistance(
            location.latitude, 
            location.longitude,
            region.center.lat,
            region.center.lng
          );
          
          if (distance < minDistance) {
            minDistance = distance;
            closest = region.id;
          }
        });
        
        setNearestRegion(closest);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("GPS 위치 정보를 가져오는데 실패했습니다:", error);
        alert("GPS 위치 정보를 가져오는데 실패했습니다. 수동으로 지역을 선택해주세요.");
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            충청 전통시장 연결
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            원하시는 지역을 선택하여 전통시장을 탐색해보세요
          </p>
          
          <Button
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            variant="outline"
            size="lg"
            className="mb-8"
          >
            {isGettingLocation ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                현재 위치 확인 중...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                GPS로 자동 지역 선택
              </>
            )}
          </Button>

          {nearestRegion && userLocation && (
            <div className="bg-primary/10 rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                현재 위치를 기반으로 추천드리는 지역입니다
              </p>
              <p className="font-semibold text-primary">
                {regions.find(r => r.id === nearestRegion)?.name}
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {regions.map((region) => (
            <Card 
              key={region.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
                nearestRegion === region.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onRegionSelect(region.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white p-2 shadow-md">
                  <img 
                    src={region.image} 
                    alt={`${region.name} CI`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl font-bold">
                  {region.name}
                </CardTitle>
                {nearestRegion === region.id && (
                  <div className="text-sm text-primary font-medium">
                    📍 가장 가까운 지역
                  </div>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  {region.description}
                </CardDescription>
                <Button 
                  className="w-full mt-4"
                  variant={nearestRegion === region.id ? "default" : "outline"}
                >
                  {region.name} 시장 보기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;