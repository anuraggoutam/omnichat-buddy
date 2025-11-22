import { useState } from "react";
import { Search, UserPlus, Tag, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { teamMembers, teamInboxConversations, demoCustomers } from "@/lib/mockData";
import { ChannelBadge } from "@/components/conversations/ChannelBadge";
import { MessageBubble } from "@/components/conversations/MessageBubble";
import { Composer } from "@/components/conversations/Composer";
import { InternalNotes } from "@/components/conversations/InternalNotes";
import { ActivityTimeline } from "@/components/conversations/ActivityTimeline";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unread" | "assigned-to-me" | "unassigned" | "high-priority" | "completed";
type Channel = "all" | "whatsapp" | "instagram" | "facebook" | "website" | "email";

const TeamInbox = () => {
  const [selectedConversation, setSelectedConversation] = useState(teamInboxConversations[0]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [channelFilter, setChannelFilter] = useState<Channel>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "notes" | "activity">("chat");

  // Filter conversations
  const filteredConversations = teamInboxConversations.filter((conv) => {
    // Search filter
    if (searchQuery && !conv.customerName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status filters
    if (filter === "unread" && conv.unread === 0) return false;
    if (filter === "assigned-to-me" && conv.assignedTo !== "Aman Gupta") return false;
    if (filter === "unassigned" && conv.assignedTo !== "Unassigned") return false;
    if (filter === "high-priority" && conv.priority !== "High") return false;
    if (filter === "completed" && conv.status !== "resolved") return false;

    // Channel filter
    if (channelFilter !== "all" && conv.platform !== channelFilter) return false;

    return true;
  });

  const customer = demoCustomers.find((c) => c.id === selectedConversation?.customerId);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Online"
      ? "bg-green-500"
      : status === "Away"
      ? "bg-yellow-500"
      : "bg-gray-400";
  };

  return (
    <div className="flex h-full bg-background">
      {/* Left Panel - Filters & Team */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Team Inbox</h2>
          
          {/* Filters */}
          <div className="space-y-1">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              All Conversations
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                filter === "unread"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              Unread
              <Badge variant="secondary" className="ml-2">
                {teamInboxConversations.filter((c) => c.unread > 0).length}
              </Badge>
            </button>
            <button
              onClick={() => setFilter("assigned-to-me")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filter === "assigned-to-me"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              Assigned to me
            </button>
            <button
              onClick={() => setFilter("unassigned")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filter === "unassigned"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              Unassigned
            </button>
            <button
              onClick={() => setFilter("high-priority")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filter === "high-priority"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              High Priority
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filter === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Channels */}
        <div className="p-4 border-b border-border">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
            Channels
          </h3>
          <div className="space-y-1">
            {["all", "whatsapp", "instagram", "facebook", "website", "email"].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch as Channel)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                  channelFilter === ch
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground"
                )}
              >
                {ch === "all" ? "All Channels" : ch}
              </button>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="p-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
            Team Members
          </h3>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-sm">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card",
                      getStatusColor(member.status)
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Panel - Conversation List */}
      <div className="w-96 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={cn(
                "p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50",
                selectedConversation?.id === conversation.id && "bg-muted"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-xl">
                      {conversation.customerAvatar}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.unread > 0 && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                      {conversation.unread}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {conversation.customerName}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {formatDistanceToNow(new Date(conversation.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <ChannelBadge channel={conversation.platform} size="sm" />
                    {conversation.priority === "High" && (
                      <AlertCircle className="h-3 w-3 text-red-500" />
                    )}
                    {conversation.status === "resolved" && (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {conversation.lastMessage}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {conversation.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {conversation.assignedTo !== "Unassigned" && (
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                        {conversation.assignedTo.split(" ")[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right Panel - Chat View */}
      {selectedConversation && (
        <div className="flex-1 flex flex-col bg-background">
          {/* Header */}
          <div className="border-b border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-lg">
                    {selectedConversation.customerAvatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedConversation.customerName}
                  </h2>
                  <div className="flex items-center gap-2">
                    <ChannelBadge channel={selectedConversation.platform} size="sm" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select defaultValue={selectedConversation.assignedTo}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select defaultValue={selectedConversation.priority}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low Priority</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High Priority</SelectItem>
                  </SelectContent>
                </Select>

                {selectedConversation.status === "resolved" ? (
                  <Button variant="outline" size="sm">
                    Reopen
                  </Button>
                ) : (
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Resolved
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedConversation.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              <Button variant="ghost" size="sm">
                <Tag className="h-3 w-3 mr-1" />
                Add Tag
              </Button>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
                <TabsList className="mx-4 mt-4 w-fit">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="notes">Internal Notes</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="border-t border-border p-4">
                    <Composer />
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="flex-1 mt-0">
                  <InternalNotes notes={selectedConversation.internalNotes.map(n => ({
                    id: n.id,
                    author: n.agent,
                    authorAvatar: "👤",
                    content: n.note,
                    timestamp: n.timestamp,
                    mentions: []
                  }))} />
                </TabsContent>

                <TabsContent value="activity" className="flex-1 mt-0">
                  <ActivityTimeline activities={selectedConversation.activities.map(a => ({
                    id: a.id,
                    type: a.type,
                    content: a.type === "assigned" 
                      ? `Assigned to ${a.agent}` 
                      : a.type === "priority"
                      ? `Priority changed to ${a.value}`
                      : a.type === "tag"
                      ? `Tag added: ${a.value}`
                      : a.type === "resolved"
                      ? "Conversation resolved"
                      : a.type,
                    timestamp: a.timestamp,
                    icon: a.type === "assigned" ? "👤" : a.type === "priority" ? "⚡" : a.type === "tag" ? "🏷️" : a.type === "resolved" ? "✅" : "📌"
                  }))} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Customer Info Panel */}
            <div className="w-80 border-l border-border bg-card">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Customer Info
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium text-foreground">
                          {selectedConversation.customerName}
                        </span>
                      </div>
                      {customer && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone:</span>
                            <span className="font-medium text-foreground">
                              {customer.phone}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Source:</span>
                            <ChannelBadge channel={customer.source} size="sm" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  {customer && (
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">
                        Lifetime Metrics
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
                          <p className="text-xl font-bold text-foreground">
                            {customer.totalOrders}
                          </p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Total Chats</p>
                          <p className="text-xl font-bold text-foreground">
                            {customer.totalChats}
                          </p>
                        </div>
                        <div className="bg-muted rounded-lg p-3 col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">
                            Lifetime Value
                          </p>
                          <p className="text-xl font-bold text-foreground">
                            ₹{customer.lifetimeValue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        View Full Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        View Order History
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamInbox;
