import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeadCard } from "@/components/leads/LeadCard";
import { LeadDrawer } from "@/components/leads/LeadDrawer";
import { AddLeadModal } from "@/components/leads/AddLeadModal";
import { mockLeads, Lead } from "@/lib/mockLeads";
import { Plus, LayoutList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const stages: Lead["stage"][] = [
  "New",
  "Contacted",
  "Qualified",
  "Follow Up",
  "Closed Won",
  "Closed Lost",
];

const stageColors = {
  "New": "bg-blue-500",
  "Contacted": "bg-teal-500",
  "Qualified": "bg-green-500",
  "Follow Up": "bg-yellow-500",
  "Closed Won": "bg-emerald-600",
  "Closed Lost": "bg-gray-500",
};

export default function LeadsKanban() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
    setSelectedLead(updatedLead);
  };

  const handleAddLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success("Lead deleted");
  };

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stage: Lead["stage"]) => {
    if (!draggedLead) return;

    const updatedLead = { ...draggedLead, stage };
    setLeads((prev) =>
      prev.map((l) => (l.id === draggedLead.id ? updatedLead : l))
    );
    setDraggedLead(null);
    toast.success(`Lead moved to ${stage}`);
  };

  const getLeadsByStage = (stage: Lead["stage"]) => {
    return leads.filter((l) => l.stage === stage);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Leads - Kanban View</h1>
            <p className="text-muted-foreground mt-1">
              Drag and drop leads to change their stage
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/leads")}
            >
              <LayoutList className="h-4 w-4 mr-2" />
              List View
            </Button>
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage);
            return (
              <div
                key={stage}
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage)}
              >
                <Card className="h-full flex flex-col">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${stageColors[stage]}`} />
                        <h3 className="font-semibold">{stage}</h3>
                      </div>
                      <Badge variant="secondary">{stageLeads.length}</Badge>
                    </div>
                  </div>

                  <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-300px)]">
                    {stageLeads.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        <p>No leads in this stage</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => setAddModalOpen(true)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Lead
                        </Button>
                      </div>
                    ) : (
                      stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={() => handleDragStart(lead)}
                          className="cursor-move"
                        >
                          <LeadCard
                            lead={lead}
                            onViewLead={handleViewLead}
                            onDeleteLead={handleDeleteLead}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals & Drawers */}
      <LeadDrawer
        lead={selectedLead}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onUpdateLead={handleUpdateLead}
      />
      <AddLeadModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddLead={handleAddLead}
      />
    </div>
  );
}
