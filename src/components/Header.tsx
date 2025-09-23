import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/chungcheong-connect-logo.png";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onRegisterClick: () => void;
}

const Header = ({ onRegisterClick }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="w-full h-16 bg-background border-b border-border px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src={logoIcon} 
          alt="충청 커넥트 로고" 
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
        <h1 className="text-lg sm:text-2xl font-bold text-foreground">
          충청 시장 커넥트
        </h1>
      </div>
      
      <Button 
        onClick={onRegisterClick}
        className="bg-accent hover:bg-accent-hover text-accent-foreground font-medium px-3 sm:px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all duration-200"
        size={isMobile ? "sm" : "lg"}
      >
        <Plus className="w-4 h-4" />
        {isMobile ? "가게등록" : "사장님, 내 가게 등록하기"}
      </Button>
    </header>
  );
};

export default Header;