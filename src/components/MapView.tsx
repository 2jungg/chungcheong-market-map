import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface MapMarker {
  id: string;
  name: string;
  productTags: string[];
  x: number; // percentage from left
  y: number; // percentage from top
}

interface MapViewProps {
  selectedStallId: string | null;
  onMarkerClick: (id: string) => void;
}

const mockMarkers: MapMarker[] = [
  {
    id: "1",
    name: "햇살농산물",
    productTags: ["공주알밤", "유기농고구마", "햇자두", "청양고추"],
    x: 35,
    y: 45
  },
  {
    id: "2",
    name: "산골야채마을", 
    productTags: ["무농약배추", "대파", "시금치", "상추"],
    x: 60,
    y: 30
  },
  {
    id: "3",
    name: "바다생선가게",
    productTags: ["고등어", "갈치", "오징어", "새우젓"],
    x: 20,
    y: 70
  },
  {
    id: "4",
    name: "전통떡집",
    productTags: ["인절미", "송편", "백설기", "개피떡"],
    x: 75,
    y: 55
  },
  {
    id: "5",
    name: "계절과일상회",
    productTags: ["사과", "배", "감", "곶감"],
    x: 45,
    y: 25
  }
];

const MapView = ({ selectedStallId, onMarkerClick }: MapViewProps) => {
  const [showInfoWindow, setShowInfoWindow] = useState<string | null>(null);

  useEffect(() => {
    if (selectedStallId) {
      setShowInfoWindow(selectedStallId);
      // Auto-hide info window after 5 seconds
      const timer = setTimeout(() => {
        setShowInfoWindow(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedStallId]);

  const handleMarkerClick = (markerId: string) => {
    onMarkerClick(markerId);
    setShowInfoWindow(markerId);
  };

  return (
    <div className="w-full h-full bg-muted/30 relative overflow-hidden rounded-lg">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
            {/* Street lines */}
            <line x1="0" y1="30" x2="100" y2="30" stroke="#94a3b8" strokeWidth="0.2" />
            <line x1="0" y1="70" x2="100" y2="70" stroke="#94a3b8" strokeWidth="0.2" />
            <line x1="25" y1="0" x2="25" y2="100" stroke="#94a3b8" strokeWidth="0.2" />
            <line x1="75" y1="0" x2="75" y2="100" stroke="#94a3b8" strokeWidth="0.2" />
            
            {/* Building blocks */}
            <rect x="30" y="35" width="15" height="10" fill="#e2e8f0" opacity="0.5" />
            <rect x="50" y="75" width="20" height="8" fill="#e2e8f0" opacity="0.5" />
            <rect x="10" y="50" width="12" height="15" fill="#e2e8f0" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Placeholder Text */}
      <div className="absolute top-6 left-6 right-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-border">
        <h3 className="font-semibold text-foreground mb-1">
          인터랙티브 지도 영역
        </h3>
        <p className="text-sm text-muted-foreground">
          네이버/카카오 지도 API가 통합될 예정입니다
        </p>
      </div>

      {/* Map Markers */}
      {mockMarkers.map((marker) => {
        const isSelected = selectedStallId === marker.id;
        const showInfo = showInfoWindow === marker.id;
        
        return (
          <div key={marker.id} className="absolute" style={{ left: `${marker.x}%`, top: `${marker.y}%` }}>
            {/* Info Window */}
            {showInfo && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
                <div className="bg-white border border-border rounded-lg shadow-lg p-3 min-w-48">
                  <h4 className="font-semibold text-sm text-foreground mb-2">
                    {marker.name}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {marker.productTags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="product-tag text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-px">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Marker */}
            <button
              onClick={() => handleMarkerClick(marker.id)}
              className={`transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 z-10 ${
                isSelected ? 'scale-125' : 'scale-100'
              }`}
            >
              <div className={`relative ${isSelected ? 'animate-pulse' : ''}`}>
                <MapPin 
                  className={`w-8 h-8 drop-shadow-md ${
                    isSelected 
                      ? 'text-accent fill-accent/20' 
                      : 'text-primary fill-primary/20'
                  }`}
                />
                <div className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                  isSelected ? 'bg-accent' : 'bg-primary'
                }`} />
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MapView;