import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Step2AIAnalysisProps {
  uploadedImage: string | null;
  stallData: {
    name: string;
    products: string[];
    category: string;
    location: { lat: number; lng: number };
  };
  onDataUpdate: (data: Partial<Step2AIAnalysisProps['stallData']>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step2AIAnalysis = ({ 
  uploadedImage, 
  stallData, 
  onDataUpdate, 
  onNext, 
  onPrevious 
}: Step2AIAnalysisProps) => {
  const [newProductTag, setNewProductTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock AI analysis data
  const aiAnalysisResults = {
    name: "햇살농산물 (박 할머니네)",
    products: ["공주알밤", "유기농고구마", "햇자두", "청양고추"],
    category: "채소/과일",
    location: { lat: 36.4606, lng: 127.2907 } // 충청남도 좌표
  };

  const categories = [
    "채소/과일",
    "수산물", 
    "정육",
    "음식점",
    "기타"
  ];

  useEffect(() => {
    // Simulate AI analysis loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      onDataUpdate(aiAnalysisResults);
      setIsLoading(false);
      toast.success("AI 분석이 완료되었습니다!");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNameChange = (value: string) => {
    onDataUpdate({ name: value });
  };

  const handleCategoryChange = (category: string) => {
    onDataUpdate({ category });
  };

  const handleAddProduct = () => {
    if (newProductTag.trim() && !stallData.products.includes(newProductTag.trim())) {
      onDataUpdate({ products: [...stallData.products, newProductTag.trim()] });
      setNewProductTag("");
    }
  };

  const handleRemoveProduct = (productToRemove: string) => {
    onDataUpdate({ 
      products: stallData.products.filter(product => product !== productToRemove) 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddProduct();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <h3 className="text-lg font-medium text-foreground">AI가 사진을 분석하고 있습니다...</h3>
          <p className="text-muted-foreground">잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          AI가 분석한 정보를 확인해주세요
        </h2>
        <p className="text-lg text-muted-foreground">
          AI가 사진을 분석하여 자동으로 정보를 입력했습니다. 틀린 부분이 있다면 직접 수정해주세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">업로드된 사진</h3>
          {uploadedImage && (
            <img 
              src={uploadedImage} 
              alt="업로드된 가게 사진" 
              className="w-full h-80 object-cover rounded-lg border border-border"
            />
          )}
        </div>

        {/* Right Column - Form */}
        <div className="space-y-6">
          {/* 가게 이름 */}
          <div className="space-y-2">
            <Label htmlFor="stallName" className="text-base font-medium">
              가게 이름 *
            </Label>
            <Input
              id="stallName"
              value={stallData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="예: 햇살농산물 (박 할머니네)"
              className="text-base py-3"
            />
          </div>

          {/* 판매 물품 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              주요 판매 물품 (AI 추천)
            </Label>
            
            {/* Product Tags */}
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-border rounded-md">
              {stallData.products.map((product, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm px-3 py-1 flex items-center gap-1"
                >
                  #{product}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => handleRemoveProduct(product)}
                  />
                </Badge>
              ))}
            </div>

            {/* Add new product */}
            <div className="flex gap-2">
              <Input
                value={newProductTag}
                onChange={(e) => setNewProductTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="새 물품 추가"
                className="text-base"
              />
              <Button 
                onClick={handleAddProduct}
                variant="outline"
                size="icon"
                disabled={!newProductTag.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              물품을 직접 입력하거나, AI 추천 태그를 클릭해서 삭제할 수 있어요.
            </p>
          </div>

          {/* 가게 종류 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">가게 종류</Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={stallData.category === category ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category)}
                  className="text-base py-3"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* 가게 위치 */}
          <div className="space-y-3">
            <Label className="text-base font-medium">가게 위치 확인</Label>
            <div className="p-4 border border-border rounded-md bg-muted/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                GPS 좌표: {stallData.location.lat.toFixed(6)}, {stallData.location.lng.toFixed(6)}
              </div>
              <div className="bg-muted h-32 rounded flex items-center justify-center text-muted-foreground">
                [지도 위치 표시 영역]
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                위치가 정확하지 않다면, 지도 위의 핀을 움직여 조절할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="px-8 py-2 text-lg"
        >
          이전 단계로
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!stallData.name || stallData.products.length === 0}
          className="px-8 py-2 text-lg bg-primary hover:bg-primary/90"
        >
          다음 단계로
        </Button>
      </div>
    </div>
  );
};

export default Step2AIAnalysis;