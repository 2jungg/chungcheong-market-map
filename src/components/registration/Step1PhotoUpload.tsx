import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface Step1PhotoUploadProps {
  onPhotoUpload: (imageUrl: string) => void;
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
    if (!file.type.startsWith('image/')) {
      toast.error("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    setUploading(true);
    
    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      
      // Simulate AI processing with delay
      setTimeout(() => {
        onPhotoUpload(previewUrl);
        setUploading(false);
        toast.success("사진이 성공적으로 업로드되었습니다!");
      }, 1500);
      
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("사진 업로드에 실패했습니다.");
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewImage(null);
    onPhotoUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          가게(좌판) 사진 등록하기
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          스마트폰으로 현재 판매하시는 좌판 사진을 찍거나, 저장된 사진을 올려주세요.<br />
          위치 정보가 자동으로 입력됩니다.
        </p>
      </div>

      <div className="relative">
        {previewImage ? (
          <div className="relative">
            <img 
              src={previewImage} 
              alt="업로드된 사진" 
              className="w-full h-80 object-cover rounded-lg border-2 border-border"
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
            className={`relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ${
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
            
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-6 bg-primary/10 rounded-full">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">
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

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="px-8 py-2 text-lg"
        >
          취소
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!hasPhoto || uploading}
          className="px-8 py-2 text-lg bg-primary hover:bg-primary/90"
        >
          다음 단계로
        </Button>
      </div>
    </div>
  );
};

export default Step1PhotoUpload;