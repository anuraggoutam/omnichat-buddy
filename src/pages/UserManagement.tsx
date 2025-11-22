import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { UsersTab } from "@/components/user-management/UsersTab";
import { RolesTab } from "@/components/user-management/RolesTab";
import { PermissionsTab } from "@/components/user-management/PermissionsTab";
import { InvitationsTab } from "@/components/user-management/InvitationsTab";
import { ActivityLogsTab } from "@/components/user-management/ActivityLogsTab";
import { InviteUserModal } from "@/components/user-management/InviteUserModal";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("users");
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage team members, roles, permissions and invitations.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("roles")}>
              <Settings className="h-4 w-4 mr-2" />
              Manage Roles
            </Button>
            <Button onClick={() => setShowInviteModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
              <TabsTrigger value="activity">Activity Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <UsersTab />
            </TabsContent>

            <TabsContent value="roles" className="mt-6">
              <RolesTab />
            </TabsContent>

            <TabsContent value="permissions" className="mt-6">
              <PermissionsTab />
            </TabsContent>

            <TabsContent value="invitations" className="mt-6">
              <InvitationsTab />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <ActivityLogsTab />
            </TabsContent>
          </Tabs>
        </Card>

        <InviteUserModal open={showInviteModal} onOpenChange={setShowInviteModal} />
      </div>
    </div>
  );
}
