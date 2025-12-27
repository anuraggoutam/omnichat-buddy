import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";
import { AIPromptBox } from "@/components/ai-assistant/AIPromptBox";
import { AIChatMessage } from "@/components/ai-assistant/AIChatMessage";
import { QuickActions } from "@/components/ai-assistant/QuickActions";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

    // Simulate AI response
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
• Best selling: Premium Kurta Set (23 units)`,
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

**Expected Impact:**
• Reach: ~2,500 customers
• Estimated additional revenue: ₹35,000 - ₹50,000

Should I help you create the WhatsApp broadcast message for this offer?`,
        default: `I understand you want help with "${content}". 

Let me analyze your request. Could you provide more context about:
1. Which channels are you focusing on?
2. What's your primary goal?

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

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* Gradient Background - Only show on welcome state */}
      {!hasMessages && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: 'var(--gradient-hero)',
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'var(--gradient-hero-glow)',
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 relative z-10">
        {!hasMessages ? (
          // Welcome State - Centered like Lovable
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center space-y-6 md:space-y-8">
            {/* Hero Headline */}
            <div className="space-y-3 md:space-y-4 max-w-4xl animate-fade-in">
              <h1 className="text-responsive-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                How can I help you manage sales today?
              </h1>
              <p className="text-responsive-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Your AI assistant for WhatsApp, Instagram & social media sales
              </p>
            </div>

            {/* AI Prompt Box */}
            <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              <AIPromptBox onSend={handleSendMessage} isLoading={isLoading} />
            </div>

            {/* Quick Actions */}
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <QuickActions onActionClick={handleSendMessage} />
            </div>
          </div>
        ) : (
          // Chat Mode
          <>
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="max-w-3xl mx-auto space-y-2 pb-4">
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
