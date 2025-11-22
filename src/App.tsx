import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/Conversations";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import TeamInbox from "./pages/TeamInbox";
import Tasks from "./pages/Tasks";
import Broadcasts from "./pages/Broadcasts";
import Templates from "./pages/Templates";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/conversations"
            element={
              <AppLayout>
                <Conversations />
              </AppLayout>
            }
          />
          <Route
            path="/orders"
            element={
              <AppLayout>
                <Orders />
              </AppLayout>
            }
          />
          <Route
            path="/products"
            element={
              <AppLayout>
                <Products />
              </AppLayout>
            }
          />
          <Route
            path="/customers"
            element={
              <AppLayout>
                <Customers />
              </AppLayout>
            }
          />
          <Route
            path="/team-inbox"
            element={
              <AppLayout>
                <TeamInbox />
              </AppLayout>
            }
          />
          <Route
            path="/tasks"
            element={
              <AppLayout>
                <Tasks />
              </AppLayout>
            }
          />
          <Route
            path="/broadcasts"
            element={
              <AppLayout>
                <Broadcasts />
              </AppLayout>
            }
          />
          <Route
            path="/templates"
            element={
              <AppLayout>
                <Templates />
              </AppLayout>
            }
          />
          <Route
            path="/campaigns"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Campaigns</h1>
                  <p className="text-muted-foreground mt-2">Multi-step automation campaigns and funnels - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/ai-engine"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">AI Engine</h1>
                  <p className="text-muted-foreground mt-2">AI agents, auto-replies, and smart suggestions - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/workflows"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Workflows</h1>
                  <p className="text-muted-foreground mt-2">Visual automation builder - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/leads"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Leads</h1>
                  <p className="text-muted-foreground mt-2">Manage and qualify your sales leads - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/pipeline"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Sales Pipeline</h1>
                  <p className="text-muted-foreground mt-2">Track deals through your sales stages - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/channels"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Channels</h1>
                  <p className="text-muted-foreground mt-2">Connect WhatsApp, Instagram, Facebook, Email & more - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/marketplace"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Marketplace</h1>
                  <p className="text-muted-foreground mt-2">Browse integrations and extensions - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Analytics</h1>
                  <p className="text-muted-foreground mt-2">Track performance and insights - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Reports</h1>
                  <p className="text-muted-foreground mt-2">Detailed exports, logs, and chat history - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-muted-foreground mt-2">Configure your account and preferences - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/billing"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Billing</h1>
                  <p className="text-muted-foreground mt-2">Manage your subscription and payments - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/user-management"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">User Management</h1>
                  <p className="text-muted-foreground mt-2">Control team access and permissions - coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
