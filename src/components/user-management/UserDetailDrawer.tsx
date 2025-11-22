import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Calendar,
  Shield,
  Activity,
  Clock,
  MapPin,
  Key,
  Ban,
  Trash2,
} from "lucide-react";
import { mockUsers, mockActivityLogs } from "@/lib/mockUserManagement";
import { format } from "date-fns";
import { toast } from "sonner";

interface UserDetailDrawerProps {
  userId: string | null;
  open: boolean;
  onClose: () => void;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export function UserDetailDrawer({
  userId,
  open,
  onClose,
  onEdit,
  onDelete,
}: UserDetailDrawerProps) {
  const user = mockUsers.find((u) => u.id === userId);
  
  if (!user) return null;

  const userLogs = mockActivityLogs.filter((log) => log.userName === user.name);

  const handleResetPassword = () => {
    toast.success(`Password reset link sent to ${user.email}`);
  };

  const handleSuspend = () => {
    toast.success(`User ${user.name} has been suspended`);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{user.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-2xl">{user.name}</SheetTitle>
                <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "suspended"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => onEdit(user.id)}>
              Edit User
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetPassword}>
              <Key className="h-4 w-4 mr-2" />
              Reset Password
            </Button>
            <Button variant="outline" size="sm" onClick={handleSuspend}>
              <Ban className="h-4 w-4 mr-2" />
              Suspend
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(user.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </SheetHeader>

        <Separator className="my-6" />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              Overview
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex-1">
              Permissions
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">+1 234 567 8900</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">San Francisco, CA</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Role & Access</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Role</span>
                  </div>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Status</span>
                  </div>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "suspended"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Active</span>
                  </div>
                  <span>{user.lastActive}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined</span>
                  </div>
                  <span>Mar 15, 2024</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                  <div className="text-2xl font-semibold">234</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Conversations Handled
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <div className="text-2xl font-semibold">4.8</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Avg Response Time (min)
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <div className="text-2xl font-semibold">89%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Resolution Rate
                  </div>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <div className="text-2xl font-semibold">56</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Leads Assigned
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4 mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Assigned Permissions</h3>
              <div className="space-y-2">
                {[
                  "View Dashboard",
                  "Manage Conversations",
                  "View Customers",
                  "Manage Leads",
                  "View Analytics",
                  "Manage Templates",
                  "Send Broadcasts",
                ].map((permission) => (
                  <div
                    key={permission}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <span className="text-sm">{permission}</span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Granted
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6">
            <div className="space-y-3">
              {userLogs.map((log) => (
                <div key={log.id} className="flex gap-3 pb-3 border-b last:border-0">
                  <div className="bg-primary/10 rounded-full p-2 h-fit">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(log.timestamp), "PPp")}
                      </p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{log.ipAddress}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
