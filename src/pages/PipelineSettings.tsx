import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PipelineStageRow } from "@/components/pipeline/PipelineStageRow";
import { AddStageModal } from "@/components/pipeline/AddStageModal";
import { DeleteConfirmModal } from "@/components/pipeline/DeleteConfirmModal";
import { StagePreview } from "@/components/pipeline/StagePreview";
import { defaultPipeline, Pipeline, PipelineStage } from "@/lib/mockPipeline";
import { Plus, RotateCcw, GripVertical } from "lucide-react";
import { toast } from "sonner";

export default function PipelineSettings() {
  const [pipeline, setPipeline] = useState<Pipeline>(defaultPipeline);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<PipelineStage | null>(null);
  const [deleteStage, setDeleteStage] = useState<PipelineStage | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleAddStage = (stage: Omit<PipelineStage, "id">) => {
    const newStage: PipelineStage = {
      ...stage,
      id: `stage_${Date.now()}`
    };
    setPipeline({
      ...pipeline,
      stages: [...pipeline.stages, newStage]
    });
    toast.success("Stage added successfully");
    setAddModalOpen(false);
  };

  const handleUpdateStage = (updatedStage: PipelineStage) => {
    setPipeline({
      ...pipeline,
      stages: pipeline.stages.map((s) => (s.id === updatedStage.id ? updatedStage : s))
    });
    toast.success("Stage updated successfully");
    setEditingStage(null);
  };

  const handleDeleteStage = (stageId: string) => {
    setPipeline({
      ...pipeline,
      stages: pipeline.stages.filter((s) => s.id !== stageId)
    });
    toast.success("Stage deleted successfully");
    setDeleteStage(null);
  };

  const handleDuplicateStage = (stage: PipelineStage) => {
    const newStage: PipelineStage = {
      ...stage,
      id: `stage_${Date.now()}`,
      name: `${stage.name} (Copy)`
    };
    setPipeline({
      ...pipeline,
      stages: [...pipeline.stages, newStage]
    });
    toast.success("Stage duplicated successfully");
  };

  const handleResetToDefault = () => {
    setPipeline(defaultPipeline);
    toast.success("Pipeline reset to default");
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newStages = [...pipeline.stages];
      const [draggedStage] = newStages.splice(draggedIndex, 1);
      newStages.splice(dragOverIndex, 0, draggedStage);
      setPipeline({ ...pipeline, stages: newStages });
      toast.success("Stage order updated");
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const leadsCount = 234; // Mock count

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>Settings</span>
            <span>/</span>
            <span>CRM</span>
            <span>/</span>
            <span className="text-foreground">Pipeline</span>
          </div>
          <h1 className="text-3xl font-bold">Pipeline Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize the sales stages used across your CRM and lead management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleResetToDefault}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </div>
      </div>

      {/* Pipeline Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle>{pipeline.name}</CardTitle>
              <CardDescription>{pipeline.description}</CardDescription>
            </div>
            <Button variant="outline" size="sm" disabled>
              Add Pipeline (Coming Soon)
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold">{pipeline.stages.length}</div>
              <div className="text-xs text-muted-foreground">Total Stages</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{leadsCount}</div>
              <div className="text-xs text-muted-foreground">Leads in Pipeline</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {pipeline.stages.filter((s) => s.type === "Open").length}
              </div>
              <div className="text-xs text-muted-foreground">Open Stages</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Stages List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Stages</CardTitle>
              <CardDescription>
                Drag to reorder, click to edit. Changes are saved automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pipeline.stages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    No stages yet. Add your first stage to get started.
                  </div>
                  <Button onClick={() => setAddModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Stage
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {pipeline.stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`transition-all ${
                        draggedIndex === index ? "opacity-50" : ""
                      } ${
                        dragOverIndex === index && draggedIndex !== index
                          ? "border-t-2 border-primary"
                          : ""
                      }`}
                    >
                      <PipelineStageRow
                        stage={stage}
                        onEdit={() => setEditingStage(stage)}
                        onDelete={() => setDeleteStage(stage)}
                        onDuplicate={() => handleDuplicateStage(stage)}
                        onUpdate={handleUpdateStage}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Preview */}
        <div className="lg:col-span-1">
          <StagePreview stages={pipeline.stages} />
        </div>
      </div>

      {/* Modals */}
      <AddStageModal
        open={addModalOpen || editingStage !== null}
        onClose={() => {
          setAddModalOpen(false);
          setEditingStage(null);
        }}
        onSave={editingStage ? handleUpdateStage : handleAddStage}
        editStage={editingStage}
      />

      <DeleteConfirmModal
        open={deleteStage !== null}
        onClose={() => setDeleteStage(null)}
        onConfirm={() => deleteStage && handleDeleteStage(deleteStage.id)}
        stageName={deleteStage?.name || ""}
      />
    </div>
  );
}
