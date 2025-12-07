import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle, 
  Clock,
  Bot,
  User
} from "lucide-react";

const demoMessages = [
  { role: "customer", content: "Hi! I'm interested in your Pro plan. Can you tell me more?" },
  { role: "ai", content: "Hello! I'd be happy to help. Our Pro plan includes unlimited conversations, AI automation, and priority support. Would you like me to set up a demo?" },
  { role: "customer", content: "Yes, that sounds great!" },
  { role: "ai", content: "Perfect! I've scheduled a demo for you. Check your email for the confirmation. Is there anything else I can help with?" },
];

const quickReplies = [
  "Tell me about pricing",
  "Schedule a demo",
  "Talk to support",
];

export function InteractiveDemo() {
  const [messages, setMessages] = useState(demoMessages.slice(0, 2));
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { role: "customer", content: inputValue }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Thanks for your message! This is a demo - in the real platform, our AI would provide a personalized response based on your query." },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setMessages([...messages, { role: "customer", content: reply }]);
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "Tell me about pricing": "Our plans start at $29/month for Starter, $99/month for Pro, and custom pricing for Enterprise. All plans include a 14-day free trial!",
        "Schedule a demo": "I'd love to schedule a demo for you! In the full platform, I can connect you with our sales team and find a time that works best.",
        "Talk to support": "I'll connect you with our support team right away. For this demo, you can reach us at support@omnichat.com or through the chat on our website.",
      };
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: responses[reply] || "Thanks for your interest! How can I assist you today?" },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Interactive Demo
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            See the AI in <span className="text-primary">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Try our conversational AI right here. Type a message or click a quick reply to see how it works.
          </p>
        </div>

        {/* Chat Demo */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-primary px-4 py-3 flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-primary-foreground">OmniChat AI</p>
                <div className="flex items-center gap-1.5 text-xs text-primary-foreground/70">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Online • Typically replies instantly
                </div>
              </div>
            </div>

            {/* Messages */}
            <CardContent className="p-4 h-[400px] overflow-y-auto bg-muted/20">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${msg.role === "customer" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={msg.role === "customer" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}>
                        {msg.role === "customer" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        msg.role === "customer"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card border border-border rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${msg.role === "customer" ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"}`}>
                        <Clock className="h-3 w-3" />
                        Just now
                        {msg.role === "customer" && <CheckCircle className="h-3 w-3 ml-1" />}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-border/50 bg-card/50">
              <div className="flex gap-2 flex-wrap">
                {quickReplies.map((reply, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-card">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
