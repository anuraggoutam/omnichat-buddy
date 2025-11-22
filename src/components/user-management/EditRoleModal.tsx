import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { mockRoles, mockPermissions, permissionCategories } from "@/lib/mockUserManagement";
import { toast } from "sonner";

interface EditRoleModalProps {
  roleId: string | null;
  onClose: () => void;
}

export function EditRoleModal({ roleId, onClose }: EditRoleModalProps) {
  const role = mockRoles.find((r) => r.id === roleId);

  if (!role) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Role ${role.name} updated successfully!`);
    onClose();
  };

  return (
    <Dialog open={!!roleId} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Role: {role.name}</DialogTitle>
          <DialogDescription>
            Modify role name and permissions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input id="role-name" defaultValue={role.name} required />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Permissions</h4>
            {permissionCategories.map((category) => {
              const categoryPermissions = mockPermissions.filter(
                (p) => p.category === category
              );

              return (
                <div key={category} className="space-y-3">
                  <h5 className="text-sm font-medium text-muted-foreground">
                    {category}
                  </h5>
                  <div className="grid gap-3 pl-4">
                    {categoryPermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-start space-x-3"
                      >
                        <Checkbox
                          id={permission.id}
                          defaultChecked={role.permissions.includes(permission.id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={permission.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {permission.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
