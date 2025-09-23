import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MapView from "@/components/MapView";
import MerchantRegistrationModal from "@/components/MerchantRegistrationModal";
import MerchantDashboard from "@/components/MerchantDashboard";
import MerchantDetailModal from "@/components/MerchantDetailModal";
import LoadingScreen from "@/components/LoadingScreen";
import KakaoMapSetup from "@/components/KakaoMapSetup";
import { useKakaoMap } from "@/hooks/useKakaoMap";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedStallId, setSelectedStallId] = useState<string | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [showMerchantDashboard, setShowMerchantDashboard] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [kakaoApiKey, setKakaoApiKey] = useState<string | null>(null);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [isMerchantDetailOpen, setIsMerchantDetailOpen] = useState(false);
  
  const isMobile = useIsMobile();
  const { isLoaded: isMapLoaded } = useKakaoMap({ apiKey: kakaoApiKey || undefined });

  const handleStallSelect = (id: string) => {
    setSelectedStallId(id);
    setIsMerchantDetailOpen(true);
  };

  const handleMarkerClick = (id: string) => {
    setSelectedStallId(id);
    setIsMerchantDetailOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationComplete = () => {
    setShowMerchantDashboard(true);
  };

  const handleCloseModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const handleLoadingComplete = () => {
    setIsAppLoaded(true);
    // API 키를 자동으로 설정
    const apiKey = "f51bfd81bde558126cb30b3d1052ab13";
    setKakaoApiKey(apiKey);
    localStorage.setItem('kakao-api-key', apiKey);
  };

  const handleApiKeySet = (apiKey: string) => {
    setKakaoApiKey(apiKey);
    localStorage.setItem('kakao-api-key', apiKey);
    setShowApiSetup(false);
  };

  const handleSkipApiSetup = () => {
    setShowApiSetup(false);
  };

  // 로딩 화면 표시
  if (!isAppLoaded || !isMapLoaded) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (showMerchantDashboard) {
    return <MerchantDashboard />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header onRegisterClick={handleRegisterClick} />
      
      {/* Main Content - Different layout for mobile vs desktop */}
      {isMobile ? (
        // Mobile Layout: Map on top, Sidebar below
        <div className="flex flex-col flex-1">
          {/* Map Area - Takes 60% of remaining height */}
          <div className="h-[60vh] p-4">
            <MapView 
              selectedStallId={selectedStallId}
              onMarkerClick={handleMarkerClick}
            />
          </div>
          
          {/* Sidebar Area - Takes remaining 40% */}
          <div className="flex-1 min-h-[40vh]">
            <Sidebar 
              selectedStallId={selectedStallId}
              onStallSelect={handleStallSelect}
            />
          </div>
        </div>
      ) : (
        // Desktop Layout: Sidebar left, Map right
        <div className="flex flex-1">
          {/* Left Sidebar - 35% */}
          <div className="w-[35%] h-[calc(100vh-4rem)]">
            <Sidebar 
              selectedStallId={selectedStallId}
              onStallSelect={handleStallSelect}
            />
          </div>
          
          {/* Right Map Area - 65% */}
          <div className="w-[65%] h-[calc(100vh-4rem)] p-6">
            <MapView 
              selectedStallId={selectedStallId}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <MerchantRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseModal}
        onComplete={handleRegistrationComplete}
      />

      {/* Merchant Detail Modal */}
      <MerchantDetailModal
        isOpen={isMerchantDetailOpen}
        onClose={() => setIsMerchantDetailOpen(false)}
        merchantId={selectedStallId}
      />
    </div>
  );
};

export default Index;