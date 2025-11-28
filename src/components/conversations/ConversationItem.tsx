import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChannelBadge } from "./ChannelBadge";
import { LeadSourceBadge } from "./LeadSourceBadge";

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
  const { customer, lastMessage, timestamp, unread, tags, status, channel, leadSource } = conversation;

  return (
    <div
      className={cn(
        "px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-colors border-b border-border/30",
        isSelected 
          ? "bg-[#e9edef] dark:bg-[#2a3942]" 
          : "hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] active:bg-[#e9edef] dark:active:bg-[#2a3942]",
        unread > 0 && !isSelected && "bg-[#f0f2f5] dark:bg-[#1e2a30]"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Avatar - WhatsApp style */}
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xl sm:text-2xl border-2 border-white dark:border-[#111b21]">
          {customer.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h4 className={cn(
              "text-sm sm:text-[15px] font-medium truncate text-[#111b21] dark:text-[#e9edef]",
              unread > 0 && "font-semibold"
            )}>
              {customer.name}
            </h4>
            <span className="text-[11px] sm:text-xs text-[#667781] dark:text-[#8696a0] flex-shrink-0 whitespace-nowrap">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })
                .replace("about ", "")
                .replace(" ago", "")}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              {status === "resolved" && (
                <CheckCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#667781] dark:text-[#8696a0] flex-shrink-0" />
              )}
              <p className={cn(
                "text-sm sm:text-[14px] truncate flex-1",
                unread > 0 
                  ? "text-[#111b21] dark:text-[#e9edef] font-medium" 
                  : "text-[#667781] dark:text-[#8696a0]"
              )}>
                {lastMessage}
              </p>
            </div>
            {unread > 0 && (
              <div className="flex-shrink-0 min-w-[20px] h-5 rounded-full bg-[#25d366] text-white text-[11px] sm:text-xs flex items-center justify-center font-semibold px-1.5">
                {unread > 99 ? "99+" : unread}
              </div>
            )}
          </div>

          {/* Channel & Tags - Compact */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <ChannelBadge channel={channel} size="sm" />
            {tags.slice(0, 1).map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-[10px] sm:text-xs h-4 px-1.5">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
