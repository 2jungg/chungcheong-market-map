import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRegisterClick: () => void;
}

const Header = ({ onRegisterClick }: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-background border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-foreground">
          충청 시장 커넥트
        </h1>
      </div>
      
      <Button 
        onClick={onRegisterClick}
        className="bg-accent hover:bg-accent-hover text-accent-foreground font-medium px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all duration-200"
        size="lg"
      >
        <Plus className="w-4 h-4" />
        사장님, 내 가게 등록하기
      </Button>
    </header>
  );
};

export default Header;