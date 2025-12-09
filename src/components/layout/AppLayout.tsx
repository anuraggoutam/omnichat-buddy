import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col w-full min-w-0 overflow-hidden">
          {/* Show topbar only when NOT on dashboard */}
          {!isDashboard && <Topbar />}
          
          {/* On dashboard, show a floating sidebar trigger */}
          {isDashboard && (
            <div className="absolute top-4 left-4 z-50 md:hidden">
              <SidebarTrigger className="bg-background/80 backdrop-blur-sm border shadow-lg" />
            </div>
          )}
          
          <main className={`flex-1 overflow-auto custom-scrollbar ${isDashboard ? '' : ''}`}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
