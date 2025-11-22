import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NotificationSettings() {
  const handleSave = () => {
    toast.success("Notification settings updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground mt-1">
          Control when and how you receive notifications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversation Notifications</CardTitle>
          <CardDescription>
            Alerts related to customer conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>New Conversation</Label>
              <p className="text-sm text-muted-foreground">
                When a new conversation is assigned to you
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>New Message</Label>
              <p className="text-sm text-muted-foreground">
                When you receive a new message
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mention in Notes</Label>
              <p className="text-sm text-muted-foreground">
                When someone mentions you in conversation notes
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead & Sales Notifications</CardTitle>
          <CardDescription>
            Updates about leads and sales activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>New Lead</Label>
              <p className="text-sm text-muted-foreground">
                When a new lead enters the pipeline
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Lead Stage Changed</Label>
              <p className="text-sm text-muted-foreground">
                When a lead moves to a different stage
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Deal Closed</Label>
              <p className="text-sm text-muted-foreground">
                When a deal is won or lost
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI & Automation Notifications</CardTitle>
          <CardDescription>
            Alerts related to AI activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>AI Handover</Label>
              <p className="text-sm text-muted-foreground">
                When AI transfers a conversation to you
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Workflow Triggered</Label>
              <p className="text-sm text-muted-foreground">
                When an automation workflow runs
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Channels</CardTitle>
          <CardDescription>
            Choose how to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Browser Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show desktop notifications
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mobile Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Push notifications to mobile app
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Disable All</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
