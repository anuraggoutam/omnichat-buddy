import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Paperclip, Send, ShoppingBag, FileText, CreditCard, Package, Tag, Calendar, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export const Composer = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been delivered",
    });
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="border-t border-border/50 bg-[#f0f2f5] dark:bg-[#202c33] flex-shrink-0 relative z-20 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_8px_rgba(0,0,0,0.2)]">
      {/* Quick Actions - Hidden on mobile, shown on desktop */}
      <div className="hidden md:flex items-center gap-1.5 p-2 border-b border-border/50 overflow-x-auto scrollbar-hide">
        <Button variant="ghost" size="sm" className="gap-1.5 flex-shrink-0 text-xs h-7 px-2 hover:bg-[#e9edef] dark:hover:bg-[#2a3942]">
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Product</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 flex-shrink-0 text-xs h-7 px-2 hover:bg-[#e9edef] dark:hover:bg-[#2a3942]">
          <FileText className="h-3.5 w-3.5" />
          <span>Template</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 flex-shrink-0 text-xs h-7 px-2 hover:bg-[#e9edef] dark:hover:bg-[#2a3942]">
          <CreditCard className="h-3.5 w-3.5" />
          <span>Payment</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 flex-shrink-0 text-xs h-7 px-2 hover:bg-[#e9edef] dark:hover:bg-[#2a3942]">
          <Package className="h-3.5 w-3.5" />
          <span>Order</span>
        </Button>
      </div>

      {/* Message Input - WhatsApp style */}
      <div className="p-2 sm:p-3">
        <div className="flex items-end gap-1 sm:gap-2 bg-white dark:bg-[#2a3942] rounded-2xl sm:rounded-3xl px-2 sm:px-3 py-1.5 sm:py-2 border border-border/30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-transparent text-[#54656f] dark:text-[#8696a0]"
          >
            <Smile className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          
          <Textarea
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "min-h-[36px] sm:min-h-[44px] max-h-32 resize-none text-sm sm:text-[15px] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-1 sm:px-2 py-2 text-[#111b21] dark:text-[#e9edef] placeholder:text-[#667781] dark:placeholder:text-[#8696a0]",
              isFocused && "outline-none"
            )}
            rows={1}
          />
          
          {message.trim() ? (
            <Button
              size="icon"
              onClick={handleSend}
              className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-transparent text-[#54656f] dark:text-[#8696a0]"
              >
                <Paperclip className="h-5 w-5 sm:h-6 sm:w-6 rotate-45" />
              </Button>
              <Button
                size="icon"
                onClick={handleSend}
                disabled
                className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-transparent text-[#54656f] dark:text-[#8696a0] opacity-50"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
