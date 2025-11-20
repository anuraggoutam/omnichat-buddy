import { useState } from "react";
import { ConversationList } from "@/components/conversations/ConversationList";
import { ChatThread } from "@/components/conversations/ChatThread";
import { CustomerProfile } from "@/components/conversations/CustomerProfile";
import { demoConversations } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const Conversations = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const selectedConversation = demoConversations.find(
    (c) => c.id === selectedConversationId
  );

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    // On mobile, selecting a conversation will hide the list via CSS
  };

  const handleBackToList = () => {
    setSelectedConversationId(null);
    setShowProfile(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden">
      {/* Left Panel - Conversation List */}
      <div
        className={cn(
          "w-full md:w-[280px] md:block border-r border-border bg-card flex-shrink-0",
          // Hide on mobile when conversation is selected
          selectedConversationId && "hidden md:block"
        )}
      >
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
      <div
        className={cn(
          "flex-1 md:flex",
          // Show on mobile only when conversation is selected
          !selectedConversationId && "hidden md:flex"
        )}
      >
        {selectedConversation ? (
          <ChatThread
            conversation={selectedConversation}
            onBack={handleBackToList}
            onToggleProfile={() => setShowProfile(!showProfile)}
          />
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>

      {/* Right Panel - Customer Profile */}
      {selectedConversation && (
        <div
          className={cn(
            "w-full md:w-[340px] border-l border-border bg-card flex-shrink-0",
            // On mobile, show as overlay/drawer
            "fixed md:relative inset-0 z-50 md:z-auto",
            "transform transition-transform duration-300 md:transform-none",
            showProfile ? "translate-x-0" : "translate-x-full md:translate-x-0"
          )}
        >
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
