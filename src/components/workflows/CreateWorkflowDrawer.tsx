import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { mockTriggerTypes } from "@/lib/mockData";
import { Plus, Trash2 } from "lucide-react";

interface CreateWorkflowDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow?: any;
  onSave: (workflowData: any) => void;
}

export function CreateWorkflowDrawer({
  open,
  onOpenChange,
  workflow,
  onSave,
}: CreateWorkflowDrawerProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active" as const,
    category: "Lead Generation",
    trigger: "",
    triggerType: "",
    steps: 0,
  });
  const [workflowSteps, setWorkflowSteps] = useState<any[]>([]);

  useEffect(() => {
    if (workflow) {
      setFormData({
        name: workflow.name || "",
        description: workflow.description || "",
        status: workflow.status || "Active",
        category: workflow.category || "Lead Generation",
        trigger: workflow.trigger || "",
        triggerType: workflow.triggerType || "",
        steps: workflow.steps || 0,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "Active" as const,
        category: "Lead Generation",
        trigger: "",
        triggerType: "",
        steps: 0,
      });
      setWorkflowSteps([]);
      setStep(1);
    }
  }, [workflow, open]);

  const handleSelectTrigger = (triggerType: string, triggerName: string) => {
    setFormData((prev) => ({
      ...prev,
      triggerType,
      trigger: triggerName,
    }));
    setStep(3);
  };

  const handleAddStep = () => {
    setWorkflowSteps([
      ...workflowSteps,
      { id: `st_${workflowSteps.length + 1}`, type: "sendMessage", content: "" },
    ]);
  };

  const handleRemoveStep = (index: number) => {
    setWorkflowSteps(workflowSteps.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      ...formData,
      steps: workflowSteps.length,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workflow Name</Label>
              <Input
                id="name"
                placeholder="e.g., New Lead Welcome Flow"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this workflow does..."
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                  <SelectItem value="Customer Support">Customer Support</SelectItem>
                  <SelectItem value="Order Automation">Order Automation</SelectItem>
                  <SelectItem value="Marketing Automation">
                    Marketing Automation
                  </SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground mb-4">Select Trigger</h3>
            {mockTriggerTypes.map((group) => (
              <div key={group.category}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {group.category}
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {group.triggers.map((trigger) => (
                    <Card
                      key={trigger.id}
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() =>
                        handleSelectTrigger(
                          trigger.id,
                          `${group.category}: ${trigger.name}`
                        )
                      }
                    >
                      <div className="text-2xl mb-2">{trigger.icon}</div>
                      <div className="text-sm font-medium text-foreground">
                        {trigger.name}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Workflow Steps</h3>
              <Button onClick={handleAddStep} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Step
              </Button>
            </div>

            {workflowSteps.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  No steps added yet. Click "Add Step" to start building your workflow.
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {workflowSteps.map((step, index) => (
                  <Card key={step.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          Step {index + 1}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStep(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <Select defaultValue="sendMessage">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendMessage">Send Message</SelectItem>
                        <SelectItem value="addTag">Add Tag</SelectItem>
                        <SelectItem value="removeTag">Remove Tag</SelectItem>
                        <SelectItem value="assignTeam">Assign to Team</SelectItem>
                        <SelectItem value="delay">Delay</SelectItem>
                        <SelectItem value="condition">If/Else Condition</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {workflow ? "Edit Workflow" : "Create New Workflow"}
          </SheetTitle>
          <SheetDescription>
            Step {step} of 3:{" "}
            {step === 1 && "Workflow Details"}
            {step === 2 && "Select Trigger"}
            {step === 3 && "Build Steps"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="pr-4">{renderStep()}</div>
        </ScrollArea>

        <div className="flex gap-2 mt-6 pt-4 border-t">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="flex-1"
              disabled={step === 1 && !formData.name}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="flex-1"
              disabled={!formData.name || !formData.trigger}
            >
              {workflow ? "Update Workflow" : "Create Workflow"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
