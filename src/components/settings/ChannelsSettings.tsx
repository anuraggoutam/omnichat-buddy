import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Instagram, Facebook, Globe, CheckCircle } from "lucide-react";
import { mockChannelStatus } from "@/lib/mockSettings";
import { toast } from "sonner";

export function ChannelsSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Channel Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage all your communication channels
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                WhatsApp Business
              </CardTitle>
              <CardDescription>Official WhatsApp Business API</CardDescription>
            </div>
            {mockChannelStatus.whatsapp.connected && (
              <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Connected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Phone Number</Label>
              <p className="font-medium">{mockChannelStatus.whatsapp.number}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">API Type</Label>
              <p className="font-medium">{mockChannelStatus.whatsapp.apiType}</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline">Manage Templates</Button>
            <Button variant="outline">View Logs</Button>
            <Button variant="destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-600" />
                Instagram Direct
              </CardTitle>
              <CardDescription>Instagram messaging integration</CardDescription>
            </div>
            {mockChannelStatus.instagram.connected && (
              <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Connected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Instagram Handle</Label>
              <p className="font-medium">{mockChannelStatus.instagram.handle}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Status</Label>
              <p className="font-medium">{mockChannelStatus.instagram.status}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Permissions</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Direct Messages</Badge>
              <Badge variant="outline">Comments</Badge>
              <Badge variant="outline">Story Mentions</Badge>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline">Reconnect</Button>
            <Button variant="destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-blue-600" />
                Facebook Page
              </CardTitle>
              <CardDescription>Facebook page inbox integration</CardDescription>
            </div>
            {mockChannelStatus.facebook.connected && (
              <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Connected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Page Name</Label>
              <p className="font-medium">{mockChannelStatus.facebook.pageName}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Status</Label>
              <p className="font-medium">{mockChannelStatus.facebook.status}</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline">Reconnect</Button>
            <Button variant="destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Web Chat Widget
              </CardTitle>
              <CardDescription>Live chat for your website</CardDescription>
            </div>
            <Switch defaultChecked={mockChannelStatus.webchat.enabled} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Widget Position</Label>
            <Select defaultValue={mockChannelStatus.webchat.position}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Bottom Left</SelectItem>
                <SelectItem value="right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Welcome Message</Label>
            <Textarea
              placeholder="Hi! How can we help you today?"
              defaultValue="Hi! How can we help you today?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Installation Script</Label>
            <div className="p-3 bg-muted rounded-lg">
              <code className="text-xs">
                {`<script src="https://widget.yoursite.com/chat.js"></script>`}
              </code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(
                  '<script src="https://widget.yoursite.com/chat.js"></script>'
                );
                toast.success("Script copied to clipboard");
              }}
            >
              Copy Script
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <h3 className="font-semibold mb-2">SMS Integration</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Coming soon • Connect Twilio, MSG91, or custom SMS provider
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
