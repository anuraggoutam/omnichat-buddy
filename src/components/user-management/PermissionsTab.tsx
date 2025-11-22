import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { mockPermissions, permissionCategories } from "@/lib/mockUserManagement";
import { toast } from "sonner";

export function PermissionsTab() {
  const handleToggle = (permissionName: string, enabled: boolean) => {
    toast.info(`${permissionName} ${enabled ? "enabled" : "disabled"}`);
  };

  return (
    <div className="space-y-6">
      {permissionCategories.map((category) => {
        const categoryPermissions = mockPermissions.filter(
          (p) => p.category === category
        );

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>
                Manage permissions for {category.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryPermissions.map((permission, index) => (
                <div key={permission.id}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={permission.id}>{permission.name}</Label>
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                    <Switch
                      id={permission.id}
                      defaultChecked={Math.random() > 0.5}
                      onCheckedChange={(checked) =>
                        handleToggle(permission.name, checked)
                      }
                    />
                  </div>
                  {index < categoryPermissions.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
