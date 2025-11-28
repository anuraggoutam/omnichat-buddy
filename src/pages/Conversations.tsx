import { useState, useEffect } from "react";
import { ConversationList } from "@/components/conversations/ConversationList";
import { ChatThread } from "@/components/conversations/ChatThread";
import { CustomerProfile } from "@/components/conversations/CustomerProfile";
import { demoConversations } from "@/lib/mockData";
import { useIsMobile, useBreakpoint } from "@/hooks/use-mobile";
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
  const breakpoint = useBreakpoint();

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
      setSelectedConversationId(null);
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

  // Mobile: Single panel navigation with smooth transitions
  if (isMobile) {
    return (
      <div className="flex h-screen bg-[#e5ddd5] dark:bg-[#0b141a] overflow-hidden relative">
        {/* Conversation List - Mobile */}
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-300 ease-in-out z-10",
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
            "absolute inset-0 transition-transform duration-300 ease-in-out z-20",
            mobileView === "chat" ? "translate-x-0" : "translate-x-full"
          )}
        >
          {selectedConversation ? (
            <ChatThread
              conversation={selectedConversation}
              onBack={handleBack}
              onToggleProfile={handleToggleProfile}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground p-4 bg-[#e5ddd5] dark:bg-[#0b141a]">
              <div className="text-center">
                <p className="text-sm">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>

        {/* Customer Profile - Mobile */}
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-300 ease-in-out z-30",
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

  // Tablet: Two panels (list + chat, profile as drawer)
  if (breakpoint === "tablet") {
    return (
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Left Panel - Conversation List */}
        <div className={cn(
          "flex-shrink-0",
          selectedConversation ? "w-[320px]" : "w-full"
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
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <ChatThread
              conversation={selectedConversation}
              onBack={handleBack}
              onToggleProfile={handleToggleProfile}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">Select a conversation to start chatting</p>
            </div>
          </div>
        )}

        {/* Right Panel - Customer Profile (Drawer on Tablet) */}
        {selectedConversation && showProfile && (
          <div className="absolute right-0 top-0 bottom-0 w-[360px] z-50 animate-slide-left">
            <CustomerProfile
              customer={selectedConversation.customer}
              onClose={() => setShowProfile(false)}
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop: Three panels side-by-side
  return (
    <div className="flex h-screen bg-[#e5ddd5] dark:bg-[#0b141a] overflow-hidden">
      {/* Left Panel - Conversation List */}
      <div className={cn(
        "flex-shrink-0 border-r border-border/50 bg-white dark:bg-[#111b21]",
        selectedConversation ? "w-[320px]" : "w-full"
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
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#e5ddd5] dark:bg-[#0b141a]">
          <ChatThread
            conversation={selectedConversation}
            onBack={handleBack}
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

      {/* Right Panel - Customer Profile (Always visible on desktop) */}
      {selectedConversation && (
        <div className="hidden lg:flex w-[360px] border-l border-border/50 flex-shrink-0 bg-white dark:bg-[#111b21]">
          <CustomerProfile customer={selectedConversation.customer} />
        </div>
      )}
    </div>
  );
};

export default Conversations;
