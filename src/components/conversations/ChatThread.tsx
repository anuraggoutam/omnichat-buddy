import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, Tag, UserPlus, ArrowLeft, User } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { Composer } from "./Composer";
import { AISuggestion } from "./AISuggestion";
import { demoMessages } from "@/lib/mockData";
import { format } from "date-fns";

interface ChatThreadProps {
  conversation: any;
  onBack?: () => void;
  onToggleProfile?: () => void;
}

export const ChatThread = ({ conversation, onBack, onToggleProfile }: ChatThreadProps) => {
  const messages = demoMessages[conversation.id as keyof typeof demoMessages] || [];

  // Group messages by date
  const groupedMessages = messages.reduce((acc: any, msg: any) => {
    const date = format(new Date(msg.timestamp), "MMM dd, yyyy");
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back button for mobile */}
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="md:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
              {conversation.customer.avatar}
            </div>
            <div>
              <h3 className="font-semibold">{conversation.customer.name}</h3>
              <p className="text-sm text-muted-foreground">
                {conversation.customer.phone}
              </p>
            </div>
            <Badge variant={conversation.status === "resolved" ? "secondary" : "default"}>
              {conversation.status === "active" ? "Open" : conversation.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Profile toggle for mobile */}
            {onToggleProfile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleProfile}
                className="md:hidden"
              >
                <User className="h-4 w-4" />
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Tag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {Object.entries(groupedMessages).map(([date, msgs]: [string, any]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {date}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Messages for this date */}
              <div className="space-y-4">
                {msgs.map((msg: any) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* AI Suggestion (if available) */}
      {conversation.status === "active" && conversation.unread > 0 && (
        <AISuggestion />
      )}

      {/* Composer */}
      <Composer />
    </div>
  );
};
