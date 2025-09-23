import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Step1PhotoUpload from "./registration/Step1PhotoUpload";
import Step2AIAnalysis from "./registration/Step2AIAnalysis";
import Step3Complete from "./registration/Step3Complete";

interface MerchantRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  selectedMarket?: string;
  selectedRegion?: string;
}

const initialStallData = {
  name: "",
  description: "",
  owner_name: "",
  address: "",
  market_day: "",
  opening_time: "",
  closing_time: "",
  phone: "",
  products: [] as string[],
  category: "",
  location: { lat: 0, lng: 0 },
  market: "",
  password: ""
};

const MerchantRegistrationModal = ({ isOpen, onClose, onComplete, selectedMarket, selectedRegion }: MerchantRegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [stallData, setStallData] = useState({ ...initialStallData, market: selectedMarket || "" });
  const [gpsData, setGpsData] = useState<{ lat: number; lng: number } | null>(null);

  const totalSteps = 3;
  const progressValue = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (file: File, imageUrl: string, gpsData?: { lat: number; lng: number }) => {
    setUploadedFile(file);
    setUploadedImage(imageUrl);
    if (gpsData) {
      setGpsData(gpsData);
      setStallData(prev => ({ ...prev, location: gpsData }));
    }
  };

  const handleStallDataUpdate = (data: Partial<typeof stallData>) => {
    setStallData(prev => ({ ...prev, ...data }));
  };

  const resetModal = () => {
    setCurrentStep(1);
    setUploadedImage(null);
    setUploadedFile(null);
    setStallData({ ...initialStallData, market: selectedMarket || "" });
    setGpsData(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetModal();
      onClose();
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PhotoUpload
            onPhotoUpload={handlePhotoUpload}
            onNext={handleNext}
            onCancel={onClose}
            hasPhoto={!!uploadedImage}
          />
        );
      case 2:
        return (
          <Step2AIAnalysis
            uploadedImage={uploadedImage}
            uploadedFile={uploadedFile}
            stallData={stallData}
            onDataUpdate={handleStallDataUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Step3Complete
            onComplete={handleComplete}
            onClose={onClose}
            stallData={stallData}
            selectedRegion={selectedRegion}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-full mx-4 sm:mx-auto p-0 overflow-hidden">
        <DialogHeader className="px-4 sm:px-8 py-4 sm:py-6 border-b border-border">
          <div className="space-y-4">
            <DialogTitle className="text-lg sm:text-2xl font-bold text-foreground text-center leading-tight">
              사장님, 환영합니다!<br className="sm:hidden" /> <span className="sm:inline">3단계로 가게를 등록해보세요</span>
            </DialogTitle>
            
            <div className="space-y-2">
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{currentStep}/3 단계</span>
              </div>
              <Progress value={progressValue} className="w-full h-2" />
            </div>
          </div>
        </DialogHeader>
        
        <div className="px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MerchantRegistrationModal;
