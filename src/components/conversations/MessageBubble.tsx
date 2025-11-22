import { format } from "date-fns";
import { Check, CheckCheck, Zap, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceMessage } from "./VoiceMessage";

interface MessageBubbleProps {
  message: any;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
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
        "flex gap-2 animate-fade-in",
        !isCustomer && "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm transition-smooth",
          isCustomer
            ? "bg-muted text-foreground rounded-tl-none"
            : isAI
            ? "bg-purple-50 dark:bg-purple-950/30 text-foreground border border-purple-200 dark:border-purple-800 rounded-tr-none"
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        {isAI && (
          <div className="flex items-center gap-1 mb-1 text-purple-600 dark:text-purple-400">
            <Zap className="h-3 w-3" />
            <span className="text-xs font-medium">AI Assistant</span>
          </div>
        )}
        
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-70">
            {format(new Date(message.timestamp), "HH:mm")}
          </span>
          {!isCustomer && (
            <span className="ml-1">
              {message.status === "read" ? (
                <CheckCheck className="h-3 w-3 text-blue-500" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="h-3 w-3 opacity-70" />
              ) : (
                <Check className="h-3 w-3 opacity-70" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
