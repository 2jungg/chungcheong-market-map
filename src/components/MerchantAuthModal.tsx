import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MerchantAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (merchantId: string) => void;
}

const MerchantAuthModal = ({ isOpen, onClose, onAuthenticated }: MerchantAuthModalProps) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      
      // Simple password verification (in production, use proper hashing)
      const { data: authData, error } = await supabase
        .from('merchant_auth')
        .select('merchant_id')
        .eq('password_hash', password)
        .single();

      if (error || !authData) {
        toast.error("잘못된 비밀번호입니다.");
        return;
      }

      onAuthenticated(authData.merchant_id);
      onClose();
      toast.success("인증되었습니다!");
      
    } catch (err) {
      console.error('Auth error:', err);
      toast.error("인증 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>가게 관리 인증</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="password">가게 비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="가게 등록 시 설정한 비밀번호"
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button 
              onClick={handleAuth} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? "인증 중..." : "인증하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MerchantAuthModal;