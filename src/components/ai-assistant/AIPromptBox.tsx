import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Paperclip,
  MessageSquare,
  Mic,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIPromptBoxProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const AIPromptBox = ({
  onSend,
  isLoading = false,
  placeholder = "Ask me to help manage your sales, respond to customers, analyze trends...",
}: AIPromptBoxProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="min-h-[60px] max-h-[200px] resize-none border-0 bg-transparent px-4 pt-4 pb-14 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
          rows={1}
        />

        {/* Bottom toolbar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-card/90 to-transparent">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full hover:bg-muted gap-1.5 text-muted-foreground"
            >
              <Paperclip className="h-4 w-4" />
              <span className="text-xs">Attach</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full hover:bg-muted gap-1.5 text-muted-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">Chat</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted text-muted-foreground"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              disabled={!message.trim() || isLoading}
              onClick={handleSend}
              className={cn(
                "h-8 w-8 rounded-full transition-all",
                message.trim()
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
