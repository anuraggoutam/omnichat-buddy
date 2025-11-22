import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Edit,
  Eye,
  Copy,
  Trash2,
  Play,
  Pause,
  Layers,
  TrendingUp,
  Clock,
} from "lucide-react";

interface WorkflowCardProps {
  workflow: any;
  onEdit: (workflow: any) => void;
  onView: (workflow: any) => void;
  onDelete: (id: string) => void;
  onDuplicate: (workflow: any) => void;
  onToggleStatus: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  "Lead Generation": "bg-primary/10 text-primary border-primary/20",
  "Customer Support": "bg-success/10 text-success border-success/20",
  "Order Automation": "bg-accent/10 text-accent border-accent/20",
  "Marketing Automation": "bg-warning/10 text-warning border-warning/20",
};

export function WorkflowCard({
  workflow,
  onEdit,
  onView,
  onDelete,
  onDuplicate,
  onToggleStatus,
}: WorkflowCardProps) {
  return (
    <Card
      className="p-5 hover:shadow-lg transition-all cursor-pointer"
      onClick={() => onView(workflow)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{workflow.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {workflow.description}
          </p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(workflow)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(workflow)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(workflow.id)}>
                {workflow.status === "Active" ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(workflow)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(workflow.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Trigger */}
      <div className="mb-3">
        <Badge variant="outline" className="text-xs">
          {workflow.trigger}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3 pt-3 border-t">
        <div className="text-center">
          <Layers className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-sm font-semibold text-foreground">{workflow.steps}</div>
          <div className="text-xs text-muted-foreground">Steps</div>
        </div>
        <div className="text-center">
          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-sm font-semibold text-foreground">{workflow.totalRuns}</div>
          <div className="text-xs text-muted-foreground">Runs</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-success">{workflow.successRate}</div>
          <div className="text-xs text-muted-foreground">Success</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {workflow.lastRun}
        </div>
        <Badge
          variant={workflow.status === "Active" ? "default" : "secondary"}
          className={
            workflow.status === "Active"
              ? "bg-success text-success-foreground"
              : ""
          }
        >
          {workflow.status}
        </Badge>
      </div>

      {/* Category */}
      <div className="mt-2">
        <Badge
          variant="outline"
          className={`text-xs ${categoryColors[workflow.category] || ""}`}
        >
          {workflow.category}
        </Badge>
      </div>
    </Card>
  );
}
