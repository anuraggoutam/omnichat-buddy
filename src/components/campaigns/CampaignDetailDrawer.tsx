import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  Send,
  Eye,
  MousePointerClick,
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  DollarSign,
} from "lucide-react";

interface CampaignDetailDrawerProps {
  campaign: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CampaignDetailDrawer({
  campaign,
  open,
  onOpenChange,
}: CampaignDetailDrawerProps) {
  if (!campaign) return null;

  const statusConfig = {
    Completed: { color: "bg-success text-success-foreground", icon: CheckCircle },
    Draft: { color: "bg-muted text-muted-foreground", icon: MessageSquare },
    Scheduled: { color: "bg-accent text-accent-foreground", icon: Calendar },
    Running: { color: "bg-warning text-warning-foreground", icon: Send },
    Failed: { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
  };

  const StatusIcon = statusConfig[campaign.status as keyof typeof statusConfig]?.icon;

  const stats = [
    {
      label: "Sent",
      value: campaign.sent,
      icon: Send,
      color: "text-primary",
    },
    {
      label: "Delivered",
      value: campaign.delivered,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      label: "Read",
      value: campaign.read,
      icon: Eye,
      color: "text-accent",
    },
    {
      label: "Clicks",
      value: campaign.clicks,
      icon: MousePointerClick,
      color: "text-warning",
    },
    {
      label: "Failed",
      value: campaign.failed,
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      label: "Conversions",
      value: campaign.conversions,
      icon: TrendingUp,
      color: "text-success",
    },
  ];

  const readRate =
    campaign.delivered > 0
      ? ((campaign.read / campaign.delivered) * 100).toFixed(1)
      : "0.0";
  const clickRate =
    campaign.read > 0 ? ((campaign.clicks / campaign.read) * 100).toFixed(1) : "0.0";
  const conversionRate =
    campaign.clicks > 0
      ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1)
      : "0.0";

  const mockActivities = [
    {
      id: "1",
      action: "Campaign created",
      user: campaign.createdBy,
      timestamp: campaign.createdAt,
    },
    ...(campaign.scheduledAt
      ? [
          {
            id: "2",
            action: "Scheduled for",
            user: campaign.scheduledAt,
            timestamp: campaign.createdAt,
          },
        ]
      : []),
    ...(campaign.sent > 0
      ? [
          {
            id: "3",
            action: `Sent to ${campaign.sent} recipients`,
            user: "System",
            timestamp: campaign.updatedAt,
          },
        ]
      : []),
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{campaign.name}</span>
            <Badge
              className={`${
                statusConfig[campaign.status as keyof typeof statusConfig]?.color
              } gap-1`}
            >
              {StatusIcon && <StatusIcon className="h-3 w-3" />}
              {campaign.status}
            </Badge>
          </SheetTitle>
          <SheetDescription>{campaign.id}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6 pr-4">
            {/* Campaign Summary */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Campaign Summary
              </h3>
              <Card className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Channel:</span>
                  <Badge variant="outline">{campaign.channel}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Template:</span>
                  <span className="font-medium text-foreground">
                    {campaign.template}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created By:</span>
                  <span className="font-medium text-foreground">
                    {campaign.createdBy}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium text-foreground">
                    {campaign.createdAt}
                  </span>
                </div>
                {campaign.scheduledAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Scheduled:</span>
                    <span className="font-medium text-foreground">
                      {campaign.scheduledAt}
                    </span>
                  </div>
                )}
              </Card>
            </div>

            <Separator />

            {/* Audience Insights */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Audience Insights
              </h3>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Total Audience</span>
                  </div>
                  <span className="text-2xl font-bold text-foreground">
                    {campaign.audienceSize.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Segment: {campaign.audienceSegment}
                </div>
              </Card>
            </div>

            <Separator />

            {/* Message Preview */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Message Preview
              </h3>
              <Card className="p-4 bg-muted/50">
                <div className="bg-[hsl(var(--whatsapp))] text-white rounded-lg p-3 text-sm max-w-[300px]">
                  {campaign.message}
                </div>
              </Card>
            </div>

            {campaign.sent > 0 && (
              <>
                <Separator />

                {/* Performance Analytics */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-foreground">
                    Performance Analytics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <Card key={stat.label} className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                            <span className="text-xs text-muted-foreground">
                              {stat.label}
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-foreground">
                            {stat.value.toLocaleString()}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Key Metrics */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-foreground">
                    Key Metrics
                  </h3>
                  <Card className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Read Rate
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${readRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-12 text-right">
                          {readRate}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Click Rate
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-warning"
                            style={{ width: `${clickRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-12 text-right">
                          {clickRate}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Conversion Rate
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-success"
                            style={{ width: `${conversionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-12 text-right">
                          {conversionRate}%
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Separator />

                {/* Revenue & Cost */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-foreground">
                    Financial Summary
                  </h3>
                  <Card className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Estimated Cost:
                      </span>
                      <span className="font-medium text-foreground">
                        {campaign.costEstimate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue:</span>
                      <span className="font-semibold text-success flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {campaign.revenue}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        ROI:
                      </span>
                      <span className="font-bold text-success">
                        {campaign.revenue !== "₹0"
                          ? `${Math.round(
                              ((parseInt(campaign.revenue.replace(/[₹,]/g, "")) -
                                parseInt(campaign.costEstimate.replace(/[₹,]/g, ""))) /
                                parseInt(campaign.costEstimate.replace(/[₹,]/g, ""))) *
                                100
                            )}%`
                          : "—"}
                      </span>
                    </div>
                  </Card>
                </div>
              </>
            )}

            <Separator />

            {/* Activity Timeline */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Activity Timeline
              </h3>
              <Card className="p-4">
                <div className="space-y-3">
                  {mockActivities.map((activity, index) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                        {index < mockActivities.length - 1 && (
                          <div className="absolute top-3 left-1 w-px h-8 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
