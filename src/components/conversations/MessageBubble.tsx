import { format } from "date-fns";
import { Check, CheckCheck, Zap, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceMessage } from "./VoiceMessage";

interface MessageBubbleProps {
  message: any;
  showAvatar?: boolean;
}

export const MessageBubble = ({ message, showAvatar = false }: MessageBubbleProps) => {
  const isCustomer = message.role === "customer";
  const isAI = message.role === "assistant";
  const isSystem = message.role === "system";

  // Handle voice messages
  if (message.type === "voice") {
    return (
      <div className={cn("flex gap-2 animate-fade-in", !isCustomer && "justify-end")}>
        <VoiceMessage duration={message.metadata?.duration || 0} isCustomer={isCustomer} />
      </div>
    );
  }

  // Handle system messages
  if (isSystem) {
    return (
      <div className="flex justify-center animate-fade-in">
        <div className="flex items-center gap-2 bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm border border-border">
          <ShoppingCart className="h-3 w-3" />
          <span>{message.content}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-1 sm:gap-2 items-end animate-fade-in px-1 sm:px-2",
        !isCustomer && "justify-end",
        isCustomer && "justify-start"
      )}
    >
      {/* Avatar for customer messages */}
      {isCustomer && (
        <div className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xs sm:text-sm flex-shrink-0 mb-1",
          !showAvatar && "invisible"
        )}>
          {showAvatar && "👤"}
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] sm:max-w-[65%] lg:max-w-[60%] rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] transition-all",
          isCustomer
            ? "bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-sm"
            : isAI
            ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-sm border border-[#b3d9b0] dark:border-[#005c4b]/50"
            : "bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-sm"
        )}
      >
        {isAI && (
          <div className="flex items-center gap-1 mb-1 text-[#25d366] dark:text-[#53bdeb]">
            <Zap className="h-3 w-3" />
            <span className="text-[10px] sm:text-xs font-medium">AI Assistant</span>
          </div>
        )}
        
        <p className="text-sm sm:text-[15px] whitespace-pre-wrap break-words leading-relaxed text-[#111b21] dark:text-[#e9edef]">
          {message.content}
        </p>
        
        <div className="flex items-center justify-end gap-1 mt-0.5 sm:mt-1">
          <span className="text-[11px] sm:text-xs text-[#667781] dark:text-[#8696a0]">
            {format(new Date(message.timestamp), "HH:mm")}
          </span>
          {!isCustomer && (
            <span className="ml-0.5 flex items-center">
              {message.status === "read" ? (
                <CheckCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#53bdeb]" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#667781] dark:text-[#8696a0]" />
              ) : (
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#667781] dark:text-[#8696a0]" />
              )}
            </span>
          )}
        </div>
      </div>

      {/* Spacer for alignment */}
      {!isCustomer && <div className="w-6 sm:w-7 flex-shrink-0" />}
    </div>
  );
};
