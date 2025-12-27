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
  Loader2, // Import Loader2 for spinner
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden transition-all hover:shadow-xl">
        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="min-h-[56px] max-h-[200px] resize-none border-0 bg-transparent px-5 pt-4 pb-16 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
          rows={1}
        />

        {/* Bottom toolbar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted/80 text-muted-foreground" // Added text-muted-foreground
              aria-label="Add attachments"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full hover:bg-muted/80 gap-1.5 text-muted-foreground"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
              <span className="text-xs hidden sm:inline">Attach</span>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full hover:bg-muted/80 gap-1.5 text-muted-foreground"
              aria-label="Start a new chat"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs hidden sm:inline">Chat</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted/80 text-muted-foreground"
              aria-label="Record voice message"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              disabled={!message.trim() || isLoading}
              onClick={handleSend}
              className={cn(
                "h-9 w-9 rounded-full transition-all duration-200",
                message.trim()
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" // Changed to use primary brand color
                  : "bg-muted text-muted-foreground"
              )}
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
