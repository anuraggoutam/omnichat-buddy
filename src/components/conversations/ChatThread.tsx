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
    <div className="flex-1 flex flex-col bg-background h-full">
      {/* Header */}
      <div className="border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {onBack && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack} 
                className="md:hidden flex-shrink-0 h-9 w-9"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg sm:text-xl flex-shrink-0 cursor-pointer"
              onClick={onToggleProfile}
            >
              {conversation.customer.avatar}
            </div>
            <div className="flex-1 min-w-0 cursor-pointer" onClick={onToggleProfile}>
              <h3 className="font-semibold truncate text-sm sm:text-base">{conversation.customer.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {conversation.customer.phone}
                </p>
                <ChannelBadge channel={conversation.channel} size="sm" />
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <Badge variant={conversation.status === "resolved" ? "secondary" : "default"} className="text-xs">
                {conversation.status === "active" ? "Open" : conversation.status}
              </Badge>
              {conversation.status === "active" && conversation.unread > 0 && (
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Assist
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
            {onToggleProfile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onToggleProfile} 
                className="lg:hidden h-9 w-9"
              >
                <Info className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="hidden md:flex h-9 w-9">
              <Tag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat / Notes Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Chat/Notes Toggle */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "chat" | "notes")}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="px-3 sm:px-4 flex-shrink-0 border-b border-border">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="chat" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="gap-1 sm:gap-2 text-xs sm:text-sm">
                <StickyNote className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Notes</span>
                <span className="xs:hidden">N</span>
                {notes.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-[10px] sm:text-xs"
                  >
                    {notes.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col mt-0 overflow-hidden"
          >
            {/* Messages */}
            <ScrollArea className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-3 sm:p-4 lg:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
                {Object.entries(groupedMessages).map(([date, msgs]: [string, any]) => (
                  <div key={date}>
                    {/* Date Separator */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                        {date}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Messages for this date */}
                    <div className="space-y-3 sm:space-y-4">
                      {msgs.map((msg: any) => (
                        <MessageBubble key={msg.id} message={msg} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Composer */}
            <div className="flex-shrink-0">
              <Composer />
            </div>

            {/* AI Suggestion (if available) */}
            {conversation.status === "active" && conversation.unread > 0 && (
              <div className="flex-shrink-0 border-t border-border">
                <AISuggestion />
              </div>
            )}
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
