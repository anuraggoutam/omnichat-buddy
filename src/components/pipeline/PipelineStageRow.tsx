import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PipelineStage, colorPresets } from "@/lib/mockPipeline";
import { GripVertical, Edit, Copy, Trash2, MoreVertical } from "lucide-react";

interface PipelineStageRowProps {
  stage: PipelineStage;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onUpdate: (stage: PipelineStage) => void;
}

export function PipelineStageRow({
  stage,
  onEdit,
  onDelete,
  onDuplicate,
  onUpdate,
}: PipelineStageRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(stage.name);

  const handleNameSave = () => {
    if (editedName.trim() && editedName !== stage.name) {
      onUpdate({ ...stage, name: editedName });
    }
    setIsEditing(false);
  };

  const handleColorChange = (color: string) => {
    onUpdate({ ...stage, color });
  };

  const handleProbabilityChange = (value: number[]) => {
    onUpdate({ ...stage, probability: value[0] });
  };

  const handleTypeChange = (type: PipelineStage["type"]) => {
    onUpdate({ ...stage, type });
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-card border rounded-lg hover:shadow-md transition-shadow group">
      {/* Drag Handle */}
      <div className="cursor-move text-muted-foreground hover:text-foreground">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Stage Color */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
            style={{ backgroundColor: stage.color }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="grid grid-cols-5 gap-2 p-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.value}
                className="w-8 h-8 rounded border-2 hover:scale-110 transition-transform"
                style={{
                  backgroundColor: preset.value,
                  borderColor: stage.color === preset.value ? "#000" : "transparent",
                }}
                onClick={() => handleColorChange(preset.value)}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Stage Name */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleNameSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNameSave();
              if (e.key === "Escape") {
                setEditedName(stage.name);
                setIsEditing(false);
              }
            }}
            autoFocus
            className="h-8"
          />
        ) : (
          <div
            className="font-medium cursor-pointer hover:text-primary truncate"
            onClick={() => setIsEditing(true)}
          >
            {stage.name}
          </div>
        )}
      </div>

      {/* Probability */}
      <div className="w-32 hidden md:flex items-center gap-2">
        <Slider
          value={[stage.probability]}
          onValueChange={handleProbabilityChange}
          max={100}
          step={5}
          className="flex-1"
        />
        <Badge variant="secondary" className="w-12 justify-center">
          {stage.probability}%
        </Badge>
      </div>

      {/* Stage Type */}
      <Select value={stage.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-32 hidden lg:flex">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="Closed Won">Closed Won</SelectItem>
          <SelectItem value="Closed Lost">Closed Lost</SelectItem>
        </SelectContent>
      </Select>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDuplicate}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
