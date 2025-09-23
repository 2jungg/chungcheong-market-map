import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Star, Clock, Flame, Edit, Eye, MessageSquare, Type } from "lucide-react";
import { toast } from "sonner";

interface MerchantDashboardProps {
  stallName?: string;
}

const MerchantDashboard = ({ stallName = "햇살농산물 (박 할머니네)" }: MerchantDashboardProps) => {
  const [isLargeText, setIsLargeText] = useState(false);
  const [activeStatus, setActiveStatus] = useState<"special" | "soldout" | null>(null);

  const handleStatusToggle = (status: "special" | "soldout") => {
    if (activeStatus === status) {
      setActiveStatus(null);
      toast.info("기본 상태로 변경되었습니다.");
    } else {
      setActiveStatus(status);
      toast.success(
        status === "special" 
          ? "오늘의 특가 상태로 변경되었습니다!" 
          : "완판 임박 상태로 변경되었습니다!"
      );
    }
  };

  const textSizeClass = isLargeText ? "text-xl" : "text-base";
  const headingSizeClass = isLargeText ? "text-3xl" : "text-2xl";
  const titleSizeClass = isLargeText ? "text-xl" : "text-lg";

  // Mock data
  const stallData = {
    products: ["공주알밤", "유기농고구마", "햇자두", "청양고추"],
    category: "채소/과일",
    averageRating: 4.8,
    totalReviews: 24,
    recentReviews: [
      { id: 1, rating: 5, comment: "고구마가 정말 달고 맛있어요!", author: "김**" },
      { id: 2, rating: 5, comment: "친절하시고 신선한 과일 감사합니다", author: "이**" },
      { id: 3, rating: 4, comment: "가격도 저렴하고 좋네요", author: "박**" }
    ]
  };

  return (
    <div className={`min-h-screen bg-background p-6 ${isLargeText ? 'space-y-8' : 'space-y-6'}`}>
      {/* Header with Large Text Toggle */}
      <div className="flex justify-between items-center">
        <h1 className={`font-bold text-foreground ${headingSizeClass}`}>
          {stallName} 가게 관리
        </h1>
        
        <div className="flex items-center gap-3">
          <Type className="w-5 h-5 text-muted-foreground" />
          <span className={`text-muted-foreground ${textSizeClass}`}>큰 글씨 보기</span>
          <Switch 
            checked={isLargeText}
            onCheckedChange={setIsLargeText}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 실시간 가게 상태 변경 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className={titleSizeClass}>
              손님들에게 가게 상황을 알려주세요!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant={activeStatus === "special" ? "default" : "outline"}
                size="lg"
                className={`h-20 flex-col gap-2 ${textSizeClass} ${
                  activeStatus === "special" 
                    ? "bg-success hover:bg-success/90 text-white" 
                    : "border-success text-success hover:bg-success/10"
                }`}
                onClick={() => handleStatusToggle("special")}
              >
                <Flame className="w-6 h-6" />
                오늘의 특가
              </Button>
              
              <Button
                variant={activeStatus === "soldout" ? "default" : "outline"}
                size="lg"
                className={`h-20 flex-col gap-2 ${textSizeClass} ${
                  activeStatus === "soldout" 
                    ? "bg-destructive hover:bg-destructive/90 text-white" 
                    : "border-destructive text-destructive hover:bg-destructive/10"
                }`}
                onClick={() => handleStatusToggle("soldout")}
              >
                <Clock className="w-6 h-6" />
                완판 임박
              </Button>
            </div>
            
            <p className={`text-center text-muted-foreground ${isLargeText ? 'text-lg' : 'text-sm'}`}>
              버튼을 한 번 더 누르면 '기본 상태'로 돌아갑니다.
            </p>
          </CardContent>
        </Card>

        {/* 내 가게 정보 수정 */}
        <Card>
          <CardHeader>
            <CardTitle className={titleSizeClass}>내 가게 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className={`font-medium text-foreground ${textSizeClass}`}>가게 이름</h4>
                <p className={`text-muted-foreground ${textSizeClass}`}>{stallName}</p>
              </div>
              
              <div>
                <h4 className={`font-medium text-foreground ${textSizeClass}`}>가게 종류</h4>
                <Badge variant="secondary" className={textSizeClass}>
                  {stallData.category}
                </Badge>
              </div>
              
              <div>
                <h4 className={`font-medium text-foreground ${textSizeClass}`}>판매 물품</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {stallData.products.map((product, index) => (
                    <Badge key={index} variant="outline" className={textSizeClass}>
                      #{product}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className={`w-full flex items-center gap-2 ${textSizeClass}`}
              size={isLargeText ? "lg" : "default"}
            >
              <Edit className="w-4 h-4" />
              정보 수정하기
            </Button>
          </CardContent>
        </Card>

        {/* 방문객 리뷰 확인 */}
        <Card>
          <CardHeader>
            <CardTitle className={titleSizeClass}>우리 가게 리뷰</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 평점 요약 */}
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-1">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className={`font-bold text-foreground ${titleSizeClass}`}>
                  {stallData.averageRating}
                </span>
              </div>
              <div className={`text-muted-foreground ${textSizeClass}`}>
                {stallData.totalReviews}개의 리뷰
              </div>
            </div>
            
            {/* 최근 리뷰 목록 */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {stallData.recentReviews.map((review) => (
                <div key={review.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < review.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    <span className={`text-muted-foreground ${isLargeText ? 'text-base' : 'text-sm'}`}>
                      {review.author}
                    </span>
                  </div>
                  <p className={`text-foreground ${textSizeClass}`}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className={`w-full flex items-center gap-2 ${textSizeClass}`}
              size={isLargeText ? "lg" : "default"}
            >
              <MessageSquare className="w-4 h-4" />
              모든 리뷰 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantDashboard;