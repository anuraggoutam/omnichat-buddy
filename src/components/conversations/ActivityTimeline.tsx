import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimelineItem {
  id: string;
  type: string;
  content: string;
  timestamp: string;
  icon: string;
}

interface ActivityTimelineProps {
  activities: TimelineItem[];
}

export const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4 pr-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
              {activity.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.content}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>

            {/* Connector line */}
            {index < activities.length - 1 && (
              <div className="absolute left-[15px] top-10 w-0.5 h-12 bg-border" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
