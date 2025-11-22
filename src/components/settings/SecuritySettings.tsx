import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Smartphone, Monitor, X } from "lucide-react";
import { toast } from "sonner";

export function SecuritySettings() {
  const handlePasswordChange = () => {
    toast.success("Password updated successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account security and login preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password regularly to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button onClick={handlePasswordChange}>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <p className="text-sm text-muted-foreground">
                  Currently disabled
                </p>
              </div>
            </div>
            <Switch />
          </div>
          <p className="text-sm text-muted-foreground">
            Use an authenticator app to generate one-time codes for login
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage devices where you're currently logged in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Chrome on Windows</div>
                  <div className="text-sm text-muted-foreground">
                    San Francisco, CA • Last active: Now
                  </div>
                </div>
              </div>
              <Badge>Current</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Safari on iPhone</div>
                  <div className="text-sm text-muted-foreground">
                    San Francisco, CA • Last active: 2 hours ago
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>
            Recent login attempts to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jan 21, 2025 10:30 AM</TableCell>
                <TableCell>Chrome on Windows</TableCell>
                <TableCell>San Francisco, CA</TableCell>
                <TableCell>
                  <Badge variant="default">Success</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jan 21, 2025 08:15 AM</TableCell>
                <TableCell>Safari on iPhone</TableCell>
                <TableCell>San Francisco, CA</TableCell>
                <TableCell>
                  <Badge variant="default">Success</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jan 20, 2025 06:45 PM</TableCell>
                <TableCell>Firefox on Mac</TableCell>
                <TableCell>Unknown</TableCell>
                <TableCell>
                  <Badge variant="destructive">Failed</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
