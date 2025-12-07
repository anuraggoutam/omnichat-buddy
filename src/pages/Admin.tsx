import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCustomersTab } from "@/components/admin/AdminCustomersTab";
import { AdminUsersTab } from "@/components/admin/AdminUsersTab";
import { AdminOverviewTab } from "@/components/admin/AdminOverviewTab";
import { AdminSettingsTab } from "@/components/admin/AdminSettingsTab";
import { Shield, Users, BarChart3, Settings, UserCircle } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground text-sm">
                Manage customers, users, and system settings
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-background">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2 data-[state=active]:bg-background">
              <UserCircle className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-background">
              <Users className="h-4 w-4" />
              Users & Roles
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-background">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="m-0">
            <AdminOverviewTab />
          </TabsContent>

          <TabsContent value="customers" className="m-0">
            <AdminCustomersTab />
          </TabsContent>

          <TabsContent value="users" className="m-0">
            <AdminUsersTab />
          </TabsContent>

          <TabsContent value="settings" className="m-0">
            <AdminSettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
