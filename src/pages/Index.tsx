import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MapView from "@/components/MapView";

const Index = () => {
  const [selectedStallId, setSelectedStallId] = useState<string | null>(null);

  const handleStallSelect = (id: string) => {
    setSelectedStallId(selectedStallId === id ? null : id);
  };

  const handleMarkerClick = (id: string) => {
    setSelectedStallId(selectedStallId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />
      
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
    </div>
  );
};

export default Index;