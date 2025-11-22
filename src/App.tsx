import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
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
import Campaigns from "./pages/Campaigns";
import AIEngine from "./pages/AIEngine";
import Workflows from "./pages/Workflows";
import Leads from "./pages/Leads";
import LeadsKanban from "./pages/LeadsKanban";
import PipelineSettings from "./pages/PipelineSettings";
import Channels from "./pages/Channels";
import Marketplace from "./pages/Marketplace";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import UserManagement from "./pages/UserManagement";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
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
                <Campaigns />
              </AppLayout>
            }
          />
          <Route
            path="/ai-engine"
            element={
              <AppLayout>
                <AIEngine />
              </AppLayout>
            }
          />
          <Route
            path="/workflows"
            element={
              <AppLayout>
                <Workflows />
              </AppLayout>
            }
          />
          <Route
            path="/leads"
            element={
              <AppLayout>
                <Leads />
              </AppLayout>
            }
          />
          <Route
            path="/leads/kanban"
            element={
              <AppLayout>
                <LeadsKanban />
              </AppLayout>
            }
          />
          <Route
            path="/settings/pipeline"
            element={
              <AppLayout>
                <PipelineSettings />
              </AppLayout>
            }
          />
          <Route
            path="/pipeline"
            element={
              <AppLayout>
                <PipelineSettings />
              </AppLayout>
            }
          />
          <Route
            path="/channels"
            element={
              <AppLayout>
                <Channels />
              </AppLayout>
            }
          />
          <Route
            path="/marketplace"
            element={
              <AppLayout>
                <Marketplace />
              </AppLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <AppLayout>
                <Analytics />
              </AppLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <AppLayout>
                <Reports />
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <Settings />
              </AppLayout>
            }
          />
          <Route
            path="/billing"
            element={
              <AppLayout>
                <Billing />
              </AppLayout>
            }
          />
          <Route
            path="/user-management"
            element={
              <AppLayout>
                <UserManagement />
              </AppLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
