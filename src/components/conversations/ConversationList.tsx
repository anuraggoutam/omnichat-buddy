import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConversationItem } from "./ConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  { id: "whatsapp", label: "WA", icon: "🟢" },
  { id: "instagram", label: "IG", icon: "🟣" },
  { id: "facebook", label: "FB", icon: "🔵" },
  { id: "email", label: "Email", icon: "✉️" },
  { id: "website", label: "Site", icon: "🌐" },
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
    <div className="w-full h-full flex flex-col bg-background">
      {/* Search */}
      <div className="p-3 border-b border-border/50 bg-muted/30 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 bg-background border-border/50 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border/50 bg-muted/30 flex-shrink-0">
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-3 h-auto hover:bg-muted/50 rounded-none"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters</span>
                {filter !== "all" && (
                  <Badge className="ml-1 text-xs h-5 px-2 bg-primary text-primary-foreground">
                    {filters.find((f) => f.id === filter)?.label || filter}
                  </Badge>
                )}
              </div>
              {filtersOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 pt-0 bg-background">
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <Badge
                  key={f.id}
                  variant={filter === f.id ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all text-xs h-6 px-2.5 gap-1",
                    filter === f.id 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-muted border-border/50"
                  )}
                  onClick={() => onFilterChange(f.id)}
                >
                  {"icon" in f && <span>{f.icon}</span>}
                  {f.label}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1 bg-background">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
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
