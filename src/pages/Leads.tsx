import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilterBar } from "@/components/leads/FilterBar";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { LeadDrawer } from "@/components/leads/LeadDrawer";
import { AddLeadModal } from "@/components/leads/AddLeadModal";
import { BulkActionModal } from "@/components/leads/BulkActionModal";
import { mockLeads, mockAgents, Lead } from "@/lib/mockLeads";
import { Plus, Download, Upload, LayoutGrid, LayoutList } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [bulkActionModal, setBulkActionModal] = useState<{
    open: boolean;
    type: "assign" | "stage" | "delete" | null;
  }>({ open: false, type: null });

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSource = selectedSource === "all" || lead.source === selectedSource;
      const matchesStage = selectedStage === "all" || lead.stage === selectedStage;
      const matchesAgent =
        selectedAgent === "all" ||
        (selectedAgent === "unassigned" && !lead.assignedAgentId) ||
        lead.assignedAgentId === selectedAgent;

      return matchesSearch && matchesSource && matchesStage && matchesAgent;
    });
  }, [leads, searchTerm, selectedSource, selectedStage, selectedAgent]);

  const activeFilterCount = [
    searchTerm ? 1 : 0,
    selectedSource !== "all" ? 1 : 0,
    selectedStage !== "all" ? 1 : 0,
    selectedAgent !== "all" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSource("all");
    setSelectedStage("all");
    setSelectedAgent("all");
    setSelectedTags([]);
  };

  const handleSelectLead = (id: string) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedLeads(checked ? filteredLeads.map((l) => l.id) : []);
  };

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

  const handleBulkAction = (data: { agentId?: string; stage?: Lead["stage"] }) => {
    if (bulkActionModal.type === "assign" && data.agentId) {
      setLeads((prev) =>
        prev.map((l) =>
          selectedLeads.includes(l.id) ? { ...l, assignedAgentId: data.agentId } : l
        )
      );
      toast.success(`${selectedLeads.length} lead(s) assigned`);
    } else if (bulkActionModal.type === "stage" && data.stage) {
      setLeads((prev) =>
        prev.map((l) =>
          selectedLeads.includes(l.id) ? { ...l, stage: data.stage! } : l
        )
      );
      toast.success(`${selectedLeads.length} lead(s) updated`);
    } else if (bulkActionModal.type === "delete") {
      setLeads((prev) => prev.filter((l) => !selectedLeads.includes(l.id)));
      toast.success(`${selectedLeads.length} lead(s) deleted`);
    }
    setSelectedLeads([]);
  };

  // Stats
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      total: leads.length,
      newToday: leads.filter(
        (l) => new Date(l.createdAt).toDateString() === today
      ).length,
      hot: leads.filter((l) => l.leadScore >= 70).length,
      conversion: Math.round(
        (leads.filter((l) => l.stage === "Closed Won").length / leads.length) * 100
      ),
    };
  }, [leads]);

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Leads</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your sales leads
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/leads/kanban")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Leads</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.newToday}</div>
            <div className="text-xs text-muted-foreground">New Today</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.hot}</div>
            <div className="text-xs text-muted-foreground">Hot Leads</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.conversion}%</div>
            <div className="text-xs text-muted-foreground">Conversion Rate</div>
          </Card>
        </div>

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          agents={mockAgents}
          onClearFilters={handleClearFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* Bulk Actions */}
        {selectedLeads.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <span className="text-sm font-medium">
              {selectedLeads.length} lead(s) selected
            </span>
            <div className="flex gap-2 ml-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setBulkActionModal({ open: true, type: "assign" })}
              >
                Assign Agent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setBulkActionModal({ open: true, type: "stage" })}
              >
                Change Stage
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setBulkActionModal({ open: true, type: "delete" })}
              >
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <LeadsTable
          leads={filteredLeads}
          selectedLeads={selectedLeads}
          onSelectLead={handleSelectLead}
          onSelectAll={handleSelectAll}
          onViewLead={handleViewLead}
          onDeleteLead={handleDeleteLead}
        />

        {/* Pagination (Mock) */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
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
      <BulkActionModal
        open={bulkActionModal.open}
        onClose={() => setBulkActionModal({ open: false, type: null })}
        selectedCount={selectedLeads.length}
        actionType={bulkActionModal.type}
        onConfirm={handleBulkAction}
      />
    </div>
  );
}
