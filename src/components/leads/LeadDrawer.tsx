import { useState, useEffect } from "react";
import { Lead, mockAgents } from "@/lib/mockLeads";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MessageCircle,
  User,
  Calendar,
  Tag,
  ExternalLink,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onUpdateLead: (data: Partial<Lead>) => void;
  isUpdating?: boolean;
}

const stageColors = {
  "New": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "Contacted": "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
  "Qualified": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Follow Up": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  "Closed Won": "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/20",
  "Closed Lost": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
};

export function LeadDrawer({ lead, open, onClose, onUpdateLead, isUpdating }: LeadDrawerProps) {
  const [newNote, setNewNote] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [localLead, setLocalLead] = useState(lead);
  
  useEffect(() => {
    setLocalLead(lead);
  }, [lead]);

  if (!localLead) return null;

  const agent = mockAgents.find((a) => a.id === localLead.assignedAgentId);

  const handleStageChange = (newStage: Lead["stage"]) => {
    onUpdateLead({ stage: newStage });
  };

  const handleAgentChange = (agentId: string) => {
    onUpdateLead({ assignedAgentId: agentId === "unassigned" ? undefined : agentId });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const newNoteObject = {
      id: `note_${Date.now()}`,
      author: "Current User", // This should come from auth context
      text: newNote,
      createdAt: new Date().toISOString(),
    };
    onUpdateLead({ notes: [...localLead.notes, newNoteObject] });
    setNewNote("");
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTaskObject = {
      id: `task_${Date.now()}`,
      title: newTaskTitle,
      status: "pending" as const,
      assignedTo: localLead.assignedAgentId || mockAgents[0].id,
      dueDate: new Date(Date.now() + 86400000).toISOString(),
    };
    onUpdateLead({ tasks: [...localLead.tasks, newTaskObject] });
    setNewTaskTitle("");
  };
  
  const handlePromoteToCustomer = () => {
    handleStageChange("Closed Won");
    toast.success("Lead promoted to customer!");
  };


  const renderSubmitButton = (text: string, onClick: () => void) => (
    <Button onClick={onClick} size="sm" disabled={isUpdating}>
      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  )

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {localLead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl">{localLead.name}</SheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={stageColors[localLead.stage]}>{localLead.stage}</Badge>
                  <Badge
                    variant="outline"
                    className={
                      localLead.leadScore >= 70
                        ? "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400"
                        : localLead.leadScore >= 40
                          ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                          : "border-gray-500/20 bg-gray-500/10 text-gray-700 dark:text-gray-400"
                    }
                  >
                    Score: {localLead.leadScore}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                ${localLead.leadValue.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Lead Value</div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View Conversation
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {localLead.phone}
              </div>
              {localLead.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {localLead.email}
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                Source: <Badge variant="outline">{localLead.source}</Badge>
              </div>
              {localLead.utm && (
                <div className="text-xs text-muted-foreground pl-6">
                  Campaign: {localLead.utm.campaign} | Source: {localLead.utm.source} | Medium:{" "}
                  {localLead.utm.medium}
                </div>
              )}
            </div>
          </div>

          {/* Assignment */}
          <div className="space-y-3">
            <Label>Assigned Agent</Label>
            <Select
              value={localLead.assignedAgentId || "unassigned"}
              onValueChange={handleAgentChange}
              disabled={isUpdating}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {mockAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stage */}
          <div className="space-y-3">
            <Label>Lead Stage</Label>
            <Select value={localLead.stage} onValueChange={handleStageChange} disabled={isUpdating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Follow Up">Follow Up</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          {localLead.tags.length > 0 && (
            <div className="space-y-3">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {localLead.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1">
                Timeline
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">
                Notes
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex-1">
                Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Lead Score</div>
                  <div className="text-2xl font-semibold">{localLead.leadScore}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Based on engagement and profile
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Lead Value</div>
                  <div className="text-2xl font-semibold">
                    ${localLead.leadValue.toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Created</div>
                <div className="font-medium">
                  {format(new Date(localLead.createdAt), "PPP")}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-3 mt-4">
              {localLead.timeline.map((event) => (
                <div key={event.id} className="flex gap-3 pb-3 border-b last:border-0">
                  <div className="bg-primary/10 rounded-full p-2 h-fit">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{event.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(event.createdAt), "PPp")}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                  disabled={isUpdating}
                />
                {renderSubmitButton("Add Note", handleAddNote)}
              </div>
              <div className="space-y-3">
                {localLead.notes.map((note) => (
                  <div key={note.id} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {note.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{note.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(note.createdAt), "PPp")}
                      </span>
                    </div>
                    <p className="text-sm">{note.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  placeholder="Task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  disabled={isUpdating}
                />
                 {renderSubmitButton("Add Task", handleAddTask)}
              </div>
              <div className="space-y-2">
                {localLead.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {format(new Date(task.dueDate), "PPP")}
                      </p>
                    </div>
                    <Badge
                      variant={task.status === "completed" ? "default" : "secondary"}
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t">
            <Button onClick={handlePromoteToCustomer} className="w-full" disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Promote to Customer
            </Button>
            <Button variant="outline" className="w-full">
              Create Order
            </Button>
            <Button variant="outline" className="w-full">
              Start Workflow
              {/* Placeholder: Would open workflow selection */}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
