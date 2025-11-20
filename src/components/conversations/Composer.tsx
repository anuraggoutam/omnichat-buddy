import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Paperclip, Send, ShoppingBag, FileText, CreditCard, Package } from "lucide-react";
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
    <div className="border-t border-border bg-card">
      {/* Quick Actions */}
      <div className="flex items-center gap-2 p-3 border-b border-border">
        <Button variant="outline" size="sm" className="gap-2">
          <ShoppingBag className="h-4 w-4" />
          Add Product
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Template
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Payment Link
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Package className="h-4 w-4" />
          Create Order
        </Button>
      </div>

      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
