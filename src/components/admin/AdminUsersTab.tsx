import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Users, UserCircle, Crown } from "lucide-react";
import { toast } from "sonner";
import { useUserRole } from "@/hooks/useUserRole";

interface UserWithRole {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string | null;
}

const roleColors: Record<string, string> = {
  admin: "bg-destructive/20 text-destructive border-destructive/30",
  moderator: "bg-warning/20 text-warning border-warning/30",
  user: "bg-muted text-muted-foreground",
};

const roleIcons: Record<string, typeof Shield> = {
  admin: Crown,
  moderator: Shield,
  user: UserCircle,
};

export function AdminUsersTab() {
  const { isAdmin } = useUserRole();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      // Combine profiles with roles
      const usersWithRoles = (profiles || []).map((profile) => ({
        ...profile,
        role: roles?.find((r) => r.user_id === profile.id)?.role || null,
      }));

      setUsers(usersWithRoles);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: "admin" | "moderator" | "user") => {
    if (!isAdmin) {
      toast.error("Only admins can change roles");
      return;
    }

    try {
      // Check if user already has a role
      const existingRole = users.find((u) => u.id === userId)?.role;

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from("user_roles")
          .update({ role: newRole })
          .eq("user_id", userId);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from("user_roles")
          .insert([{ user_id: userId, role: newRole }]);

        if (error) throw error;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      toast.success("Role updated successfully");
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">
                  {users.filter((u) => u.role === "admin").length}
                </p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">
                  {users.filter((u) => u.role === "moderator").length}
                </p>
                <p className="text-sm text-muted-foreground">Moderators</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/50 border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">
                  {users.filter((u) => u.role === "user" || !u.role).length}
                </p>
                <p className="text-sm text-muted-foreground">Regular Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => {
                    const RoleIcon = roleIcons[user.role || "user"] || UserCircle;
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar_url || undefined} />
                              <AvatarFallback className="text-xs">
                                {(user.full_name || "U").slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {user.full_name || "Unnamed User"}
                              </p>
                              <p className="text-xs text-muted-foreground">{user.id.slice(0, 8)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={roleColors[user.role || "user"] || roleColors.user}>
                            <RoleIcon className="h-3 w-3 mr-1" />
                            {user.role || "user"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString()
                            : "Unknown"}
                        </TableCell>
                        <TableCell>
                          {isAdmin && (
                            <Select
                              value={user.role || "user"}
                              onValueChange={(value) => handleRoleChange(user.id, value as "admin" | "moderator" | "user")}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="moderator">Moderator</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
