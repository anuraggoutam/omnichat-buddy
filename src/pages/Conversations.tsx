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
  const [showProfile, setShowProfile] = useState(false);

  const selectedConversation = demoConversations.find(
    (c) => c.id === selectedConversationId
  );

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  const handleBack = () => {
    setSelectedConversationId(null);
    setShowProfile(false);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Panel - Conversation List */}
      <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} w-full md:w-auto`}>
        <ConversationList
          conversations={demoConversations}
          selectedId={selectedConversationId}
          onSelect={handleSelectConversation}
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Middle Panel - Chat Thread */}
      {selectedConversation ? (
        <div className={`flex-1 ${!selectedConversation ? 'hidden' : 'flex'}`}>
          <ChatThread 
            conversation={selectedConversation} 
            onBack={handleBack}
            onToggleProfile={() => setShowProfile(!showProfile)}
          />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
          Select a conversation to start chatting
        </div>
      )}

      {/* Right Panel - Customer Profile */}
      {selectedConversation && (
        <div className={`${showProfile ? 'flex' : 'hidden lg:flex'}`}>
          <CustomerProfile 
            customer={selectedConversation.customer}
            onClose={() => setShowProfile(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Conversations;
