import { useState } from "react";
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
import { Channel } from "@/lib/mockChannels";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AddChannelModalProps {
  open: boolean;
  onClose: () => void;
  selectedChannel: Channel | null;
  channels: Channel[];
}

export function AddChannelModal({
  open,
  onClose,
  selectedChannel,
  channels,
}: AddChannelModalProps) {
  const [step, setStep] = useState<"select" | "configure" | "success">("select");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<Channel | null>(selectedChannel);

  const disconnectedChannels = channels.filter((c) => !c.connected && !c.comingSoon);

  const handleSelectChannel = (channel: Channel) => {
    setSelectedType(channel);
    setStep("configure");
  };

  const handleConnect = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep("success");
    toast.success(`${selectedType?.name} connected successfully! 🎉`);
  };

  const handleClose = () => {
    setStep("select");
    setSelectedType(null);
    onClose();
  };

  const renderSelectStep = () => (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Connect a Channel</DialogTitle>
        <DialogDescription>Choose which channel you want to connect</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4 py-4">
        {disconnectedChannels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => handleSelectChannel(channel)}
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 hover:border-primary hover:bg-accent transition-all"
          >
            <div className="text-4xl">{channel.icon}</div>
            <div className="text-sm font-medium">{channel.name}</div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderConfigureStep = () => {
    if (!selectedType) return null;

    return (
      <div className="space-y-4">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedType.icon}</div>
            <div>
              <DialogTitle>Connect {selectedType.name}</DialogTitle>
              <DialogDescription>Enter your connection details</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* WhatsApp Configuration */}
          {selectedType.type === "whatsapp" && (
            <>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter your WhatsApp API key" />
              </div>
              <div className="space-y-2">
                <Label>Webhook URL (Optional)</Label>
                <Input placeholder="https://your-webhook-url.com" />
              </div>
            </>
          )}

          {/* Email Configuration */}
          {selectedType.type === "email" && (
            <>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="support@yourbusiness.com" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Host</Label>
                <Input placeholder="smtp.gmail.com" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input placeholder="587" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="App password" />
              </div>
            </>
          )}

          {/* SMS Configuration */}
          {selectedType.type === "sms" && (
            <>
              <div className="space-y-2">
                <Label>Provider</Label>
                <Input placeholder="Twilio" />
              </div>
              <div className="space-y-2">
                <Label>Account SID</Label>
                <Input placeholder="Enter your Twilio Account SID" />
              </div>
              <div className="space-y-2">
                <Label>Auth Token</Label>
                <Input type="password" placeholder="Enter your Auth Token" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input placeholder="+1 (555) 987-6543" />
              </div>
            </>
          )}

          {/* Social Media OAuth */}
          {(selectedType.type === "instagram" || selectedType.type === "facebook") && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">
                You'll be redirected to {selectedType.name} to authorize access
              </p>
              <Button onClick={handleConnect} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  `Connect with ${selectedType.name}`
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setStep("select")}>
            Back
          </Button>
          {selectedType.type !== "instagram" && selectedType.type !== "facebook" && (
            <Button onClick={handleConnect} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Channel"
              )}
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderSuccessStep = () => (
    <div className="space-y-4">
      <div className="text-center py-8 space-y-4">
        <div className="text-6xl">🎉</div>
        <DialogTitle>Connected Successfully!</DialogTitle>
        <DialogDescription>
          {selectedType?.name} is now connected and ready to use
        </DialogDescription>
      </div>

      <div className="flex justify-center gap-2">
        <Button variant="outline" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleClose}>Start Using Channel</Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        {step === "select" && renderSelectStep()}
        {step === "configure" && renderConfigureStep()}
        {step === "success" && renderSuccessStep()}
      </DialogContent>
    </Dialog>
  );
}
