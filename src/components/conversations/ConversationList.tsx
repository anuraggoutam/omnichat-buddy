import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConversationItem } from "./ConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Channel, LeadSource } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ConversationListProps {
  conversations: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "hot-leads", label: "Hot Leads" },
  { id: "pending-payment", label: "Pending Payment" },
  { id: "vip", label: "VIP" },
  { id: "whatsapp", label: "🟢 WA" },
  { id: "instagram", label: "🟣 IG" },
  { id: "facebook", label: "🔵 FB" },
  { id: "email", label: "✉️ Email" },
  { id: "website", label: "💬 Site" },
];

export const ConversationList = ({
  conversations,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: ConversationListProps) => {
  const isMobile = useIsMobile();
  const [filtersOpen, setFiltersOpen] = useState(!isMobile);

  const filteredConversations = conversations.filter((conv) => {
    if (searchQuery && !conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filter === "unread" && conv.unread === 0) return false;
    if (filter === "hot-leads" && !conv.tags.includes("Hot Lead")) return false;
    if (filter === "pending-payment" && !conv.tags.includes("Pending Payment")) return false;
    if (filter === "vip" && !conv.tags.includes("VIP")) return false;
    if (filter === "whatsapp" && conv.channel !== "whatsapp") return false;
    if (filter === "instagram" && conv.channel !== "instagram") return false;
    if (filter === "facebook" && conv.channel !== "facebook") return false;
    if (filter === "email" && conv.channel !== "email") return false;
    if (filter === "website" && conv.channel !== "website") return false;
    return true;
  });

  return (
    <div className={cn(
      "w-full h-full flex flex-col bg-white dark:bg-[#111b21]",
      !isMobile && "md:w-[320px] lg:w-[280px] border-r border-border/50"
    )}>
      {/* Search - WhatsApp style */}
      <div className="p-2 sm:p-3 border-b border-border/50 bg-[#f0f2f5] dark:bg-[#202c33] flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#667781] dark:text-[#8696a0]" />
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 sm:h-10 bg-white dark:bg-[#2a3942] border-0 rounded-lg text-sm text-[#111b21] dark:text-[#e9edef] placeholder:text-[#667781] dark:placeholder:text-[#8696a0] focus-visible:ring-1 focus-visible:ring-[#25d366]"
          />
        </div>
      </div>

      {/* Filters - Collapsible on Mobile */}
      <div className="border-b border-border/50 bg-[#f0f2f5] dark:bg-[#202c33] flex-shrink-0">
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between p-2 sm:p-3 h-auto hover:bg-[#e9edef] dark:hover:bg-[#2a3942] rounded-none",
                !filtersOpen && "border-b-0"
              )}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#54656f] dark:text-[#8696a0]" />
                <span className="text-xs sm:text-sm font-medium text-[#111b21] dark:text-[#e9edef]">Filters</span>
                {filter !== "all" && (
                  <Badge variant="secondary" className="ml-2 text-[10px] sm:text-xs h-4 px-1.5 bg-[#25d366] text-white">
                    {filters.find((f) => f.id === filter)?.label || filter}
                  </Badge>
                )}
              </div>
              {isMobile && (filtersOpen ? (
                <ChevronUp className="h-4 w-4 text-[#54656f] dark:text-[#8696a0]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[#54656f] dark:text-[#8696a0]" />
              ))}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-2 sm:p-3 pt-0 bg-white dark:bg-[#111b21]">
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <Badge
                  key={f.id}
                  variant={filter === f.id ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors text-[10px] sm:text-xs h-5 px-2",
                    filter === f.id 
                      ? "bg-[#25d366] text-white border-0 hover:bg-[#20ba5a]" 
                      : "hover:bg-[#f0f2f5] dark:hover:bg-[#202c33]"
                  )}
                  onClick={() => onFilterChange(f.id)}
                >
                  {f.label}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1 custom-scrollbar bg-white dark:bg-[#111b21]">
        {filteredConversations.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-[#667781] dark:text-[#8696a0] text-sm">
            <div className="mb-3 text-4xl opacity-30">💬</div>
            <p className="font-medium">No conversations found</p>
            <p className="text-xs mt-1">Try changing filters or search query</p>
          </div>
        ) : (
          <div>
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedId === conversation.id}
                onClick={() => onSelect(conversation.id)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
