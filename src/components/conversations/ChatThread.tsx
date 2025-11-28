import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreVertical, Tag, UserPlus, MessageSquare, StickyNote, Sparkles, ArrowLeft, Info } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { Composer } from "./Composer";
import { AISuggestion } from "./AISuggestion";
import { InternalNotes } from "./InternalNotes";
import { ChannelBadge } from "./ChannelBadge";
import { demoMessages, internalNotes } from "@/lib/mockData";
import { format } from "date-fns";

interface ChatThreadProps {
  conversation: any;
  onBack?: () => void;
  onToggleProfile?: () => void;
}

export const ChatThread = ({ conversation, onBack, onToggleProfile }: ChatThreadProps) => {
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
    <div className="flex-1 flex flex-col bg-[#e5ddd5] dark:bg-[#0b141a] h-full relative overflow-hidden">
      {/* WhatsApp-like background pattern */}
      <div className="absolute inset-0 whatsapp-bg pointer-events-none z-0" />
      
      {/* Header */}
      <div className="border-b border-border/50 bg-[#f0f2f5] dark:bg-[#202c33] flex-shrink-0 relative z-10">
        <div className="flex items-center justify-between p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {onBack && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack} 
                className="md:hidden flex-shrink-0 h-10 w-10 rounded-full hover:bg-[#e9edef] dark:hover:bg-[#2a3942]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg sm:text-xl flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity border-2 border-white dark:border-[#202c33]"
              onClick={onToggleProfile}
            >
              {conversation.customer.avatar}
            </div>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={onToggleProfile}>
              <h3 className="font-medium truncate text-sm sm:text-base text-[#111b21] dark:text-[#e9edef]">{conversation.customer.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs sm:text-sm text-[#667781] dark:text-[#8696a0] truncate">
                  {conversation.customer.phone}
                </p>
                <ChannelBadge channel={conversation.channel} size="sm" />
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              {conversation.status === "active" && conversation.unread > 0 && (
                <Badge className="bg-[#25d366] text-white border-0 text-xs px-2 py-0.5">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Assist
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="hidden sm:flex h-10 w-10 rounded-full hover:bg-[#e9edef] dark:hover:bg-[#2a3942] text-[#54656f] dark:text-[#8696a0]">
              <Search className="h-5 w-5" />
            </Button>
            {onToggleProfile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onToggleProfile} 
                className="lg:hidden h-10 w-10 rounded-full hover:bg-[#e9edef] dark:hover:bg-[#2a3942] text-[#54656f] dark:text-[#8696a0]"
              >
                <Info className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="hidden md:flex h-10 w-10 rounded-full hover:bg-[#e9edef] dark:hover:bg-[#2a3942] text-[#54656f] dark:text-[#8696a0]">
              <Tag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-[#e9edef] dark:hover:bg-[#2a3942] text-[#54656f] dark:text-[#8696a0]">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat / Notes Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
        {/* Chat/Notes Toggle */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "chat" | "notes")}
          className="flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          <div className="px-2 sm:px-3 flex-shrink-0 border-b border-border/50 bg-[#f0f2f5] dark:bg-[#202c33]">
            <TabsList className="w-full grid grid-cols-2 bg-transparent h-auto p-0 gap-1">
              <TabsTrigger 
                value="chat" 
                className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#25d366] data-[state=active]:text-[#25d366] data-[state=active]:shadow-none text-[#54656f] dark:text-[#8696a0]"
              >
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#25d366] data-[state=active]:text-[#25d366] data-[state=active]:shadow-none text-[#54656f] dark:text-[#8696a0]"
              >
                <StickyNote className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Notes</span>
                <span className="xs:hidden">N</span>
                {notes.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-[10px] sm:text-xs bg-[#25d366] text-white"
                  >
                    {notes.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col mt-0 overflow-hidden relative z-10 min-h-0 chat-thread-container"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* Messages - Scrollable area */}
            <div className="flex-1 min-h-0 overflow-hidden relative chat-messages-container" style={{ flex: '1 1 0%', minHeight: 0 }}>
              <ScrollArea className="h-full w-full chat-scrollbar" style={{ height: '100%' }}>
                <div className="p-2 sm:p-3 lg:p-4 max-w-4xl mx-auto space-y-1 pb-4">
                  {Object.entries(groupedMessages).map(([date, msgs]: [string, any]) => (
                    <div key={date}>
                      {/* Date Separator - WhatsApp style */}
                      <div className="flex items-center justify-center my-4">
                        <div className="bg-[#ffffff] dark:bg-[#182229] px-3 py-1 rounded-full shadow-sm">
                          <span className="text-[11px] sm:text-xs text-[#667781] dark:text-[#8696a0] font-medium">
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
                            new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() > 300000); // 5 minutes
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

            {/* AI Suggestion (if available) - Above composer like WhatsApp */}
            {conversation.status === "active" && conversation.unread > 0 && (
              <div className="flex-shrink-0">
                <AISuggestion />
              </div>
            )}

            {/* Composer - Fixed at bottom */}
            <div className="flex-shrink-0 relative z-20 chat-composer-wrapper">
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
