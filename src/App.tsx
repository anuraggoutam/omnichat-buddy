import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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

const ProtectedLayout = () => (
  <ProtectedRoute>
    <AppLayout>
      <Outlet />
    </AppLayout>
  </ProtectedRoute>
);

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
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/team-inbox" element={<TeamInbox />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/broadcasts" element={<Broadcasts />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/ai-engine" element={<AIEngine />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/leads/kanban" element={<LeadsKanban />} />
              <Route path="/settings/pipeline" element={<PipelineSettings />} />
              <Route path="/pipeline" element={<PipelineSettings />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/user-management" element={<UserManagement />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
