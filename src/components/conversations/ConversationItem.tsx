import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const { customer, lastMessage, timestamp, unread, tags, status } = conversation;

  return (
    <div
      className={cn(
        "p-4 cursor-pointer hover:bg-accent/50 transition-colors",
        isSelected && "bg-accent border-l-4 border-primary",
        unread > 0 && "bg-accent/20"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
          {customer.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className={cn(
              "font-medium truncate",
              unread > 0 && "font-semibold"
            )}>
              {customer.name}
            </h4>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })
                .replace("about ", "")
                .replace(" ago", "")}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <p className={cn(
              "text-sm text-muted-foreground truncate flex-1",
              unread > 0 && "text-foreground font-medium"
            )}>
              {lastMessage}
            </p>
            {status === "resolved" && (
              <CheckCheck className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </div>

          {/* Tags & Unread */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            {unread > 0 && (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {unread}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
