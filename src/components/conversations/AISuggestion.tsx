import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ThumbsUp, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

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
  {
    id: 3,
    content: "Yes, we provide delivery service to Rohini. The delivery charge is ₹50 for orders under ₹500. May I help you with your order?",
    tone: "Formal",
  },
];

export const AISuggestion = () => {
  const [selectedId, setSelectedId] = useState(1);

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
    <div className="border-t border-border bg-purple-50/50 dark:bg-purple-950/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
            AI Suggested Replies
          </h4>
          <Badge variant="secondary" className="text-xs">Auto-mode ON</Badge>
        </div>

        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                selectedId === suggestion.id
                  ? "border-purple-500 bg-white dark:bg-purple-950/50"
                  : "border-border"
              }`}
              onClick={() => setSelectedId(suggestion.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.tone}
                    </Badge>
                  </div>
                  <p className="text-sm">{suggestion.content}</p>
                </div>
                {selectedId === suggestion.id && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleEdit}>
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" onClick={handleApprove}>
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Approve & Send
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
