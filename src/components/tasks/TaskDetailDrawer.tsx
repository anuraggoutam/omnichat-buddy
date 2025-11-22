import { X, Calendar, User, Tag, Link as LinkIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { format, parseISO } from "date-fns";
import { teamMembers } from "@/lib/mockData";
import { useState } from "react";

interface TaskDetailDrawerProps {
  task: any;
  open: boolean;
  onClose: () => void;
}

export const TaskDetailDrawer = ({ task, open, onClose }: TaskDetailDrawerProps) => {
  const [newNote, setNewNote] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px] p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-xl">{task.title}</SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">{task.id}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Task Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm text-foreground mt-1">{task.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Priority
                  </label>
                  <Select defaultValue={task.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Status
                  </label>
                  <Select defaultValue={task.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Assigned To
                  </label>
                  <Select defaultValue={task.assignedTo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Due Date
                  </label>
                  <div className="flex items-center gap-2 h-10 px-3 border border-input rounded-md bg-background text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {format(parseISO(task.dueDate), "MMM dd, yyyy")}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm">
                    <Tag className="h-3 w-3 mr-1" />
                    Add Tag
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Created
                </label>
                <p className="text-sm text-foreground">
                  {format(parseISO(task.createdAt), "MMM dd, yyyy")} by {task.createdBy}
                </p>
              </div>
            </div>

            <Separator />

            {/* Related Info */}
            {task.relatedTo && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Related To
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {task.relatedTo.type}
                        </Badge>
                        <p className="text-sm font-medium">{task.relatedTo.name}</p>
                        <p className="text-xs text-muted-foreground">{task.relatedTo.refId}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Separator />
              </>
            )}

            {/* Internal Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Internal Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {task.notes.length > 0 && (
                  <div className="space-y-3">
                    {task.notes.map((note: any) => (
                      <div key={note.id} className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{note.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(parseISO(note.timestamp), "MMM dd, HH:mm")}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button size="sm" className="w-full">
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {task.activities.map((activity: any, index: number) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        {index < task.activities.length - 1 && (
                          <div className="absolute left-1 top-4 w-px h-8 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.user}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {format(parseISO(activity.timestamp), "MMM dd, HH:mm")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
