import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Channel } from "@/lib/mockChannels";
import { Settings, Unlink, Link, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ChannelCardProps {
  channel: Channel;
  onManage: (channel: Channel) => void;
  onDisconnect: (channelId: string) => void;
  onConnect: (channel: Channel) => void;
}

export function ChannelCard({ channel, onManage, onDisconnect, onConnect }: ChannelCardProps) {
  const getStatusBadge = () => {
    if (channel.comingSoon) {
      return (
        <Badge variant="secondary" className="bg-muted">
          Coming Soon
        </Badge>
      );
    }

    if (!channel.connected) {
      return <Badge variant="outline">Not Connected</Badge>;
    }

    switch (channel.status) {
      case "live":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <div className="w-2 h-2 rounded-full bg-green-600 mr-1" />
            Live
          </Badge>
        );
      case "rate_limited":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Rate Limited</Badge>
        );
      case "token_expired":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Token Expired</Badge>
        );
      case "disconnected":
        return <Badge variant="outline">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleDisconnect = () => {
    onDisconnect(channel.id);
    toast.success(`${channel.name} disconnected`);
  };

  return (
    <Card
      className={`hover:shadow-lg transition-all ${
        channel.comingSoon ? "opacity-60" : ""
      } ${channel.status === "token_expired" ? "border-destructive" : ""}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{channel.icon}</div>
            <div>
              <CardTitle className="text-lg">{channel.name}</CardTitle>
              {channel.connected && channel.connectedAccount && (
                <CardDescription className="mt-1">{channel.connectedAccount}</CardDescription>
              )}
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent>
        {channel.connected ? (
          <div className="space-y-3">
            {/* Connection Info */}
            {channel.provider && (
              <div className="text-sm">
                <span className="text-muted-foreground">Provider: </span>
                <span className="font-medium">{channel.provider}</span>
              </div>
            )}

            {channel.lastSynced && (
              <div className="text-sm">
                <span className="text-muted-foreground">Last synced: </span>
                <span className="font-medium">{channel.lastSynced}</span>
              </div>
            )}

            {channel.dailyLimit && (
              <div className="text-sm">
                <span className="text-muted-foreground">Limit: </span>
                <span className="font-medium">{channel.dailyLimit}</span>
              </div>
            )}

            {/* Warning Message */}
            {channel.warningMessage && (
              <div className="flex items-start gap-2 p-2 bg-destructive/10 rounded text-sm text-destructive">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{channel.warningMessage}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => onManage(channel)} className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDisconnect}
                className="text-destructive hover:text-destructive"
              >
                <Unlink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {channel.comingSoon ? (
              <p className="text-sm text-muted-foreground">
                This channel is coming soon. Stay tuned for updates!
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Boost engagement by connecting this channel to your CRM.
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => onConnect(channel)} className="flex-1">
                    <Link className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="ghost" size="sm">
                    Learn More
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
