import { Calendar, MapPin } from "lucide-react";

interface StallCardProps {
  id: string;
  name: string;
  ownerName: string;
  isOpen: boolean;
  productTags: string[];
  marketDay: string;
  distance: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const StallCard = ({ 
  id, 
  name, 
  ownerName, 
  isOpen, 
  productTags, 
  marketDay, 
  distance, 
  isSelected, 
  onClick 
}: StallCardProps) => {
  return (
    <div 
      className={`market-card ${isSelected ? 'market-card-selected' : ''}`}
      onClick={() => onClick(id)}
    >
      {/* Top Row - Name and Status */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-card-foreground text-base leading-tight">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            전통시장 상점
          </p>
        </div>
        <div className={`status-indicator ${isOpen ? 'status-open' : 'status-closed'}`}>
          <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-success' : 'bg-gray-400'}`} />
          <span className="text-xs">
            {isOpen ? '현재 영업 중' : '영업 종료'}
          </span>
        </div>
      </div>

      {/* Middle Row - Product Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {productTags.map((tag, index) => (
          <span key={index} className="product-tag">
            #{tag}
          </span>
        ))}
      </div>

      {/* Bottom Row - Details */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{marketDay}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>내 위치에서 {distance}</span>
        </div>
      </div>
    </div>
  );
};

export default StallCard;