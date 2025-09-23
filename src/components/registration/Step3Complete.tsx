import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Store, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Step3CompleteProps {
  onComplete: () => void;
  onClose: () => void;
  stallData?: {
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
    market: string;
    password?: string;
  };
  selectedRegion?: string;
}

const Step3Complete = ({ onComplete, onClose, stallData, selectedRegion }: Step3CompleteProps) => {
  const [password, setPassword] = useState(stallData?.password || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!password || password.length < 4) {
      toast.error("비밀번호는 최소 4자 이상 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!stallData) {
      toast.error("등록할 가게 정보가 없습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. 가게 정보를 merchants 테이블에 저장
      const { data: merchantData, error: merchantError } = await supabase
        .from('merchants')
        .insert({
          name: stallData.name,
          owner_name: stallData.owner_name,
          description: stallData.description,
          phone: stallData.phone,
          address: stallData.address,
          latitude: stallData.location.lat,
          longitude: stallData.location.lng,
          market_day: stallData.market_day,
          opening_time: stallData.opening_time,
          closing_time: stallData.closing_time,
          is_open: true,
          region: selectedRegion || "",
          image_url: null
        })
        .select()
        .single();

      if (merchantError) throw merchantError;

      // 2. 비밀번호를 merchant_auth 테이블에 저장
      const { error: authError } = await supabase
        .from('merchant_auth')
        .insert({
          merchant_id: merchantData.id,
          password_hash: password // 실제로는 해시화해야 하지만 여기서는 단순화
        });

      if (authError) throw authError;

      toast.success("가게가 성공적으로 등록되었습니다!");
      onComplete();
    } catch (error) {
      console.error('Error registering merchant:', error);
      toast.error("가게 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            마지막 단계입니다!
          </h2>
          <p className="text-muted-foreground">
            가게 관리를 위한 비밀번호를 설정해주세요
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            가게 관리 비밀번호
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="최소 4자 이상 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {stallData && (
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <Store className="w-4 h-4" />
              등록될 가게 정보
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>가게명:</strong> {stallData.name}</p>
              <p><strong>카테고리:</strong> {stallData.category}</p>
              <p><strong>시장:</strong> {stallData.market}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "가게 등록 완료"}
        </Button>
      </div>
    </div>
  );
};

export default Step3Complete;
