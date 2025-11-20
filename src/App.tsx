import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Conversations from "./pages/Conversations";
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
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
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
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Orders</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/products"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Products</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/customers"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Customers</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/broadcasts"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Broadcasts</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/templates"
            element={
              <AppLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Templates</h1>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
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
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
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
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
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
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
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
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
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
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
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
