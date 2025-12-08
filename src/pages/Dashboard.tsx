import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  MessageSquare,
  TrendingUp,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AIPromptBox } from "@/components/ai-assistant/AIPromptBox";
import { AIChatMessage } from "@/components/ai-assistant/AIChatMessage";
import { QuickActions } from "@/components/ai-assistant/QuickActions";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const welcomeMessage = `Hello! I'm your Sales AI Assistant. I can help you manage your sales across WhatsApp, Instagram, and other social channels.

Here's what I can do for you:
• **Reply to customers** - Draft and send responses to pending messages
• **Analyze trends** - Understand your sales patterns and customer behavior
• **Create campaigns** - Design promotional offers and broadcasts
• **Follow up on leads** - Track and nurture potential customers
• **Generate reports** - Get insights on your business performance

How can I help you today?`;

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        reply: `I found 5 pending customer messages. Here's a quick summary:

1. **Priya Sharma** - Asking about product availability
2. **Rahul Kumar** - Payment confirmation needed
3. **Sneha Patel** - Delivery status inquiry
4. **Amit Singh** - Product recommendation request
5. **Kavya Reddy** - Return/exchange query

Would you like me to draft replies for all of them, or should we handle them one by one?`,
        analyze: `Here's your sales analysis for the last 7 days:

📈 **Revenue**: ₹1,24,500 (+18% vs last week)
📦 **Orders**: 47 orders (+12%)
💬 **Conversations**: 156 customer interactions
⭐ **Conversion Rate**: 32% (excellent!)

**Top Insights:**
• WhatsApp drives 65% of your sales
• Peak hours: 10 AM - 1 PM and 6 PM - 9 PM
• Best selling: Premium Kurta Set (23 units)

**Recommendations:**
1. Consider a flash sale during peak hours
2. Stock up on Premium Kurta Set variants
3. Follow up with 12 abandoned carts from this week`,
        follow: `I found 8 leads that need follow-up:

**High Priority (No response in 5+ days):**
• Ananya Gupta - ₹8,500 cart value
• Vikram Rao - ₹12,000 inquiry

**Medium Priority (3-5 days):**
• Pooja Mehta, Sanjay Verma, Neha Kapoor

Would you like me to draft personalized follow-up messages for each of them?`,
        promotional: `Great idea! Let me help you create a promotional offer.

**Suggested Campaign:**
🎉 "Weekend Special" - 20% off on orders above ₹2,000

**Details:**
• Duration: Friday 6 PM to Sunday midnight
• Eligible products: All categories
• Promo code: WEEKEND20

**Expected Impact:**
• Reach: ~2,500 customers
• Estimated additional revenue: ₹35,000 - ₹50,000

Should I help you create the WhatsApp broadcast message for this offer?`,
        default: `I understand you want help with "${content}". 

Let me analyze your request and provide the best assistance. Could you provide a bit more context about:
1. Which channels are you focusing on? (WhatsApp, Instagram, etc.)
2. What's your primary goal? (Sales, support, marketing)
3. Any specific timeframe or targets?

This will help me give you more actionable recommendations!`,
      };

      let responseKey = "default";
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes("reply") || lowerContent.includes("message")) {
        responseKey = "reply";
      } else if (lowerContent.includes("analyz") || lowerContent.includes("trend") || lowerContent.includes("report")) {
        responseKey = "analyze";
      } else if (lowerContent.includes("follow") || lowerContent.includes("lead")) {
        responseKey = "follow";
      } else if (lowerContent.includes("promotional") || lowerContent.includes("offer") || lowerContent.includes("campaign")) {
        responseKey = "promotional";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponses[responseKey],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const stats = [
    { label: "Pending Messages", value: "12", icon: MessageSquare, color: "text-primary" },
    { label: "Today's Orders", value: "8", icon: ShoppingCart, color: "text-accent" },
    { label: "Revenue Today", value: "₹18.5k", icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Collapsible Stats Bar */}
      <div className="border-b bg-card/50">
        <button
          onClick={() => setShowStats(!showStats)}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <span className="font-medium">Quick Stats</span>
          {showStats ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            showStats ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex items-center justify-center gap-6 px-4 pb-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {messages.length === 1 ? (
          // Welcome State
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                AI-Powered Sales Assistant
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Manage your sales with AI
              </h1>
              <p className="text-muted-foreground text-lg">
                Automate responses, analyze trends, and grow your business across WhatsApp & social media
              </p>
            </div>

            {/* AI Prompt Box */}
            <AIPromptBox onSend={handleSendMessage} isLoading={isLoading} />

            {/* Quick Actions */}
            <QuickActions onActionClick={handleSendMessage} />
          </div>
        ) : (
          // Chat Mode
          <>
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="max-w-3xl mx-auto space-y-2">
                {messages.map((message) => (
                  <AIChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                  />
                ))}
                {isLoading && (
                  <AIChatMessage
                    role="assistant"
                    content=""
                    isLoading={true}
                  />
                )}
              </div>
            </ScrollArea>

            {/* Fixed Prompt Box at Bottom */}
            <div className="border-t bg-background/80 backdrop-blur-sm p-4">
              <AIPromptBox onSend={handleSendMessage} isLoading={isLoading} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
