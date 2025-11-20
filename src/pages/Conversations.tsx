import { useState } from "react";
import { ConversationList } from "@/components/conversations/ConversationList";
import { ChatThread } from "@/components/conversations/ChatThread";
import { CustomerProfile } from "@/components/conversations/CustomerProfile";
import { demoConversations } from "@/lib/mockData";

const Conversations = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    demoConversations[0]?.id || null
  );
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedConversation = demoConversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Conversation List */}
      <ConversationList
        conversations={demoConversations}
        selectedId={selectedConversationId}
        onSelect={setSelectedConversationId}
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Middle Panel - Chat Thread */}
      {selectedConversation ? (
        <ChatThread conversation={selectedConversation} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a conversation to start chatting
        </div>
      )}

      {/* Right Panel - Customer Profile */}
      {selectedConversation && (
        <CustomerProfile customer={selectedConversation.customer} />
      )}
    </div>
  );
};

export default Conversations;
