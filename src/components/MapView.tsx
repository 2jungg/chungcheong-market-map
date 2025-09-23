import { useEffect, useRef, useState } from 'react';
import { useMerchants } from "@/hooks/useMerchants";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapMarker {
  id: string;
  name: string;
  productTags: string[];
  lat: number; // 위도
  lng: number; // 경도
}

interface MapViewProps {
  selectedStallId: string | null;
  onMarkerClick: (id: string) => void;
}

// 충청남도 공주시 중심 좌표 (공주시장 주변)
const mockMarkers: MapMarker[] = [
  {
    id: "1",
    name: "햇살농산물 (박 할머니네)",
    productTags: ["공주알밤", "유기농고구마", "햇자두"],
    lat: 36.4606,
    lng: 127.1197
  },
  {
    id: "2", 
    name: "바다의 선물 (이 사장님)",
    productTags: ["서해새우젓", "꽃게", "민어"],
    lat: 36.4596,
    lng: 127.1207
  },
  {
    id: "3",
    name: "정육점 김사장",
    productTags: ["한우", "돼지고기", "닭고기"],
    lat: 36.4616,
    lng: 127.1187
  },
  {
    id: "4",
    name: "전통떡집 (할머니네)",
    productTags: ["인절미", "송편", "백설기"],
    lat: 36.4586,
    lng: 127.1217
  },
  {
    id: "5",
    name: "청양고추 전문점",
    productTags: ["청양고추", "오이", "배추"],
    lat: 36.4626,
    lng: 127.1177
  }
];

const MapView = ({ selectedStallId, onMarkerClick }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const infoWindows = useRef<any[]>([]);
  const { merchants, loading } = useMerchants();
  const [isMapReady, setIsMapReady] = useState(false);

  // 카카오맵 초기화
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapContainer.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(36.4606, 127.1197), // 공주시 중심
      level: 3 // 확대 레벨
    };

    map.current = new window.kakao.maps.Map(mapContainer.current, options);
    setIsMapReady(true);
  }, []);

  // 마커 생성 및 관리
  useEffect(() => {
    if (!isMapReady || !map.current) return;

    // 기존 마커들 제거
    markers.current.forEach(marker => marker.setMap(null));
    infoWindows.current.forEach(infoWindow => infoWindow.close());
    markers.current = [];
    infoWindows.current = [];

    // 새 마커들 생성
    merchants.forEach((merchant) => {
      const position = new window.kakao.maps.LatLng(merchant.latitude, merchant.longitude);
      
      // 마커 이미지 설정
      const isSelected = selectedStallId === merchant.id;
      const imageSrc = isSelected 
        ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
        : 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      
      const imageSize = new window.kakao.maps.Size(24, 35);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: position,
        image: markerImage
      });

      marker.setMap(map.current);
      markers.current.push(marker);

      // 인포윈도우 생성
      const infoWindowContent = `
        <div style="padding:10px;width:200px;">
          <h4 style="margin:0 0 5px 0;font-size:14px;font-weight:bold;">${merchant.name}</h4>
          <p style="margin:0 0 4px 0;font-size:12px;color:#666;">사장님: ${merchant.owner_name}</p>
          <p style="margin:0 0 4px 0;font-size:12px;color:#666;">영업일: ${merchant.market_day}</p>
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:${merchant.is_open ? '#10b981' : '#6b7280'};"></span>
            <span style="font-size:12px;color:#666;">${merchant.is_open ? '현재 영업 중' : '영업 종료'}</span>
          </div>
          <p style="margin:0;font-size:12px;color:#666;">클릭하여 상세정보 보기</p>
        </div>
      `;

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: infoWindowContent
      });

      infoWindows.current.push(infoWindow);

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        // 다른 인포윈도우들 닫기
        infoWindows.current.forEach(iw => iw.close());
        
        // 현재 인포윈도우 열기
        infoWindow.open(map.current, marker);
        
        // 상위 컴포넌트에 클릭 이벤트 전달
        onMarkerClick(merchant.id);
      });

      // 선택된 마커의 인포윈도우 열기
      if (isSelected) {
        infoWindow.open(map.current, marker);
        // 선택된 마커 중심으로 이동
        map.current.setCenter(position);
      }
    });
  }, [isMapReady, selectedStallId, onMarkerClick, merchants]);

  if (!window.kakao || !window.kakao.maps) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg font-medium text-foreground mb-2">카카오맵을 불러오고 있어요</p>
          <p className="text-sm text-muted-foreground">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-muted rounded-lg overflow-hidden relative">
      <div 
        ref={mapContainer} 
        className="w-full h-full"
      />
      
      {/* 지도 컨트롤 오버레이 */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground">공주시 전통시장</p>
        <p className="text-xs text-muted-foreground">실시간 업데이트</p>
      </div>

      {/* 범례 */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>일반 상점</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>선택된 상점</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;