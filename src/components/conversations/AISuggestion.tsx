import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ThumbsUp, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const suggestions = [
  {
    id: 1,
    content: "Yes, we deliver to Rohini! Our delivery charge is ₹50 for orders below ₹500. Would you like to place an order?",
    tone: "Friendly",
  },
  {
    id: 2,
    content: "Absolutely! We cover Rohini area. Delivery fee is ₹50 (free above ₹500). What would you like to order? 🧁",
    tone: "Casual",
  },
];

export const AISuggestion = () => {
  const [selectedId, setSelectedId] = useState(1);
  const isMobile = useIsMobile();

  const handleApprove = () => {
    toast({
      title: "Message sent",
      description: "AI suggestion approved and sent to customer",
    });
  };

  const handleEdit = () => {
    toast({
      title: "Edit mode",
      description: "Message added to composer for editing",
    });
  };

  return (
    <div className="border-t border-border/50 bg-gradient-to-b from-purple-50/80 to-purple-50/50 dark:from-purple-950/40 dark:to-purple-950/20 p-3 flex-shrink-0 relative z-10 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_8px_rgba(0,0,0,0.2)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
              AI Suggested Replies
            </h4>
          </div>
          <Badge variant="secondary" className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
            Auto-mode ON
          </Badge>
        </div>

        <div className="space-y-2 max-h-[180px] overflow-y-auto">
          {suggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className={`p-3 cursor-pointer transition-all ${
                selectedId === suggestion.id
                  ? "border-2 border-purple-500 bg-background shadow-md"
                  : "border border-border/50 bg-background/80"
              }`}
              onClick={() => setSelectedId(suggestion.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <Badge variant="outline" className="text-xs px-1.5 py-0 mb-1.5">
                    {suggestion.tone}
                  </Badge>
                  <p className="text-sm leading-relaxed">
                    {suggestion.content}
                  </p>
                </div>
                {selectedId === suggestion.id && (
                  <div className="flex gap-2 flex-shrink-0 self-end sm:self-start">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                      }}
                      className="h-8 text-xs px-3"
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove();
                      }}
                      className="h-8 text-xs px-3 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {isMobile ? "Send" : "Approve & Send"}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
