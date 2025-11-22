import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Paperclip, Send, ShoppingBag, FileText, CreditCard, Package, Tag, Calendar, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

  return (
    <div className="border-t border-border bg-card flex-shrink-0">
      {/* Quick Actions */}
      <div className="flex items-center gap-2 p-2 sm:p-3 border-b border-border overflow-x-auto scrollbar-hide">
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0 text-xs sm:text-sm">
          <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Add Product</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0 text-xs sm:text-sm">
          <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Template</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0 text-xs sm:text-sm">
          <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Payment</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0 text-xs sm:text-sm">
          <Package className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Order</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0 text-xs sm:text-sm">
          <Gift className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Coupon</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0 text-xs sm:text-sm">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Schedule</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0 text-xs sm:text-sm">
          <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Catalog</span>
        </Button>
      </div>

      {/* Message Input */}
      <div className="p-2 sm:p-4">
        <div className="flex items-end gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
            <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
            <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[40px] sm:min-h-[44px] max-h-32 resize-none text-sm"
            rows={1}
          />
          
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
