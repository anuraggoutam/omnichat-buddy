import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, MoreVertical, Zap, TrendingUp } from "lucide-react";

interface AutoActionsCardProps {
  action: any;
  onUpdate: (action: any) => void;
  onDelete: (id: string) => void;
}

const triggerIcons: Record<string, string> = {
  Keyword: "🔑",
  Intent: "🎯",
  "Customer Attribute": "👤",
};

const actionIcons: Record<string, string> = {
  Tag: "🏷️",
  Reply: "💬",
  Assign: "👨‍💼",
  Delay: "⏱️",
  Webhook: "🔗",
};

export function AutoActionsCard({ action, onUpdate, onDelete }: AutoActionsCardProps) {
  const handleToggleStatus = () => {
    onUpdate({
      ...action,
      status: action.status === "Active" ? ("Paused" as const) : ("Active" as const),
    });
  };

  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">{action.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {action.description}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleToggleStatus}>
              {action.status === "Active" ? "Pause" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(action.id)} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-xl">{triggerIcons[action.trigger]}</span>
          <span className="text-muted-foreground">Trigger:</span>
          <Badge variant="outline" className="text-xs">
            {action.trigger}
          </Badge>
          <span className="text-xs text-muted-foreground truncate">
            {action.triggerValue}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-xl">{actionIcons[action.action]}</span>
          <span className="text-muted-foreground">Action:</span>
          <Badge variant="outline" className="text-xs">
            {action.action}
          </Badge>
          <span className="text-xs text-foreground truncate">{action.actionValue}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span className="font-medium text-foreground">{action.timesTriggered}</span> times
          triggered
        </div>
        <Badge
          className={
            action.status === "Active"
              ? "bg-success text-success-foreground"
              : "bg-muted text-muted-foreground"
          }
        >
          {action.status}
        </Badge>
      </div>
    </Card>
  );
}
