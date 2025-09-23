import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { resizeImage, validateImageFile, createImagePreview, extractGPSFromImage } from "@/utils/imageUtils";

interface Step1PhotoUploadProps {
  onPhotoUpload: (file: File, imageUrl: string, gpsData?: { lat: number; lng: number }) => void;
  onNext: () => void;
  onCancel: () => void;
  hasPhoto: boolean;
}

const Step1PhotoUpload = ({ onPhotoUpload, onNext, onCancel, hasPhoto }: Step1PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file
    const validation = validateImageFile(file, 10);
    if (!validation.valid) {
      toast.error(validation.error!);
      return;
    }

    setUploading(true);
    
    try {
      // Resize image to prevent database overload
      const resizedBlob = await resizeImage(file, 800, 600, 0.8);
      
      // Create preview URL from resized image
      const previewUrl = URL.createObjectURL(resizedBlob);
      setPreviewImage(previewUrl);
      
      // Extract GPS data
      const gpsData = await extractGPSFromImage(file);
      
      onPhotoUpload(file, previewUrl, gpsData || undefined);
      setUploading(false);
      toast.success("사진이 성공적으로 업로드되었습니다!");
      
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("사진 업로드에 실패했습니다.");
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewImage(null);
    // This needs to be fixed, but we'll handle the reset logic in the parent.
    // For now, just clear the preview.
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
          가게(좌판) 사진 등록하기
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
          스마트폰으로 현재 판매하시는 좌판 사진을 찍거나, 저장된 사진을 올려주세요.<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>위치 정보가 자동으로 입력됩니다.
        </p>
      </div>

      <div className="relative">
        {previewImage ? (
          <div className="relative">
            <img 
              src={previewImage} 
              alt="업로드된 사진" 
              className="w-full h-60 sm:h-80 object-cover rounded-lg border-2 border-border"
            />
            <Button
              onClick={handleRemovePhoto}
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 sm:p-12 text-center cursor-pointer transition-colors duration-200 ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-accent/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              capture="environment"
            />
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center">
                <div className="p-4 sm:p-6 bg-primary/10 rounded-full">
                  <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium text-foreground">
                  여기를 클릭해서 사진 촬영 또는 업로드
                </h3>
                <p className="text-sm text-muted-foreground">
                  또는 사진을 여기로 드래그하세요
                </p>
              </div>
              
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Camera className="w-4 h-4" />
                  카메라 촬영
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="w-4 h-4" />
                  갤러리에서 선택
                </div>
              </div>
            </div>
            
            {uploading && (
              <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground">
                    사진을 업로드하고 AI가 분석하는 중...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4 gap-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="px-4 sm:px-8 py-2 text-base sm:text-lg flex-1 sm:flex-none"
        >
          취소
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!hasPhoto || uploading}
          className="px-4 sm:px-8 py-2 text-base sm:text-lg bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
        >
          다음 단계로
        </Button>
      </div>
    </div>
  );
};

export default Step1PhotoUpload;
