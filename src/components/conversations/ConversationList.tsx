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
      "w-full h-full flex flex-col bg-card",
      !isMobile && "md:w-[320px] lg:w-[280px] border-r border-border"
    )}>
      {/* Search */}
      <div className="p-3 sm:p-4 border-b border-border flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 sm:h-9"
          />
        </div>
      </div>

      {/* Filters - Collapsible on Mobile */}
      <div className="border-b border-border flex-shrink-0">
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between p-3 sm:p-4 h-auto hover:bg-accent/50",
                !filtersOpen && "border-b-0"
              )}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters</span>
                {filter !== "all" && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filters.find((f) => f.id === filter)?.label || filter}
                  </Badge>
                )}
              </div>
              {isMobile && (filtersOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ))}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 sm:p-4 pt-0">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <Badge
                  key={f.id}
                  variant={filter === f.id ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent transition-colors text-xs sm:text-sm"
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
      <ScrollArea className="flex-1 custom-scrollbar">
        {filteredConversations.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-muted-foreground text-sm">
            <p>No conversations found</p>
            <p className="text-xs mt-1">Try changing filters or search query</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
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
