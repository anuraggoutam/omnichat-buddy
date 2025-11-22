import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: any;
  onClick: () => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "Low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-all border",
        task.priority === "High" && "border-l-4 border-l-red-500"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm text-foreground line-clamp-2">{task.title}</h4>
            <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
              {task.priority}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

          {/* Related Entity */}
          {task.relatedTo && (
            <Badge variant="secondary" className="text-xs">
              {task.relatedTo.type}: {task.relatedTo.refId}
            </Badge>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {getInitials(task.assignedTo)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{task.assignedTo}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(parseISO(task.dueDate), "MMM dd")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
