import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lead, mockAgents } from "@/lib/mockLeads";
import { useState } from "react";
import { toast } from "sonner";

interface BulkActionModalProps {
  open: boolean;
  onClose: () => void;
  selectedCount: number;
  actionType: "assign" | "stage" | "delete" | null;
  onConfirm: (data: { agentId?: string; stage?: Lead["stage"] }) => void;
}

export function BulkActionModal({
  open,
  onClose,
  selectedCount,
  actionType,
  onConfirm,
}: BulkActionModalProps) {
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedStage, setSelectedStage] = useState<Lead["stage"]>("New");

  const handleConfirm = () => {
    if (actionType === "assign") {
      if (!selectedAgent) {
        toast.error("Please select an agent");
        return;
      }
      onConfirm({ agentId: selectedAgent });
    } else if (actionType === "stage") {
      onConfirm({ stage: selectedStage });
    } else if (actionType === "delete") {
      onConfirm({});
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "assign" && `Assign ${selectedCount} Lead(s)`}
            {actionType === "stage" && `Change Stage for ${selectedCount} Lead(s)`}
            {actionType === "delete" && `Delete ${selectedCount} Lead(s)`}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {actionType === "assign" && (
            <div className="space-y-2">
              <Label>Select Agent</Label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an agent..." />
                </SelectTrigger>
                <SelectContent>
                  {mockAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {actionType === "stage" && (
            <div className="space-y-2">
              <Label>Select Stage</Label>
              <Select value={selectedStage} onValueChange={(v) => setSelectedStage(v as Lead["stage"])}>
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
          )}

          {actionType === "delete" && (
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete {selectedCount} lead(s)? This action cannot
              be undone.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant={actionType === "delete" ? "destructive" : "default"}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
