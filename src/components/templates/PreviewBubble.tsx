import { Badge } from "@/components/ui/badge";

interface PreviewBubbleProps {
  content: string;
  channel: string;
  variables: string[];
}

export function PreviewBubble({ content, channel, variables }: PreviewBubbleProps) {
  // Replace variables with sample data for preview
  const sampleData: Record<string, string> = {
    customer_name: "Priya Sharma",
    order_id: "ORD-2401-1234",
    amount: "850",
    agent_name: "Aman Gupta",
    tracking_link: "track.bakerybliss.in/abc123",
    payment_link: "pay.bakerybliss.in/xyz789",
    delivery_time: "Today, 6:00 PM",
    partner_name: "Delivery Partner",
    partner_phone: "+91 98765 43210",
    quantity: "50",
    feedback_link: "feedback.bakerybliss.in/rate",
    cart_items: "• Chocolate Truffle Cake\n• Red Velvet Cupcakes",
    cart_total: "1,330",
    checkout_link: "bakerybliss.in/checkout",
    product_name: "Black Forest Cake",
  };

  let previewContent = content;
  variables.forEach((variable) => {
    const regex = new RegExp(`\\{\\{${variable}\\}\\}`, "g");
    previewContent = previewContent.replace(
      regex,
      sampleData[variable] || `[${variable}]`
    );
  });

  const channelStyles: Record<string, { bg: string; textColor: string; name: string }> = {
    WhatsApp: {
      bg: "bg-[hsl(var(--whatsapp))]",
      textColor: "text-white",
      name: "WhatsApp",
    },
    Instagram: {
      bg: "bg-gradient-to-br from-purple-500 to-pink-500",
      textColor: "text-white",
      name: "Instagram",
    },
    Facebook: {
      bg: "bg-[hsl(var(--channel-facebook))]",
      textColor: "text-white",
      name: "Facebook Messenger",
    },
    "Unified Chat": {
      bg: "bg-accent",
      textColor: "text-accent-foreground",
      name: "Unified Chat",
    },
  };

  const style = channelStyles[channel] || channelStyles["Unified Chat"];

  if (!content.trim()) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Start typing to see a live preview...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="gap-1">
          {style.name}
        </Badge>
        <span className="text-xs text-muted-foreground">Preview</span>
      </div>

      <div className="flex justify-start">
        <div className={`${style.bg} ${style.textColor} p-4 rounded-lg max-w-sm shadow-md`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {previewContent}
          </div>
          <div className="text-xs opacity-75 mt-3 text-right">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            ✓✓
          </div>
        </div>
      </div>

      {variables.length > 0 && (
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
          <div className="font-medium text-foreground">Sample Data Used:</div>
          {variables.map((variable) => (
            <div key={variable} className="flex items-center gap-2">
              <code className="bg-background px-1.5 py-0.5 rounded text-accent">
                {"{"}
                {"{"}
                {variable}
                {"}}"}
              </code>
              <span>→</span>
              <span>{sampleData[variable] || `[${variable}]`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
