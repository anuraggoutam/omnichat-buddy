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
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Users, Edit, Check } from "lucide-react";
import { mockRoles, mockUsers, mockPermissions, permissionCategories } from "@/lib/mockUserManagement";

interface RoleDetailDrawerProps {
  roleId: string | null;
  open: boolean;
  onClose: () => void;
  onEdit: (roleId: string) => void;
}

export function RoleDetailDrawer({
  roleId,
  open,
  onClose,
  onEdit,
}: RoleDetailDrawerProps) {
  const role = mockRoles.find((r) => r.id === roleId);
  
  if (!role) return null;

  const roleUsers = mockUsers.filter((u) => u.role === role.name);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-lg bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-2xl">{role.name}</SheetTitle>
                <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {role.userCount} users assigned
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={() => onEdit(role.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Role
            </Button>
          </div>
        </SheetHeader>

        <Separator className="my-6" />

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="users" className="flex-1">
              Users ({roleUsers.length})
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex-1">
              Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-3 mt-6">
            {roleUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No users assigned</h3>
                <p className="text-sm text-muted-foreground">
                  There are no users with this role yet.
                </p>
              </div>
            ) : (
              roleUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
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
              ))
            )}
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6 mt-6">
            {permissionCategories.map((category) => {
              const categoryPermissions = mockPermissions.filter(
                (p) => p.category === category
              );
              
              return (
                <div key={category} className="space-y-3">
                  <h3 className="font-semibold text-sm">{category}</h3>
                  <div className="space-y-2">
                    {categoryPermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                      >
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm flex-1">{permission.name}</span>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Enabled
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
