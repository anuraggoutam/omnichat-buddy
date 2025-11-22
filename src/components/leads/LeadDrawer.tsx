import { useState } from "react";
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
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface LeadDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onUpdateLead: (lead: Lead) => void;
}

const stageColors = {
  "New": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "Contacted": "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
  "Qualified": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Follow Up": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  "Closed Won": "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/20",
  "Closed Lost": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
};

export function LeadDrawer({ lead, open, onClose, onUpdateLead }: LeadDrawerProps) {
  const [newNote, setNewNote] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  if (!lead) return null;

  const agent = mockAgents.find((a) => a.id === lead.assignedAgentId);

  const handleStageChange = (newStage: Lead["stage"]) => {
    onUpdateLead({ ...lead, stage: newStage });
    toast.success(`Lead stage changed to ${newStage}`);
  };

  const handleAgentChange = (agentId: string) => {
    onUpdateLead({ ...lead, assignedAgentId: agentId });
    toast.success("Lead assigned successfully");
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const updatedLead = {
      ...lead,
      notes: [
        ...lead.notes,
        {
          id: `note_${Date.now()}`,
          author: "Current User",
          text: newNote,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    onUpdateLead(updatedLead);
    setNewNote("");
    toast.success("Note added");
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const updatedLead = {
      ...lead,
      tasks: [
        ...lead.tasks,
        {
          id: `task_${Date.now()}`,
          title: newTaskTitle,
          status: "pending" as const,
          assignedTo: lead.assignedAgentId || mockAgents[0].id,
          dueDate: new Date(Date.now() + 86400000).toISOString(),
        },
      ],
    };
    onUpdateLead(updatedLead);
    setNewTaskTitle("");
    toast.success("Task created");
  };

  const handlePromoteToCustomer = () => {
    handleStageChange("Closed Won");
    toast.success("Lead promoted to customer!");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {lead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl">{lead.name}</SheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={stageColors[lead.stage]}>{lead.stage}</Badge>
                  <Badge
                    variant="outline"
                    className={
                      lead.leadScore >= 70
                        ? "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400"
                        : lead.leadScore >= 40
                          ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                          : "border-gray-500/20 bg-gray-500/10 text-gray-700 dark:text-gray-400"
                    }
                  >
                    Score: {lead.leadScore}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                ${lead.leadValue.toLocaleString()}
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
                {lead.phone}
              </div>
              {lead.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {lead.email}
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                Source: <Badge variant="outline">{lead.source}</Badge>
              </div>
              {lead.utm && (
                <div className="text-xs text-muted-foreground pl-6">
                  Campaign: {lead.utm.campaign} | Source: {lead.utm.source} | Medium:{" "}
                  {lead.utm.medium}
                </div>
              )}
            </div>
          </div>

          {/* Assignment */}
          <div className="space-y-3">
            <Label>Assigned Agent</Label>
            <Select
              value={lead.assignedAgentId || "unassigned"}
              onValueChange={handleAgentChange}
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
            <Select value={lead.stage} onValueChange={handleStageChange}>
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
          {lead.tags.length > 0 && (
            <div className="space-y-3">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag) => (
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
                  <div className="text-2xl font-semibold">{lead.leadScore}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Based on engagement and profile
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Lead Value</div>
                  <div className="text-2xl font-semibold">
                    ${lead.leadValue.toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Created</div>
                <div className="font-medium">
                  {format(new Date(lead.createdAt), "PPP")}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-3 mt-4">
              {lead.timeline.map((event) => (
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
                />
                <Button onClick={handleAddNote} size="sm">
                  Add Note
                </Button>
              </div>
              <div className="space-y-3">
                {lead.notes.map((note) => (
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
                />
                <Button onClick={handleAddTask} size="sm">
                  Add Task
                </Button>
              </div>
              <div className="space-y-2">
                {lead.tasks.map((task) => (
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
            <Button onClick={handlePromoteToCustomer} className="w-full">
              Promote to Customer
            </Button>
            <Button variant="outline" className="w-full">
              Create Order
            </Button>
            <Button variant="outline" className="w-full">
              Start Workflow
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
