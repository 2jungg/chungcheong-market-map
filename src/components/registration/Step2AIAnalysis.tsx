import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MapPin } from "lucide-react";
import { toast } from "sonner";
import { analyzeImageWithGemini } from "@/utils/imageUtils";

interface Step2AIAnalysisProps {
  uploadedImage: string | null;
  uploadedFile: File | null;
  stallData: {
    name: string;
    description: string;
    owner_name: string;
    address: string;
    market_day: string;
    opening_time: string;
    closing_time: string;
    phone: string;
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
  uploadedFile,
  stallData, 
  onDataUpdate, 
  onNext, 
  onPrevious 
}: Step2AIAnalysisProps) => {
  const [newProductTag, setNewProductTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    "채소/과일",
    "수산물",
    "정육",
    "음식점",
    "기타"
  ];

  useEffect(() => {
    const performAnalysis = async () => {
      if (uploadedFile) {
        setIsLoading(true);
        try {
          const analysisResult = await analyzeImageWithGemini(uploadedFile);
          if (analysisResult) {
            onDataUpdate(analysisResult);
            toast.success("AI 분석이 완료되었습니다!");
          } else {
            toast.error("AI 분석에 실패했습니다. 정보를 직접 입력해주세요.");
          }
        } catch (error) {
          console.error("Error during AI analysis:", error);
          toast.error("AI 분석 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    performAnalysis();
  }, [uploadedFile]);

  const handleDataChange = (field: keyof typeof stallData, value: any) => {
    onDataUpdate({ [field]: value });
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
              onChange={(e) => handleDataChange('name', e.target.value)}
              placeholder="예: 햇살농산물 (박 할머니네)"
              className="text-base py-3"
            />
          </div>

          {/* 가게 설명 */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">
              가게 설명
            </Label>
            <Input
              id="description"
              value={stallData.description}
              onChange={(e) => handleDataChange('description', e.target.value)}
              placeholder="예: 신선한 제철 과일과 채소를 판매합니다."
              className="text-base py-3"
            />
          </div>

          {/* 사업자명 */}
          <div className="space-y-2">
            <Label htmlFor="owner_name" className="text-base font-medium">
              사업자명
            </Label>
            <Input
              id="owner_name"
              value={stallData.owner_name}
              onChange={(e) => handleDataChange('owner_name', e.target.value)}
              placeholder="예: 박할머니"
              className="text-base py-3"
            />
          </div>

          {/* 상세 주소 */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-base font-medium">
              상세 주소
            </Label>
            <Input
              id="address"
              value={stallData.address}
              onChange={(e) => handleDataChange('address', e.target.value)}
              placeholder="예: 충북 청주시 상당구 육거리시장"
              className="text-base py-3"
            />
          </div>

          {/* 장날 */}
          <div className="space-y-2">
            <Label htmlFor="market_day" className="text-base font-medium">
              장날
            </Label>
            <Input
              id="market_day"
              value={stallData.market_day}
              onChange={(e) => handleDataChange('market_day', e.target.value)}
              placeholder="예: 1,6"
              className="text-base py-3"
            />
          </div>

          {/* 운영시간 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="opening_time" className="text-base font-medium">
                운영 시작 시간
              </Label>
              <Input
                id="opening_time"
                type="time"
                value={stallData.opening_time}
                onChange={(e) => handleDataChange('opening_time', e.target.value)}
                className="text-base py-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closing_time" className="text-base font-medium">
                운영 종료 시간
              </Label>
              <Input
                id="closing_time"
                type="time"
                value={stallData.closing_time}
                onChange={(e) => handleDataChange('closing_time', e.target.value)}
                className="text-base py-3"
              />
            </div>
          </div>

          {/* 연락처 */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">
              연락처
            </Label>
            <Input
              id="phone"
              value={stallData.phone}
              onChange={(e) => handleDataChange('phone', e.target.value)}
              placeholder="예: 010-1234-5678"
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
