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
        "flex gap-3 p-4 rounded-xl transition-colors",
        isAssistant ? "bg-muted/30" : ""
      )}
    >
      <Avatar className={cn("h-8 w-8 shrink-0", isAssistant && "bg-primary/10")}>
        {isAssistant ? (
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-muted">
            <User className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">
            {isAssistant ? "Sales AI" : "You"}
          </span>
          {timestamp && (
            <span className="text-xs text-muted-foreground">
              {timestamp.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
        <div className="text-sm text-foreground/90 leading-relaxed">
          {isLoading ? (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
};
