import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChannelBadge } from "./ChannelBadge";

interface ConversationItemProps {
  conversation: any;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem = ({
  conversation,
  isSelected,
  onClick,
}: ConversationItemProps) => {
  const { customer, lastMessage, timestamp, unread, tags, status, channel } = conversation;

  return (
    <div
      className={cn(
        "px-3 py-3 cursor-pointer transition-colors border-b border-border/30",
        isSelected 
          ? "bg-primary/10" 
          : "hover:bg-muted/50 active:bg-muted",
        unread > 0 && !isSelected && "bg-muted/30"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xl">
          {customer.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4 className={cn(
              "text-sm font-medium truncate",
              unread > 0 && "font-semibold"
            )}>
              {customer.name}
            </h4>
            <span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })
                .replace("about ", "")
                .replace(" ago", "")}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              {status === "resolved" && (
                <CheckCheck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <p className={cn(
                "text-sm truncate flex-1",
                unread > 0 ? "font-medium" : "text-muted-foreground"
              )}>
                {lastMessage}
              </p>
            </div>
            {unread > 0 && (
              <div className="flex-shrink-0 min-w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold px-1.5">
                {unread > 99 ? "99+" : unread}
              </div>
            )}
          </div>

          {/* Channel & Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <ChannelBadge channel={channel} size="sm" />
            {tags.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs h-5 px-1.5">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
