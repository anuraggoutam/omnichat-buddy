import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreVertical, Tag, MessageSquare, StickyNote, Sparkles, ArrowLeft, Info } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { Composer } from "./Composer";
import { AISuggestion } from "./AISuggestion";
import { InternalNotes } from "./InternalNotes";
import { ChannelBadge } from "./ChannelBadge";
import { demoMessages, internalNotes } from "@/lib/mockData";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatThreadProps {
  conversation: any;
  onBack?: () => void;
  onToggleProfile?: () => void;
}

export const ChatThread = ({ conversation, onBack, onToggleProfile }: ChatThreadProps) => {
  const [activeTab, setActiveTab] = useState<"chat" | "notes">("chat");
  const messages = demoMessages[conversation.id as keyof typeof demoMessages] || [];
  const notes = internalNotes[conversation.id as keyof typeof internalNotes] || [];
  const isMobile = useIsMobile();

  // Group messages by date
  const groupedMessages = messages.reduce((acc: any, msg: any) => {
    const date = format(new Date(msg.timestamp), "MMM dd, yyyy");
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex-1 flex flex-col bg-[#e5ddd5] dark:bg-[#0b141a] h-full relative overflow-hidden">
      {/* WhatsApp-like background pattern */}
      <div className="absolute inset-0 whatsapp-bg pointer-events-none z-0" />
      
      {/* Header */}
      <div className="border-b border-border/50 bg-background flex-shrink-0 relative z-10">
        <div className="flex items-center justify-between p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {onBack && isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack} 
                className="flex-shrink-0 h-9 w-9 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xl flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onToggleProfile}
            >
              {conversation.customer.avatar}
            </div>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={onToggleProfile}>
              <h3 className="font-medium truncate text-sm sm:text-base">{conversation.customer.name}</h3>
              <div className="flex items-center gap-2">
                <ChannelBadge channel={conversation.channel} size="sm" />
              </div>
            </div>
            {/* AI Assist Badge - Desktop */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              {conversation.status === "active" && conversation.unread > 0 && (
                <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Assist
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 rounded-full">
              <Search className="h-4 w-4" />
            </Button>
            {onToggleProfile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onToggleProfile} 
                className="h-9 w-9 rounded-full"
              >
                <Info className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 rounded-full">
              <Tag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat / Notes Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "chat" | "notes")}
          className="flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          <div className="px-3 flex-shrink-0 border-b border-border/50 bg-background">
            <TabsList className="w-full grid grid-cols-2 bg-transparent h-auto p-0 gap-1">
              <TabsTrigger 
                value="chat" 
                className="gap-2 text-sm h-10 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="gap-2 text-sm h-10 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <StickyNote className="h-4 w-4" />
                <span>N</span>
                {notes.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                    {notes.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col mt-0 overflow-hidden relative z-10 min-h-0"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* Messages - Scrollable area */}
            <div className="flex-1 min-h-0 overflow-hidden relative" style={{ flex: '1 1 0%', minHeight: 0 }}>
              <ScrollArea className="h-full w-full" style={{ height: '100%' }}>
                <div className="p-3 sm:p-4 max-w-4xl mx-auto space-y-1 pb-4">
                  {Object.entries(groupedMessages).map(([date, msgs]: [string, any]) => (
                    <div key={date}>
                      {/* Date Separator */}
                      <div className="flex items-center justify-center my-4">
                        <div className="bg-background/90 px-3 py-1 rounded-full shadow-sm">
                          <span className="text-xs text-muted-foreground font-medium">
                            {date}
                          </span>
                        </div>
                      </div>

                      {/* Messages for this date */}
                      <div className="space-y-1">
                        {msgs.map((msg: any, idx: number) => {
                          const prevMsg = idx > 0 ? msgs[idx - 1] : null;
                          const isCustomer = msg.role === "customer";
                          const showAvatar = isCustomer && (!prevMsg || prevMsg.role !== "customer" || 
                            new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() > 300000);
                          return (
                            <MessageBubble key={msg.id} message={msg} showAvatar={showAvatar} />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* AI Suggestion */}
            {conversation.status === "active" && conversation.unread > 0 && (
              <div className="flex-shrink-0">
                <AISuggestion />
              </div>
            )}

            {/* Composer */}
            <div className="flex-shrink-0 relative z-20">
              <Composer />
            </div>
          </TabsContent>

          <TabsContent
            value="notes"
            className="flex-1 mt-0 h-full overflow-hidden"
          >
            <InternalNotes notes={notes} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
