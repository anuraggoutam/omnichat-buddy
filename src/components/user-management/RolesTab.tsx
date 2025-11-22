import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Edit } from "lucide-react";
import { mockRoles } from "@/lib/mockUserManagement";
import { EditRoleModal } from "./EditRoleModal";

export function RolesTab() {
  const [editingRole, setEditingRole] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockRoles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingRole(role.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <CardTitle className="text-xl">{role.name}</CardTitle>
                <CardDescription className="mt-2">{role.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{role.userCount} users</span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEditingRole(role.id)}
              >
                Edit Permissions
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditRoleModal
        roleId={editingRole}
        onClose={() => setEditingRole(null)}
      />
    </div>
  );
}
