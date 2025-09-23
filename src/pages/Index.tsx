import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MapView from "@/components/MapView";
import MerchantRegistrationModal from "@/components/MerchantRegistrationModal";
import MerchantDashboard from "@/components/MerchantDashboard";
import LoadingScreen from "@/components/LoadingScreen";
import KakaoMapSetup from "@/components/KakaoMapSetup";
import { useKakaoMap } from "@/hooks/useKakaoMap";

const Index = () => {
  const [selectedStallId, setSelectedStallId] = useState<string | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [showMerchantDashboard, setShowMerchantDashboard] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [kakaoApiKey, setKakaoApiKey] = useState<string | null>(null);
  const [showApiSetup, setShowApiSetup] = useState(false);
  
  const { isLoaded: isMapLoaded } = useKakaoMap({ apiKey: kakaoApiKey || undefined });

  const handleStallSelect = (id: string) => {
    setSelectedStallId(selectedStallId === id ? null : id);
  };

  const handleMarkerClick = (id: string) => {
    setSelectedStallId(selectedStallId === id ? null : id);
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
      
      {/* Main Content */}
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

      {/* Registration Modal */}
      <MerchantRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseModal}
        onComplete={handleRegistrationComplete}
      />
    </div>
  );
};

export default Index;