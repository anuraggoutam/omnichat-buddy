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
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { mockAudienceSegments, mockChatTemplates } from "@/lib/mockData";

interface CampaignDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign?: any;
  onSave: (campaignData: any) => void;
}

export function CampaignDrawer({
  open,
  onOpenChange,
  campaign,
  onSave,
}: CampaignDrawerProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    channel: "WhatsApp",
    audienceSegment: "All Customers",
    audienceSize: 1247,
    template: "",
    message: "",
    scheduledAt: null as string | null,
    sendNow: true,
    costEstimate: "₹0",
    status: "Draft",
  });
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:00");

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name || "",
        channel: campaign.channel || "WhatsApp",
        audienceSegment: campaign.audienceSegment || "All Customers",
        audienceSize: campaign.audienceSize || 0,
        template: campaign.template || "",
        message: campaign.message || "",
        scheduledAt: campaign.scheduledAt || null,
        sendNow: !campaign.scheduledAt,
        costEstimate: campaign.costEstimate || "₹0",
        status: campaign.status || "Draft",
      });
    } else {
      setFormData({
        name: "",
        channel: "WhatsApp",
        audienceSegment: "All Customers",
        audienceSize: 1247,
        template: "",
        message: "",
        scheduledAt: null,
        sendNow: true,
        costEstimate: "₹0",
        status: "Draft",
      });
      setStep(1);
    }
  }, [campaign, open]);

  const handleSave = (isDraft: boolean) => {
    const scheduledDateTime =
      !formData.sendNow && date
        ? `${format(date, "yyyy-MM-dd")} ${time}`
        : null;

    onSave({
      ...formData,
      scheduledAt: scheduledDateTime,
      status: isDraft ? "Draft" : formData.sendNow ? "Running" : "Scheduled",
    });
  };

  const updateAudienceCount = (segment: string) => {
    const audienceData = mockAudienceSegments.find((s) => s.name === segment);
    if (audienceData) {
      setFormData((prev) => ({
        ...prev,
        audienceSegment: segment,
        audienceSize: audienceData.count,
        costEstimate: `₹${audienceData.count}`,
      }));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="e.g., Summer Sale Campaign"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel">Channel</Label>
              <Select
                value={formData.channel}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, channel: value }))
                }
              >
                <SelectTrigger id="channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Unified Chat">Unified Chat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Audience Segment</Label>
              <Select
                value={formData.audienceSegment}
                onValueChange={updateAudienceCount}
              >
                <SelectTrigger id="audience">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockAudienceSegments.map((segment) => (
                    <SelectItem key={segment.id} value={segment.name}>
                      {segment.name} ({segment.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Audience Size</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {formData.audienceSize.toLocaleString()}
                </div>
              </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Select Template (Optional)</Label>
              <Select
                value={formData.template}
                onValueChange={(value) => {
                  const template = mockChatTemplates.find((t) => t.name === value);
                  setFormData((prev) => ({
                    ...prev,
                    template: value,
                    message: template?.content || prev.message,
                  }));
                }}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent>
                  {mockChatTemplates.slice(0, 5).map((template) => (
                    <SelectItem key={template.id} value={template.name}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground">
                Available variables: {"{"}
                {"{"}customer_name{"}"}, {"{"}order_id{"}"}, {"{"}amount{"}"}
                {"}"}
              </p>
            </div>

            {formData.message && (
              <Card className="p-4 bg-muted/50">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Preview
                    </p>
                    <div className="bg-[hsl(var(--whatsapp))] text-white rounded-lg p-3 text-sm max-w-[280px]">
                      {formData.message}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>When to send?</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sendTime"
                    checked={formData.sendNow}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, sendNow: true }))
                    }
                    className="text-primary"
                  />
                  <span className="text-sm text-foreground">Send Now</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sendTime"
                    checked={!formData.sendNow}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, sendNow: false }))
                    }
                    className="text-primary"
                  />
                  <span className="text-sm text-foreground">
                    Schedule for Later
                  </span>
                </label>
              </div>
            </div>

            {!formData.sendNow && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                Campaign Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Campaign:</span>
                  <span className="font-medium text-foreground">
                    {formData.name || "Untitled"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Channel:</span>
                  <Badge variant="outline">{formData.channel}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Audience:</span>
                  <span className="font-medium text-foreground">
                    {formData.audienceSize.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span className="font-medium text-foreground">
                    {formData.costEstimate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {campaign ? "Edit Campaign" : "Create New Campaign"}
          </SheetTitle>
          <SheetDescription>
            Step {step} of 4: {step === 1 && "Basic Details"}
            {step === 2 && "Audience Selection"}
            {step === 3 && "Message Builder"}
            {step === 4 && "Schedule & Review"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="pr-4">{renderStep()}</div>
        </ScrollArea>

        <div className="flex gap-2 mt-6 pt-4 border-t">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="flex-1"
              disabled={
                (step === 1 && !formData.name) ||
                (step === 3 && !formData.message)
              }
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleSave(true)}
                className="flex-1"
              >
                Save Draft
              </Button>
              <Button
                onClick={() => handleSave(false)}
                className="flex-1"
                disabled={!formData.name || !formData.message}
              >
                {formData.sendNow ? "Send Now" : "Schedule"}
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
