import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChannelSettings, Channel } from "@/lib/mockChannels";
import { Settings2 } from "lucide-react";

interface ChannelSettingsCardProps {
  settings: ChannelSettings;
  channels: Channel[];
}

export function ChannelSettingsCard({ settings, channels }: ChannelSettingsCardProps) {
  const connectedChannels = channels.filter((c) => c.connected);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          <CardTitle>Channel Settings</CardTitle>
        </div>
        <CardDescription>Configure global channel behavior and AI automation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Routing Rules */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Routing Rules</Label>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              When a lead replies from any channel, assign to:
            </Label>
            <Select defaultValue={settings.routingRule}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smart">Smart Assignment (AI-powered)</SelectItem>
                <SelectItem value="specific">Specific Agent</SelectItem>
                <SelectItem value="round_robin">Round Robin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Default Sender */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Default Channel</Label>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">
              Preferred channel for AI messages and broadcasts:
            </Label>
            <Select defaultValue={settings.defaultChannel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {connectedChannels.map((channel) => (
                  <SelectItem key={channel.id} value={channel.type}>
                    {channel.icon} {channel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* AI Auto-Reply */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">AI Auto-Reply</Label>
              <p className="text-sm text-muted-foreground">
                Enable automated AI responses across channels
              </p>
            </div>
            <Switch defaultChecked={settings.aiAutoReply.enabled} />
          </div>

          <div className="space-y-3 pl-4 border-l-2">
            <div>
              <Label className="text-sm">Active Channels</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.aiAutoReply.channels.map((channelType) => {
                  const channel = channels.find((c) => c.type === channelType);
                  return (
                    <Badge key={channelType} variant="secondary">
                      {channel?.icon} {channel?.name}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Response Delay</Label>
                <p className="text-sm font-medium mt-1">{settings.aiAutoReply.delaySeconds}s</p>
              </div>
              <div>
                <Label className="text-sm">Active Hours</Label>
                <p className="text-sm font-medium mt-1">
                  {settings.aiAutoReply.allowedHours.start} -{" "}
                  {settings.aiAutoReply.allowedHours.end}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
