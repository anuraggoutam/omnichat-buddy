import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConversationItem } from "./ConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  { id: "returns", label: "Return Requests" },
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
  const filteredConversations = conversations.filter((conv) => {
    if (searchQuery && !conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filter === "unread" && conv.unread === 0) return false;
    if (filter === "hot-leads" && !conv.tags.includes("Hot Lead")) return false;
    if (filter === "pending-payment" && !conv.tags.includes("Pending Payment")) return false;
    if (filter === "vip" && !conv.tags.includes("VIP")) return false;
    return true;
  });

  return (
    <div className="w-[280px] border-r border-border bg-card flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Badge
              key={f.id}
              variant={filter === f.id ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent"
              onClick={() => onFilterChange(f.id)}
            >
              {f.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No conversations found — try changing filters.
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
