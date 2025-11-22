import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreVertical, Tag, UserPlus, MessageSquare, StickyNote, Sparkles } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { Composer } from "./Composer";
import { AISuggestion } from "./AISuggestion";
import { InternalNotes } from "./InternalNotes";
import { ChannelBadge } from "./ChannelBadge";
import { demoMessages, internalNotes } from "@/lib/mockData";
import { format } from "date-fns";

interface ChatThreadProps {
  conversation: any;
}

export const ChatThread = ({ conversation }: ChatThreadProps) => {
  const [activeTab, setActiveTab] = useState<"chat" | "notes">("chat");
  const messages = demoMessages[conversation.id as keyof typeof demoMessages] || [];
  const notes = internalNotes[conversation.id as keyof typeof internalNotes] || [];

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
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
              {conversation.customer.avatar}
            </div>
            <div>
              <h3 className="font-semibold">{conversation.customer.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {conversation.customer.phone}
                </p>
                <ChannelBadge channel={conversation.channel} size="sm" />
              </div>
            </div>
            <Badge variant={conversation.status === "resolved" ? "secondary" : "default"}>
              {conversation.status === "active" ? "Open" : conversation.status}
            </Badge>
            {conversation.status === "active" && conversation.unread > 0 && (
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Assist
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
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

        {/* Chat/Notes Toggle */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "notes")} className="px-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <StickyNote className="h-4 w-4" />
              Internal Notes
              {notes.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {notes.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {activeTab === "chat" ? (
        <>
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

              {/* Typing Indicator */}
              {conversation.unread > 0 && (
                <div className="flex gap-2 animate-fade-in">
                  <div className="max-w-[70%] bg-muted text-foreground rounded-2xl px-4 py-3 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* AI Suggestion (if available) */}
          {conversation.status === "active" && conversation.unread > 0 && (
            <AISuggestion />
          )}

          {/* Composer */}
          <Composer />
        </>
      ) : (
        <InternalNotes notes={notes} />
      )}
    </div>
  );
};
