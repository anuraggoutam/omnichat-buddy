import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreatePersonaDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  persona?: any;
  onSave: (personaData: any) => void;
}

export function CreatePersonaDrawer({
  open,
  onOpenChange,
  persona,
  onSave,
}: CreatePersonaDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Sales",
    channels: [] as string[],
    tone: "Professional",
    language: "English",
    emojiUsage: true,
    maxMessageLength: 500,
    knowledgeBase: false,
    autoResponses: 0,
    status: "Active" as const,
  });

  useEffect(() => {
    if (persona) {
      setFormData(persona);
    } else {
      setFormData({
        name: "",
        description: "",
        type: "Sales",
        channels: [],
        tone: "Professional",
        language: "English",
        emojiUsage: true,
        maxMessageLength: 500,
        knowledgeBase: false,
        autoResponses: 0,
        status: "Active" as const,
      });
    }
  }, [persona, open]);

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{persona ? "Edit AI Persona" : "Create AI Persona"}</SheetTitle>
          <SheetDescription>
            Configure your AI assistant's behavior and capabilities
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] mt-6">
          <div className="space-y-6 pr-4">
            {/* Persona Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Persona Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Persona Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Sales Assistant"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this AI persona does..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Purpose</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Lead Gen">Lead Qualification</SelectItem>
                    <SelectItem value="Booking">Booking</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Channel Activation */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Channel Activation</h3>
              <div className="space-y-3">
                {[
                  { id: "whatsapp", label: "WhatsApp", icon: "📱" },
                  { id: "instagram", label: "Instagram DM", icon: "📸" },
                  { id: "web", label: "Website Chat", icon: "🌐" },
                  { id: "email", label: "Email", icon: "✉️" },
                ].map((channel) => (
                  <div key={channel.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={channel.id}
                      checked={formData.channels.includes(channel.id)}
                      onCheckedChange={() => handleChannelToggle(channel.id)}
                    />
                    <label
                      htmlFor={channel.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {channel.icon} {channel.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tone & Behavior */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Tone & Behavior</h3>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select
                  value={formData.tone}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, tone: value }))
                  }
                >
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Fun">Fun & Casual</SelectItem>
                    <SelectItem value="Strict">Strict</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emoji">Emoji Usage</Label>
                  <div className="text-xs text-muted-foreground">
                    Allow emojis in responses
                  </div>
                </div>
                <Switch
                  id="emoji"
                  checked={formData.emojiUsage}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, emojiUsage: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxLength">Max Message Length</Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={formData.maxMessageLength}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxMessageLength: parseInt(e.target.value) || 500,
                    }))
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Knowledge Source */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Knowledge Source</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="kb">Use Knowledge Base</Label>
                  <div className="text-xs text-muted-foreground">
                    Enable access to knowledge base articles
                  </div>
                </div>
                <Switch
                  id="kb"
                  checked={formData.knowledgeBase}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, knowledgeBase: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1"
            disabled={!formData.name || formData.channels.length === 0}
          >
            {persona ? "Update Persona" : "Create Persona"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
