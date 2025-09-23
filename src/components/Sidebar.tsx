import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StallCard from "./StallCard";

interface Stall {
  id: string;
  name: string;
  ownerName: string;
  isOpen: boolean;
  productTags: string[];
  marketDay: string;
  distance: string;
}

interface SidebarProps {
  selectedStallId: string | null;
  onStallSelect: (id: string) => void;
}

const mockStalls: Stall[] = [
  {
    id: "1",
    name: "햇살농산물",
    ownerName: "박 할머니네",
    isOpen: true,
    productTags: ["공주알밤", "유기농고구마", "햇자두", "청양고추"],
    marketDay: "오늘 장날 (매월 1일, 6일)",
    distance: "230m"
  },
  {
    id: "2", 
    name: "산골야채마을",
    ownerName: "김씨네",
    isOpen: true,
    productTags: ["무농약배추", "대파", "시금치", "상추"],
    marketDay: "오늘 장날 (매월 1일, 6일)",
    distance: "450m"
  },
  {
    id: "3",
    name: "바다생선가게",
    ownerName: "이 아저씨",
    isOpen: false,
    productTags: ["고등어", "갈치", "오징어", "새우젓"],
    marketDay: "내일 장날 (매월 2일, 7일)", 
    distance: "680m"
  },
  {
    id: "4",
    name: "전통떡집",
    ownerName: "조 사모님",
    isOpen: true,
    productTags: ["인절미", "송편", "백설기", "개피떡"],
    marketDay: "오늘 장날 (매월 1일, 6일)",
    distance: "120m"
  },
  {
    id: "5",
    name: "계절과일상회",
    ownerName: "최 형님",
    isOpen: true,
    productTags: ["사과", "배", "감", "곶감"],
    marketDay: "오늘 장날 (매월 1일, 6일)",
    distance: "340m"
  }
];

const Sidebar = ({ selectedStallId, onStallSelect }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = [
    { id: "open", label: "영업 중" },
    { id: "nearby", label: "내 주변" },
    { id: "favorites", label: "단골 상점" }
  ];

  return (
    <div className="w-full h-full bg-background border-r border-border flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          충청 시장 커넥트
        </h1>
        <p className="text-muted-foreground text-sm">
          실시간으로 확인하는 우리 동네 5일장
        </p>
      </div>

      {/* Search Section */}
      <div className="p-6 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="시장, 상점, 또는 품목으로 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-lg border-input focus:ring-ring focus:border-ring"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant="ghost"
              size="sm"
              className={`filter-button ${
                activeFilter === filter.id ? 'filter-button-active' : 'filter-button-inactive'
              }`}
              onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Scrollable Stall List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {mockStalls.map((stall) => (
          <StallCard
            key={stall.id}
            id={stall.id}
            name={stall.name}
            ownerName={stall.ownerName}
            isOpen={stall.isOpen}
            productTags={stall.productTags}
            marketDay={stall.marketDay}
            distance={stall.distance}
            isSelected={selectedStallId === stall.id}
            onClick={onStallSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;