import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Channel } from "@/lib/mockChannels";
import { Copy, Unlink, Send, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ManageChannelDrawerProps {
  channel: Channel | null;
  open: boolean;
  onClose: () => void;
  onDisconnect: (channelId: string) => void;
}

export function ManageChannelDrawer({
  channel,
  open,
  onClose,
  onDisconnect,
}: ManageChannelDrawerProps) {
  if (!channel) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleTestConnection = () => {
    toast.success("Connection test successful!");
  };

  const handleSyncNow = () => {
    toast.success("Syncing messages...");
  };

  const handleDisconnect = () => {
    onDisconnect(channel.id);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{channel.icon}</div>
            <div>
              <SheetTitle>{channel.name}</SheetTitle>
              <SheetDescription>{channel.connectedAccount}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Status Section */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Status</Label>
            <Badge
              className={
                channel.status === "live"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            >
              {channel.status === "live" ? "Connected & Active" : channel.status}
            </Badge>
          </div>

          <Separator />

          {/* WhatsApp Specific */}
          {channel.type === "whatsapp" && channel.config && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>Business Phone Number</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={channel.config.phoneNumber} readOnly />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(channel.config?.phoneNumber || "")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={channel.config.apiKey} readOnly type="password" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(channel.config?.apiKey || "")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Webhook URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={channel.config.webhookUrl} readOnly className="text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(channel.config?.webhookUrl || "")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Quality Rating</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-100 text-green-700">
                      {channel.config.qualityRating}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Maintains high quality standards
                    </span>
                  </div>
                </div>

                {channel.dailyLimit && (
                  <div>
                    <Label>Daily Message Limit</Label>
                    <p className="text-sm text-muted-foreground mt-1">{channel.dailyLimit}</p>
                  </div>
                )}
              </div>

              <Separator />
            </>
          )}

          {/* Email Specific */}
          {channel.type === "email" && channel.config && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <Input value={channel.config.email} readOnly className="mt-1" />
                </div>

                <div>
                  <Label>SMTP Host</Label>
                  <Input value={channel.config.smtpHost} readOnly className="mt-1" />
                </div>

                <div>
                  <Label>SMTP Port</Label>
                  <Input value={channel.config.smtpPort} readOnly className="mt-1" />
                </div>

                <div>
                  <Label>Encryption</Label>
                  <Badge variant="secondary" className="mt-1">
                    TLS
                  </Badge>
                </div>
              </div>

              <Button onClick={handleTestConnection} variant="outline" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Test Email
              </Button>

              <Separator />
            </>
          )}

          {/* SMS Specific */}
          {channel.type === "sms" && channel.config && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>Provider</Label>
                  <p className="text-sm font-medium mt-1">{channel.provider}</p>
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input value={channel.config.phoneNumber} readOnly className="mt-1" />
                </div>

                <div>
                  <Label>API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={channel.config.apiKey} readOnly type="password" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(channel.config?.apiKey || "")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Balance</Label>
                  <p className="text-lg font-bold text-green-600 mt-1">{channel.config.balance}</p>
                  <Button variant="link" className="h-auto p-0 text-xs">
                    Add Credits
                  </Button>
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* Website Chat Specific */}
          {channel.type === "website" && channel.config && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>Embed Code</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value={channel.config.embedCode} readOnly className="text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(channel.config?.embedCode || "")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Paste this code before the closing &lt;/body&gt; tag
                  </p>
                </div>

                <div>
                  <Label>Theme Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: channel.config.themeColor }}
                    />
                    <Input value={channel.config.themeColor} readOnly />
                  </div>
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* Instagram Specific */}
          {channel.type === "instagram" && channel.config && (
            <>
              <div className="space-y-4">
                <div>
                  <Label>Instagram Handle</Label>
                  <Input value={channel.config.handle} readOnly className="mt-1" />
                </div>

                <div>
                  <Label>Permissions</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {channel.config.permissions?.map((perm) => (
                      <Badge key={perm} variant="secondary">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleSyncNow} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>

            <Button onClick={handleTestConnection} variant="outline" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Test Connection
            </Button>

            <Button
              onClick={handleDisconnect}
              variant="destructive"
              className="w-full"
            >
              <Unlink className="h-4 w-4 mr-2" />
              Disconnect Channel
            </Button>
          </div>

          {/* Last Sync Info */}
          {channel.lastSynced && (
            <div className="text-xs text-muted-foreground text-center pt-4">
              Last synced: {channel.lastSynced}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
