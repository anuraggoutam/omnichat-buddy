import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PipelineStage, colorPresets } from "@/lib/mockPipeline";

interface AddStageModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (stage: PipelineStage | Omit<PipelineStage, "id">) => void;
  editStage?: PipelineStage | null;
}

export function AddStageModal({ open, onClose, onSave, editStage }: AddStageModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(colorPresets[0].value);
  const [probability, setProbability] = useState(50);
  const [type, setType] = useState<PipelineStage["type"]>("Open");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editStage) {
      setName(editStage.name);
      setColor(editStage.color);
      setProbability(editStage.probability);
      setType(editStage.type);
      setDescription(editStage.description || "");
    } else {
      setName("");
      setColor(colorPresets[0].value);
      setProbability(50);
      setType("Open");
      setDescription("");
    }
  }, [editStage, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const stageData = {
      name,
      color,
      probability,
      type,
      description: description || undefined,
    };

    if (editStage) {
      onSave({ ...editStage, ...stageData });
    } else {
      onSave(stageData);
    }

    handleClose();
  };

  const handleClose = () => {
    setName("");
    setColor(colorPresets[0].value);
    setProbability(50);
    setType("Open");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editStage ? "Edit Stage" : "Add New Stage"}</DialogTitle>
            <DialogDescription>
              {editStage
                ? "Update the stage details below."
                : "Create a new stage for your pipeline."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Stage Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Stage Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Proposal Sent"
                required
              />
            </div>

            {/* Stage Color */}
            <div className="space-y-2">
              <Label>Stage Color</Label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className="w-full aspect-square rounded border-2 hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: preset.value,
                      borderColor: color === preset.value ? "#000" : "transparent",
                    }}
                    onClick={() => setColor(preset.value)}
                  />
                ))}
              </div>
            </div>

            {/* Probability */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="probability">Win Probability</Label>
                <span className="text-sm text-muted-foreground">{probability}%</span>
              </div>
              <Slider
                id="probability"
                value={[probability]}
                onValueChange={(value) => setProbability(value[0])}
                max={100}
                step={5}
              />
              <p className="text-xs text-muted-foreground">
                Used for pipeline forecasting and reporting
              </p>
            </div>

            {/* Stage Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Stage Type</Label>
              <Select value={type} onValueChange={(value: any) => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed Won">Closed Won</SelectItem>
                  <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this stage..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">{editStage ? "Update Stage" : "Add Stage"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
