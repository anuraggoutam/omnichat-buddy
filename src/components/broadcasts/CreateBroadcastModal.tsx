import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { mockBroadcastTemplates, mockAudienceSegments } from "@/lib/mockData";

interface CreateBroadcastModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBroadcastCreated?: (broadcast: any) => void;
}

export function CreateBroadcastModal({
  open,
  onOpenChange,
  onBroadcastCreated,
}: CreateBroadcastModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audienceSegment: "",
    audienceCount: 0,
    messageType: "template",
    template: "",
    customMessage: "",
    scheduleType: "now",
    scheduledDate: undefined as Date | undefined,
    scheduledTime: "10:00",
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    const selectedSegment = mockAudienceSegments.find(
      (s) => s.name === formData.audienceSegment
    );

    const selectedTemplate = mockBroadcastTemplates.find(
      (t) => t.name === formData.template
    );

    const newBroadcast = {
      id: `BR-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      title: formData.title,
      messagePreview:
        formData.messageType === "template"
          ? `${formData.template} message`
          : formData.customMessage.substring(0, 50) + "...",
      fullMessage: formData.customMessage || "Template message content",
      status: formData.scheduleType === "now" ? "Sending" : "Scheduled",
      audience: `${formData.audienceSegment} (${formData.audienceCount})`,
      audienceSegment: formData.audienceSegment,
      audienceCount: formData.audienceCount,
      template: formData.template || "Custom",
      sent: formData.scheduleType === "now" ? Math.floor(formData.audienceCount * 0.8) : 0,
      delivered: formData.scheduleType === "now" ? Math.floor(formData.audienceCount * 0.7) : 0,
      read: formData.scheduleType === "now" ? Math.floor(formData.audienceCount * 0.5) : 0,
      clicks: formData.scheduleType === "now" ? Math.floor(formData.audienceCount * 0.2) : 0,
      failed: formData.scheduleType === "now" ? Math.floor(formData.audienceCount * 0.1) : 0,
      createdAt: new Date().toISOString().split("T")[0],
      scheduledAt:
        formData.scheduleType === "scheduled" && formData.scheduledDate
          ? `${format(formData.scheduledDate, "yyyy-MM-dd")} ${formData.scheduledTime}`
          : null,
      createdBy: "You",
    };

    onBroadcastCreated?.(newBroadcast);
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      title: "",
      description: "",
      audienceSegment: "",
      audienceCount: 0,
      messageType: "template",
      template: "",
      customMessage: "",
      scheduleType: "now",
      scheduledDate: undefined,
      scheduledTime: "10:00",
    });
  };

  const handleSegmentChange = (segmentName: string) => {
    const segment = mockAudienceSegments.find((s) => s.name === segmentName);
    setFormData({
      ...formData,
      audienceSegment: segmentName,
      audienceCount: segment?.count || 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Broadcast</DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Step {step} of {totalSteps}
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="py-4">
            {/* Step 1: Basic Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Campaign Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Black Friday Sale 2025"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of this campaign..."
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Audience Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Select Audience Segment *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {mockAudienceSegments.map((segment) => (
                      <Card
                        key={segment.id}
                        className={`p-4 cursor-pointer transition-all ${
                          formData.audienceSegment === segment.name
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleSegmentChange(segment.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">
                              {segment.name}
                            </span>
                          </div>
                          <Badge variant="secondary">{segment.count}</Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                {formData.audienceCount > 0 && (
                  <Card className="p-4 bg-accent/10 border-accent">
                    <div className="flex items-center gap-2 text-accent">
                      <Users className="h-5 w-5" />
                      <span className="font-semibold text-lg">
                        {formData.audienceCount} customers
                      </span>
                      <span className="text-sm">will receive this broadcast</span>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Step 3: Message Builder */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Message Type</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Card
                      className={`p-4 cursor-pointer ${
                        formData.messageType === "template"
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, messageType: "template" })
                      }
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="font-medium text-foreground">Use Template</span>
                      </div>
                    </Card>
                    <Card
                      className={`p-4 cursor-pointer ${
                        formData.messageType === "custom"
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, messageType: "custom" })
                      }
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="font-medium text-foreground">Custom Message</span>
                      </div>
                    </Card>
                  </div>
                </div>

                {formData.messageType === "template" ? (
                  <div>
                    <Label>Select Template</Label>
                    <Select
                      value={formData.template}
                      onValueChange={(value) =>
                        setFormData({ ...formData, template: value })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Choose a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBroadcastTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.name}>
                            {template.name} ({template.category})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label>Message Text *</Label>
                      <Textarea
                        value={formData.customMessage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customMessage: e.target.value,
                          })
                        }
                        placeholder="Type your message here... You can use {{name}}, {{orderId}} as variables"
                        className="mt-1.5 min-h-[120px]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add Image
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Button
                      </Button>
                    </div>
                  </div>
                )}

                {/* Preview */}
                <div>
                  <Label>Preview</Label>
                  <div className="mt-2 bg-muted p-4 rounded-lg">
                    <div className="bg-[hsl(var(--whatsapp))] text-white p-4 rounded-lg max-w-sm shadow-md">
                      <div className="text-sm whitespace-pre-wrap">
                        {formData.messageType === "custom" && formData.customMessage
                          ? formData.customMessage
                          : formData.template
                          ? `This is a preview of ${formData.template}`
                          : "Your message will appear here..."}
                      </div>
                      <div className="text-xs opacity-75 mt-2 text-right">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        ✓✓
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label>When to Send?</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Card
                      className={`p-4 cursor-pointer ${
                        formData.scheduleType === "now"
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, scheduleType: "now" })
                      }
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium text-foreground">Send Now</span>
                      </div>
                    </Card>
                    <Card
                      className={`p-4 cursor-pointer ${
                        formData.scheduleType === "scheduled"
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, scheduleType: "scheduled" })
                      }
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="font-medium text-foreground">Schedule for Later</span>
                      </div>
                    </Card>
                  </div>
                </div>

                {formData.scheduleType === "scheduled" && (
                  <div className="space-y-3">
                    <div>
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-1.5",
                              !formData.scheduledDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.scheduledDate ? (
                              format(formData.scheduledDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.scheduledDate}
                            onSelect={(date) =>
                              setFormData({ ...formData, scheduledDate: date })
                            }
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="time">Select Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            scheduledTime: e.target.value,
                          })
                        }
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                )}

                <Card className="p-4 bg-accent/10 border-accent">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <div className="font-medium text-accent">Smart Send Suggestion</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Best time to reach your audience: 6:00 PM - 9:00 PM
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Campaign Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="font-medium text-foreground">{formData.title}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Audience:</span>
                      <span className="text-foreground">
                        {formData.audienceSegment} ({formData.audienceCount})
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Message Type:</span>
                      <span className="text-foreground">
                        {formData.messageType === "template"
                          ? formData.template
                          : "Custom Message"}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Schedule:</span>
                      <span className="text-foreground">
                        {formData.scheduleType === "now"
                          ? "Send Immediately"
                          : formData.scheduledDate
                          ? `${format(formData.scheduledDate, "PPP")} at ${
                              formData.scheduledTime
                            }`
                          : "Not scheduled"}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-success/10 border-success">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Ready to Send!</div>
                      <div className="text-sm">
                        Estimated delivery: {formData.audienceCount} messages
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.title) ||
                  (step === 2 && !formData.audienceSegment) ||
                  (step === 3 &&
                    formData.messageType === "template" &&
                    !formData.template) ||
                  (step === 3 &&
                    formData.messageType === "custom" &&
                    !formData.customMessage)
                }
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleCreate}>
                <CheckCircle className="h-4 w-4 mr-2" />
                {formData.scheduleType === "now"
                  ? "Send Broadcast"
                  : "Schedule Broadcast"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
