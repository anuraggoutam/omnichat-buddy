import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Upload, Workflow } from "lucide-react";
import { mockWorkflows } from "@/lib/mockData";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import { CreateWorkflowDrawer } from "@/components/workflows/CreateWorkflowDrawer";
import { WorkflowDetailDrawer } from "@/components/workflows/WorkflowDetailDrawer";

export default function Workflows() {
  const [workflows, setWorkflows] = useState(mockWorkflows);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("lastUpdated");

  const filteredWorkflows = workflows
    .filter((workflow) => {
      const matchesSearch =
        workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || workflow.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "runs") return b.totalRuns - a.totalRuns;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const handleCreateWorkflow = () => {
    setSelectedWorkflow(null);
    setIsCreateDrawerOpen(true);
  };

  const handleEditWorkflow = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setIsCreateDrawerOpen(true);
  };

  const handleViewWorkflow = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setIsDetailDrawerOpen(true);
  };

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter((w) => w.id !== id));
  };

  const handleDuplicateWorkflow = (workflow: any) => {
    const newWorkflow = {
      ...workflow,
      id: `wf_${String(workflows.length + 1).padStart(2, "0")}`,
      name: `${workflow.name} (Copy)`,
      status: "Paused" as const,
      totalRuns: 0,
      lastRun: "Never",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setWorkflows([newWorkflow, ...workflows]);
  };

  const handleToggleStatus = (id: string) => {
    setWorkflows(
      workflows.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "Active" ? ("Paused" as const) : ("Active" as const) }
          : w
      )
    );
  };

  const handleSaveWorkflow = (workflowData: any) => {
    if (selectedWorkflow) {
      // Update existing
      setWorkflows(
        workflows.map((w) =>
          w.id === selectedWorkflow.id
            ? {
                ...w,
                ...workflowData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : w
        )
      );
    } else {
      // Create new
      const newWorkflow = {
        ...workflowData,
        id: `wf_${String(workflows.length + 1).padStart(2, "0")}`,
        totalRuns: 0,
        lastRun: "Never",
        successRate: "0%",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        createdBy: "You",
      };
      setWorkflows([newWorkflow, ...workflows]);
    }
    setIsCreateDrawerOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Workflows</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Build automation flows for WhatsApp, Instagram, orders, and more
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import Workflow
            </Button>
            <Button onClick={handleCreateWorkflow} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Workflow
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastUpdated">Last Updated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="runs">Total Runs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {filteredWorkflows.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Workflow className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                No workflows yet
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                {searchQuery || statusFilter !== "All"
                  ? "Try adjusting your filters"
                  : "Automate your business in minutes — create your first workflow"}
              </p>
              {!searchQuery && statusFilter === "All" && (
                <Button onClick={handleCreateWorkflow} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Workflow
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkflows.map((workflow) => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onEdit={handleEditWorkflow}
                  onView={handleViewWorkflow}
                  onDelete={handleDeleteWorkflow}
                  onDuplicate={handleDuplicateWorkflow}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Drawers */}
      <CreateWorkflowDrawer
        open={isCreateDrawerOpen}
        onOpenChange={setIsCreateDrawerOpen}
        workflow={selectedWorkflow}
        onSave={handleSaveWorkflow}
      />

      <WorkflowDetailDrawer
        workflow={selectedWorkflow}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />
    </div>
  );
}
