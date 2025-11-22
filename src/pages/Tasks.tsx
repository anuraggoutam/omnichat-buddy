import { useState } from "react";
import { Plus, List, LayoutGrid, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockTasks, teamMembers } from "@/lib/mockData";
import { TaskDetailDrawer } from "@/components/tasks/TaskDetailDrawer";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { TaskCard } from "@/components/tasks/TaskCard";
import { cn } from "@/lib/utils";
import { format, isToday, isPast, parseISO } from "date-fns";

type ViewMode = "list" | "kanban";
type FilterType = "all" | "my-tasks" | "high-priority" | "due-today" | "overdue" | "completed";

const Tasks = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Get unique tags
  const allTags = Array.from(new Set(mockTasks.flatMap((task) => task.tags)));

  // Filter tasks
  const filteredTasks = mockTasks.filter((task) => {
    // Search filter
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Status filters
    if (filter === "my-tasks" && task.assignedTo !== "Aman Gupta") return false;
    if (filter === "high-priority" && task.priority !== "High") return false;
    if (filter === "due-today" && !isToday(parseISO(task.dueDate))) return false;
    if (filter === "overdue" && !isPast(parseISO(task.dueDate))) return false;
    if (filter === "completed" && task.status !== "Completed") return false;

    // Team filter
    if (selectedTeamMember !== "all" && task.assignedTo !== selectedTeamMember) return false;

    // Tags filter
    if (selectedTags.length > 0 && !selectedTags.some((tag) => task.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  const selectedTask = mockTasks.find((task) => task.id === selectedTaskId);

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

  const todoTasks = filteredTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = filteredTasks.filter((task) => task.status === "In Progress");
  const completedTasks = filteredTasks.filter((task) => task.status === "Completed");

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Tasks</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage team tasks and follow-ups
              </p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>

          {/* Filters & Search */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Team Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {allTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTags([...selectedTags, tag]);
                      } else {
                        setSelectedTags(selectedTags.filter((t) => t !== tag));
                      }
                    }}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "kanban" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("kanban")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All" },
              { id: "my-tasks", label: "My Tasks" },
              { id: "high-priority", label: "High Priority" },
              { id: "due-today", label: "Due Today" },
              { id: "overdue", label: "Overdue" },
              { id: "completed", label: "Completed" },
            ].map((f) => (
              <Badge
                key={f.id}
                variant={filter === f.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setFilter(f.id as FilterType)}
              >
                {f.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {viewMode === "list" ? (
            /* List View */
            <div className="rounded-lg border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Related To</TableHead>
                    <TableHead>Tags</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedTaskId(task.id)}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{task.title}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-md">
                            {task.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{task.assignedTo}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {format(parseISO(task.dueDate), "MMM dd, yyyy")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {task.relatedTo ? (
                          <Badge variant="secondary" className="text-xs">
                            {task.relatedTo.type}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            /* Kanban View */
            <div className="grid grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    To Do
                    <Badge variant="secondary" className="ml-2">
                      {todoTasks.length}
                    </Badge>
                  </h3>
                </div>
                <div className="space-y-3 flex-1">
                  {todoTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => setSelectedTaskId(task.id)}
                    />
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    In Progress
                    <Badge variant="secondary" className="ml-2">
                      {inProgressTasks.length}
                    </Badge>
                  </h3>
                </div>
                <div className="space-y-3 flex-1">
                  {inProgressTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => setSelectedTaskId(task.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Completed
                    <Badge variant="secondary" className="ml-2">
                      {completedTasks.length}
                    </Badge>
                  </h3>
                </div>
                <div className="space-y-3 flex-1">
                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => setSelectedTaskId(task.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Task Detail Drawer */}
      {selectedTask && (
        <TaskDetailDrawer
          task={selectedTask}
          open={!!selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}

      {/* Add Task Modal */}
      <AddTaskModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default Tasks;
