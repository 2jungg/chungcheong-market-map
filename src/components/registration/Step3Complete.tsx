import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, X } from "lucide-react";

interface Step3CompleteProps {
  onComplete: () => void;
  onClose: () => void;
}

const Step3Complete = ({ onComplete, onClose }: Step3CompleteProps) => {
  return (
    <div className="space-y-8 text-center py-12">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="p-6 bg-success/10 rounded-full">
          <CheckCircle className="w-16 h-16 text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          등록이 완료되었습니다!
        </h2>
        <div className="max-w-md mx-auto space-y-2">
          <p className="text-lg text-muted-foreground leading-relaxed">
            이제 '충청 시장 커넥트' 지도에서 사장님의 가게를 찾을 수 있습니다.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            '가게 관리' 페이지로 이동하여 실시간 정보를 업데이트 해보세요.
          </p>
        </div>
      </div>

      {/* Celebration Animation */}
      <div className="flex justify-center items-center gap-2 text-primary">
        <span className="text-2xl animate-bounce">🎉</span>
        <span className="text-lg font-medium">환영합니다!</span>
        <span className="text-2xl animate-bounce animation-delay-150">🎉</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button 
          onClick={onComplete}
          className="px-8 py-3 text-lg bg-primary hover:bg-primary/90 flex items-center gap-2"
          size="lg"
        >
          내 가게 관리하기
          <ArrowRight className="w-5 h-5" />
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onClose}
          className="px-8 py-3 text-lg"
          size="lg"
        >
          닫기
        </Button>
      </div>

      {/* Additional Information */}
      <div className="pt-8 border-t border-border">
        <div className="bg-primary/5 rounded-lg p-6 max-w-lg mx-auto">
          <h3 className="font-medium text-foreground mb-2">
            다음에 할 수 있는 일들:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li>• 실시간 영업 상태 업데이트</li>
            <li>• 특가 상품 및 완판 임박 알림 설정</li>
            <li>• 가게 정보 및 판매 물품 수정</li>
            <li>• 고객 리뷰 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step3Complete;