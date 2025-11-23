import { useState, useMemo, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilterBar } from "@/components/leads/FilterBar";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { LeadDrawer } from "@/components/leads/LeadDrawer";
import { AddLeadModal } from "@/components/leads/AddLeadModal";
import { BulkActionModal } from "@/components/leads/BulkActionModal";
import { leadsApi } from "@/lib/api";
import { Lead, mockAgents } from "@/lib/mockLeads"; // Keep mockAgents for now
import { Plus, Download, Upload, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 10;

export default function Leads() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const importFileRef = useRef<HTMLInputElement>(null);

  // State for UI controls
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [bulkActionModal, setBulkActionModal] = useState<{
    open: boolean;
    type: "assign" | "stage" | "delete" | null;
  }>({ open: false, type: null });

  // Filters
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Derived state for filters
  const filters = useMemo(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      searchTerm,
      source: selectedSource === "all" ? undefined : selectedSource,
      stage: selectedStage === "all" ? undefined : selectedStage,
      agentId: selectedAgent === "all" ? undefined : selectedAgent,
    }),
    [page, searchTerm, selectedSource, selectedStage, selectedAgent]
  );

  // Data Fetching using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["leads", filters],
    queryFn: () => leadsApi.getLeads(filters),
    keepPreviousData: true,
  });

  const { leads = [], totalCount = 0 } = data || {};

  // Mutations
  const addLeadMutation = useMutation({
    mutationFn: leadsApi.addLead,
    onSuccess: () => {
      toast.success("Lead added successfully!");
      setAddModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to add lead.");
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: ({ leadId, data }: { leadId: string; data: Partial<Lead> }) =>
      leadsApi.updateLead(leadId, data),
    onSuccess: (updatedLead) => {
      toast.success("Lead updated successfully!");
      setSelectedLead(updatedLead);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update lead.");
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: leadsApi.deleteLead,
    onSuccess: (_, leadId) => {
      toast.success("Lead deleted");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete lead.");
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: ({
      leadIds,
      action,
    }: {
      leadIds: string[];
      action: { type: "assign" | "stage" | "delete"; payload: any };
    }) => leadsApi.bulkUpdateLeads(leadIds, action),
    onSuccess: () => {
      toast.success("Bulk action successful!");
      setSelectedLeads([]);
      setBulkActionModal({ open: false, type: null });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Bulk action failed.");
    },
  });

  // Event Handlers
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSource("all");
    setSelectedStage("all");
    setSelectedAgent("all");
    setSelectedTags([]);
    setPage(1);
  };

  const handleSelectLead = (id: string) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedLeads(checked ? leads.map((l) => l.id) : []);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const handleBulkAction = (data: { agentId?: string; stage?: Lead["stage"] }) => {
    if (!bulkActionModal.type) return;
    
    let payload = {};
    if(bulkActionModal.type === 'assign' && data.agentId) payload = { agentId: data.agentId };
    if(bulkActionModal.type === 'stage' && data.stage) payload = { stage: data.stage };

    bulkUpdateMutation.mutate({
      leadIds: selectedLeads,
      action: { type: bulkActionModal.type, payload },
    });
  };

  const handleImportClick = () => {
    importFileRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.info(`Selected file: ${file.name}. Import processing would start here.`);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleExport = () => {
    toast.info("Export started! A CSV file would be generated and downloaded.");
  };
  
  // UI Stats (should also come from API in a real app)
  const stats = useMemo(() => {
    return {
      total: totalCount,
      // The rest are just placeholders now as they were based on all mock data
      newToday: "N/A",
      hot: "N/A",
      conversion: "N/A",
    };
  }, [totalCount]);

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Error loading leads: {error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
       <input
        type="file"
        ref={importFileRef}
        className="hidden"
        accept=".csv"
        onChange={handleFileSelected}
      />
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
            <Button variant="outline" size="sm" onClick={handleImportClick}>
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
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
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-1/2" /> : stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Leads</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{isLoading ? <Skeleton className="h-8 w-1/2" /> : stats.newToday}</div>
            <div className="text-xs text-muted-foreground">New Today</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-orange-600">{isLoading ? <Skeleton className="h-8 w-1/2" /> : stats.hot}</div>
            <div className="text-xs text-muted-foreground">Hot Leads</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">{isLoading ? <Skeleton className="h-8 w-1/2" /> : `${stats.conversion}%`}</div>
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
          activeFilterCount={Object.values(filters).filter(v => v !== undefined && v !== PAGE_SIZE && v !== 1).length - 1}
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
                disabled={bulkUpdateMutation.isLoading}
              >
                Assign Agent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setBulkActionModal({ open: true, type: "stage" })}
                 disabled={bulkUpdateMutation.isLoading}
              >
                Change Stage
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setBulkActionModal({ open: true, type: "delete" })}
                 disabled={bulkUpdateMutation.isLoading}
              >
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}
        {!isLoading && !isError && (
            <LeadsTable
                leads={leads}
                selectedLeads={selectedLeads}
                onSelectLead={handleSelectLead}
                onSelectAll={handleSelectAll}
                onViewLead={handleViewLead}
                onDeleteLead={(id) => deleteLeadMutation.mutate(id)}
            />
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {leads.length} of {totalCount} leads
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page * PAGE_SIZE >= totalCount}
            >
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
        onUpdateLead={(data) => updateLeadMutation.mutate({ leadId: selectedLead!.id, data })}
        isUpdating={updateLeadMutation.isLoading}
      />
      <AddLeadModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddLead={(data) => addLeadMutation.mutate(data as any)}
        isAdding={addLeadMutation.isLoading}
      />
      <BulkActionModal
        open={bulkActionModal.open}
        onClose={() => setBulkActionModal({ open: false, type: null })}
        selectedCount={selectedLeads.length}
        actionType={bulkActionModal.type}
        onConfirm={handleBulkAction}
        isLoading={bulkUpdateMutation.isLoading}
      />
    </div>
  );
}
