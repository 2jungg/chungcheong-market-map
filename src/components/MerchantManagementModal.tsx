import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Store } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Merchant } from "@/hooks/useMerchants";

interface MerchantManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onEdit: () => void;
}

const MerchantManagementModal = ({ isOpen, onClose, merchantId, onEdit }: MerchantManagementModalProps) => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && merchantId) {
      fetchMerchant();
    }
  }, [isOpen, merchantId]);

  const fetchMerchant = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .eq('id', merchantId)
        .single();

      if (error) throw error;
      setMerchant(data);
    } catch (err) {
      console.error('Error fetching merchant:', err);
      toast.error("가게 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete merchant (cascade will handle merchant_auth)
      const { error } = await supabase
        .from('merchants')
        .delete()
        .eq('id', merchantId);

      if (error) throw error;

      toast.success("가게가 성공적으로 삭제되었습니다.");
      onClose();
      
      // Refresh the page to update the merchant list
      window.location.reload();
      
    } catch (err) {
      console.error('Error deleting merchant:', err);
      toast.error("가게 삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>가게 정보를 불러오는 중...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!merchant) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="text-center py-8">
            <p>가게 정보를 찾을 수 없습니다.</p>
            <Button onClick={onClose} className="mt-4">닫기</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            가게 관리
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{merchant.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">사장님 이름</h4>
                  <p className="text-sm">{merchant.owner_name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">연락처</h4>
                  <p className="text-sm">{merchant.phone || "미등록"}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">지역</h4>
                  <Badge variant="secondary">{merchant.region}</Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">장날</h4>
                  <p className="text-sm">{merchant.market_day}일</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">주소</h4>
                <p className="text-sm">{merchant.address || "미등록"}</p>
              </div>
              
              {merchant.description && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">가게 설명</h4>
                  <p className="text-sm">{merchant.description}</p>
                </div>
              )}
              
              {merchant.image_url && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">가게 이미지</h4>
                  <img 
                    src={merchant.image_url} 
                    alt={merchant.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex gap-3">
            <Button 
              onClick={onEdit}
              className="flex-1 flex items-center gap-2"
              variant="outline"
            >
              <Edit className="w-4 h-4" />
              가게 정보 수정
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="flex-1 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  가게 삭제
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>가게를 삭제하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 가게 정보와 관련된 모든 데이터가 영구적으로 삭제됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MerchantManagementModal;