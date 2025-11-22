import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChannelCard } from "@/components/channels/ChannelCard";
import { ManageChannelDrawer } from "@/components/channels/ManageChannelDrawer";
import { AddChannelModal } from "@/components/channels/AddChannelModal";
import { ChannelSettingsCard } from "@/components/channels/ChannelSettingsCard";
import { mockChannels, mockChannelSettings, Channel } from "@/lib/mockChannels";
import { Plus, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Channels() {
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [manageDrawerOpen, setManageDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const connectedChannels = channels.filter((c) => c.connected && !c.comingSoon);
  const disconnectedChannels = channels.filter((c) => !c.connected && !c.comingSoon);
  const comingSoonChannels = channels.filter((c) => c.comingSoon);
  const channelsWithIssues = channels.filter(
    (c) => c.connected && (c.status === "token_expired" || c.warningMessage)
  );

  const handleManage = (channel: Channel) => {
    setSelectedChannel(channel);
    setManageDrawerOpen(true);
  };

  const handleDisconnect = (channelId: string) => {
    setChannels((prev) =>
      prev.map((c) =>
        c.id === channelId
          ? { ...c, connected: false, status: "disconnected", connectedAccount: undefined }
          : c
      )
    );
  };

  const handleConnect = (channel: Channel) => {
    setSelectedChannel(channel);
    setAddModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Settings</span>
            <span>/</span>
            <span className="text-foreground">Channels</span>
          </div>
          <h1 className="text-3xl font-bold">Channels</h1>
          <p className="text-muted-foreground mt-1">
            Connect all your communication pipelines in one place
          </p>
        </div>
        <Button onClick={() => setAddModalOpen(true)} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Channel
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Connected Channels</CardDescription>
            <CardTitle className="text-3xl">{connectedChannels.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mr-1 text-green-600" />
              Active & syncing
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Available to Connect</CardDescription>
            <CardTitle className="text-3xl">{disconnectedChannels.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Ready to integrate</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Needs Attention</CardDescription>
            <CardTitle className="text-3xl">{channelsWithIssues.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 mr-1 text-orange-600" />
              Requires action
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {channelsWithIssues.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {channelsWithIssues.length} channel(s) need attention. Please check your connections.
          </AlertDescription>
        </Alert>
      )}

      {/* Connected Channels */}
      {connectedChannels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Connected Channels</h2>
            <Badge variant="secondary">{connectedChannels.length} active</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onManage={handleManage}
                onDisconnect={handleDisconnect}
                onConnect={handleConnect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Channels */}
      {disconnectedChannels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Available to Connect</h2>
            <Badge variant="outline">{disconnectedChannels.length} channels</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disconnectedChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onManage={handleManage}
                onDisconnect={handleDisconnect}
                onConnect={handleConnect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon */}
      {comingSoonChannels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Coming Soon</h2>
            <Badge variant="secondary">In Development</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comingSoonChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onManage={handleManage}
                onDisconnect={handleDisconnect}
                onConnect={handleConnect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Channel Settings */}
      <ChannelSettingsCard settings={mockChannelSettings} channels={channels} />

      {/* Modals & Drawers */}
      <ManageChannelDrawer
        channel={selectedChannel}
        open={manageDrawerOpen}
        onClose={() => setManageDrawerOpen(false)}
        onDisconnect={handleDisconnect}
      />

      <AddChannelModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        selectedChannel={selectedChannel}
        channels={channels}
      />
    </div>
  );
}
