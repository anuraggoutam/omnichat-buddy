import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TopbarUserMenu } from "./TopbarUserMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Topbar() {
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="border-b border-sidebar-border bg-background px-3 sm:px-4 py-2 sm:py-3 flex-shrink-0">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-9 w-9" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          {isMobile ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="h-9 w-9"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                  </DialogHeader>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations, orders, products..."
                      className="pl-9"
                      autoFocus
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations, orders, products..."
                className="pl-9 bg-muted/50 h-9"
              />
            </div>
          )}

          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <TopbarUserMenu />
        </div>
      </div>
    </header>
  );
}
