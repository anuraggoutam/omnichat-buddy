import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  isLoading?: boolean;
}

export const AIChatMessage = ({
  role,
  content,
  timestamp,
  isLoading = false,
}: AIChatMessageProps) => {
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3",
        isAssistant ? "pr-8" : "justify-end pl-8" // Adjusted padding for better visual balance
      )}
    >
      {isAssistant && (
        <Avatar className="h-8 w-8 shrink-0 border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
          <AvatarFallback>
            <Sparkles className="h-4 w-4 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex flex-col max-w-[70%] rounded-lg p-3 text-sm relative",
          isAssistant
            ? "bg-muted/40 text-foreground rounded-bl-none"
            : "bg-primary text-primary-foreground rounded-br-none"
        )}
      >
        <div
          className={cn(
            "font-medium text-xs mb-1",
            isAssistant ? "text-muted-foreground" : "text-primary-foreground/80"
          )}
        >
          {isAssistant ? "Sales AI" : "You"}
        </div>
        {isLoading ? (
          <div className="flex items-center gap-1 min-h-[20px]"> {/* Ensure consistent height */}
            <span className="w-2 h-2 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-primary-foreground/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        )}
        {timestamp && (
          <span
            className={cn(
              "text-[10px] self-end mt-1",
              isAssistant ? "text-muted-foreground/70" : "text-primary-foreground/70"
            )}
          >
            {timestamp.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
      {!isAssistant && (
        <Avatar className="h-8 w-8 shrink-0 border-2 border-primary/20 bg-primary/20">
          <AvatarFallback>
            <User className="h-4 w-4 text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
