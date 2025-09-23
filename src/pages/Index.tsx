import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MapView from "@/components/MapView";
import MerchantRegistrationModal from "@/components/MerchantRegistrationModal";
import MerchantDashboard from "@/components/MerchantDashboard";

const Index = () => {
  const [selectedStallId, setSelectedStallId] = useState<string | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [showMerchantDashboard, setShowMerchantDashboard] = useState(false);

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