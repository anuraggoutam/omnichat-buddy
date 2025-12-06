import { useState, useEffect } from "react";
import { ConversationList } from "@/components/conversations/ConversationList";
import { ChatThread } from "@/components/conversations/ChatThread";
import { CustomerProfile } from "@/components/conversations/CustomerProfile";
import { demoConversations } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "chat" | "profile";

const Conversations = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    demoConversations[0]?.id || null
  );
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [mobileView, setMobileView] = useState<ViewMode>("list");
  const isMobile = useIsMobile();

  const selectedConversation = demoConversations.find(
    (c) => c.id === selectedConversationId
  );

  // Reset mobile view when conversation changes
  useEffect(() => {
    if (isMobile && selectedConversationId) {
      setMobileView("chat");
    } else if (isMobile && !selectedConversationId) {
      setMobileView("list");
    }
  }, [selectedConversationId, isMobile]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    if (isMobile) {
      setMobileView("chat");
    }
  };

  const handleBack = () => {
    if (isMobile) {
      if (mobileView === "profile") {
        setMobileView("chat");
        setShowProfile(false);
      } else if (mobileView === "chat") {
        setSelectedConversationId(null);
        setMobileView("list");
        setShowProfile(false);
      }
    } else {
      setShowProfile(false);
    }
  };

  const handleToggleProfile = () => {
    if (isMobile) {
      setMobileView("profile");
      setShowProfile(true);
    } else {
      setShowProfile(!showProfile);
    }
  };

  // Mobile: Single panel navigation with slide transitions
  if (isMobile) {
    return (
      <div className="flex h-full bg-background overflow-hidden relative" style={{ height: 'calc(100vh - 56px)', maxHeight: 'calc(100vh - 56px)' }}>
        {/* Conversation List - Mobile */}
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-300 ease-out z-10 bg-background",
            mobileView === "list" ? "translate-x-0" : "-translate-x-full"
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

        {/* Chat Thread - Mobile */}
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-300 ease-out z-20 bg-[#e5ddd5] dark:bg-[#0b141a]",
            mobileView === "chat" || mobileView === "profile" ? "translate-x-0" : "translate-x-full"
          )}
        >
          {selectedConversation ? (
            <ChatThread
              conversation={selectedConversation}
              onBack={handleBack}
              onToggleProfile={handleToggleProfile}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground p-4 h-full">
              <div className="text-center">
                <p className="text-sm">Select a conversation</p>
              </div>
            </div>
          )}
        </div>

        {/* Customer Profile - Mobile Overlay */}
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-300 ease-out z-30 bg-background",
            mobileView === "profile" ? "translate-x-0" : "translate-x-full"
          )}
        >
          {selectedConversation && (
            <CustomerProfile
              customer={selectedConversation.customer}
              onClose={handleBack}
            />
          )}
        </div>
      </div>
    );
  }

  // Desktop/Tablet: Multi-panel layout
  return (
    <div className="flex h-full bg-[#e5ddd5] dark:bg-[#0b141a] overflow-hidden" style={{ height: 'calc(100vh - 56px)', maxHeight: 'calc(100vh - 56px)' }}>
      {/* Left Panel - Conversation List */}
      <div className={cn(
        "flex-shrink-0 border-r border-border/50 bg-background transition-all duration-300",
        selectedConversation ? "w-[320px] lg:w-[360px]" : "w-full max-w-[400px]"
      )}>
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
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#e5ddd5] dark:bg-[#0b141a] h-full">
          <ChatThread
            conversation={selectedConversation}
            onToggleProfile={handleToggleProfile}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground bg-[#e5ddd5] dark:bg-[#0b141a]">
          <div className="text-center">
            <div className="mb-4 text-6xl opacity-20">💬</div>
            <p className="text-sm font-medium">Select a conversation to start chatting</p>
          </div>
        </div>
      )}

      {/* Right Panel - Customer Profile */}
      {selectedConversation && showProfile && (
        <div className="hidden md:flex w-[320px] lg:w-[360px] border-l border-border/50 flex-shrink-0 bg-background animate-in slide-in-from-right duration-300">
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
