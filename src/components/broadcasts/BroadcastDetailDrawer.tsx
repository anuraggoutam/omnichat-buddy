import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Send,
  CheckCircle,
  Eye,
  MousePointerClick,
  AlertCircle,
  Calendar,
  User,
  MessageSquare,
  FileText,
  Clock,
} from "lucide-react";

interface BroadcastDetailDrawerProps {
  broadcast: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BroadcastDetailDrawer({
  broadcast,
  open,
  onOpenChange,
}: BroadcastDetailDrawerProps) {
  if (!broadcast) return null;

  const statusConfig = {
    Completed: { color: "bg-success text-success-foreground", icon: CheckCircle },
    Draft: { color: "bg-muted text-muted-foreground", icon: FileText },
    Scheduled: { color: "bg-accent text-accent-foreground", icon: Clock },
    Sending: { color: "bg-warning text-warning-foreground", icon: Send },
    Failed: { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
  };

  const StatusIcon = statusConfig[broadcast.status as keyof typeof statusConfig]?.icon;

  const mockNotes = [
    {
      id: "1",
      author: "Aman Gupta",
      content: "Campaign performed well, high engagement rate.",
      timestamp: "2025-11-22 3:45 PM",
    },
  ];

  const mockActivity = [
    {
      id: "1",
      action: "Campaign created",
      user: broadcast.createdBy,
      timestamp: broadcast.createdAt,
    },
    {
      id: "2",
      action: "Audience segment updated",
      user: broadcast.createdBy,
      timestamp: broadcast.createdAt,
    },
    ...(broadcast.scheduledAt
      ? [
          {
            id: "3",
            action: `Scheduled for ${broadcast.scheduledAt}`,
            user: broadcast.createdBy,
            timestamp: broadcast.createdAt,
          },
        ]
      : []),
    ...(broadcast.sent > 0
      ? [
          {
            id: "4",
            action: `Sent to ${broadcast.sent} recipients`,
            user: "System",
            timestamp: broadcast.scheduledAt || broadcast.createdAt,
          },
        ]
      : []),
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="text-xl">{broadcast.title}</SheetTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={`${statusConfig[broadcast.status as keyof typeof statusConfig]?.color} gap-1`}>
              {StatusIcon && <StatusIcon className="h-3 w-3" />}
              {broadcast.status}
            </Badge>
            <span className="text-sm text-muted-foreground">{broadcast.id}</span>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
          <div className="space-y-6">
            {/* Campaign Summary */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                <FileText className="h-4 w-4" />
                Campaign Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template:</span>
                  <span className="font-medium text-foreground">{broadcast.template}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="text-foreground">{broadcast.createdAt}</span>
                </div>
                {broadcast.scheduledAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scheduled:</span>
                    <span className="text-foreground">{broadcast.scheduledAt}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created By:</span>
                  <span className="text-foreground">{broadcast.createdBy}</span>
                </div>
                <Separator />
                <div>
                  <label className="text-muted-foreground mb-2 block">Status</label>
                  <Select defaultValue={broadcast.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Sending">Sending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Audience Insights */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Users className="h-4 w-4" />
                Audience Insights
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Selected:</span>
                  <span className="font-semibold text-lg text-foreground">
                    {broadcast.audienceCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Segment:</span>
                  <Badge variant="secondary">{broadcast.audienceSegment}</Badge>
                </div>
                <div className="text-xs text-muted-foreground pt-2">
                  Sample: +91 98765*****,  +91 98123*****,  +91 97654*****
                </div>
              </div>
            </Card>

            {/* WhatsApp Message Preview */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                <MessageSquare className="h-4 w-4" />
                Message Preview
              </h3>
              <div className="bg-[hsl(var(--whatsapp))] text-white p-4 rounded-lg max-w-sm shadow-md">
                <div className="whitespace-pre-wrap text-sm">{broadcast.fullMessage}</div>
                <div className="text-xs opacity-75 mt-2 text-right">
                  {broadcast.scheduledAt || broadcast.createdAt} ✓✓
                </div>
              </div>
            </Card>

            {/* Performance Analytics */}
            {broadcast.sent > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                  Performance Analytics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Send className="h-4 w-4" />
                      <span className="text-sm">Sent</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{broadcast.sent}</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Delivered</span>
                    </div>
                    <div className="text-2xl font-bold text-success">{broadcast.delivered}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((broadcast.delivered / broadcast.sent) * 100)}% rate
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Read</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">{broadcast.read}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((broadcast.read / broadcast.delivered) * 100)}% open rate
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MousePointerClick className="h-4 w-4" />
                      <span className="text-sm">Clicks</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{broadcast.clicks}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((broadcast.clicks / broadcast.read) * 100)}% CTR
                    </div>
                  </div>
                </div>
                {broadcast.failed > 0 && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">{broadcast.failed} Failed</span>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Internal Notes */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 text-foreground">Internal Notes</h3>
              <Textarea
                placeholder="Add notes about this campaign..."
                className="mb-3"
              />
              <div className="space-y-3">
                {mockNotes.map((note) => (
                  <div key={note.id} className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity Timeline */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Calendar className="h-4 w-4" />
                Activity Timeline
              </h3>
              <div className="space-y-3">
                {mockActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <div className="flex-1">
                      <div className="text-sm text-foreground">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
