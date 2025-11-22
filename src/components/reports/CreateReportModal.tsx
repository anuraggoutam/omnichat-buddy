import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Users,
  Filter,
  Brain,
  UsersRound,
  DollarSign,
  Megaphone,
  FileEdit,
  CheckCircle,
} from "lucide-react";
import { reportTypes, availableMetrics, availableCharts } from "@/lib/mockReports";
import { toast } from "sonner";

interface CreateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconMap: Record<string, any> = {
  MessageSquare,
  Users,
  Filter,
  Brain,
  UsersRound,
  DollarSign,
  Megaphone,
  FileEdit,
};

export function CreateReportModal({ open, onOpenChange }: CreateReportModalProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [category, setCategory] = useState("custom");

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]
    );
  };

  const handleChartToggle = (chart: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chart) ? prev.filter((c) => c !== chart) : [...prev, chart]
    );
  };

  const handleSave = () => {
    if (!reportName.trim()) {
      toast.error("Please enter a report name");
      return;
    }
    toast.success("Report created successfully!");
    onOpenChange(false);
    // Reset form
    setStep(1);
    setSelectedType("");
    setSelectedMetrics([]);
    setSelectedCharts([]);
    setReportName("");
    setReportDescription("");
    setCategory("custom");
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedType !== "";
      case 2:
        return selectedMetrics.length > 0;
      case 3:
        return selectedCharts.length > 0;
      default:
        return true;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>
            Create New Report - Step {step} of 4
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Select the type of report you want to create"}
            {step === 2 && "Choose the metrics you want to track"}
            {step === 3 && "Select how you want to visualize your data"}
            {step === 4 && "Save your report with a name and category"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {/* Step 1: Select Report Type */}
          {step === 1 && (
            <RadioGroup value={selectedType} onValueChange={setSelectedType}>
              <div className="grid grid-cols-2 gap-4">
                {reportTypes.map((type) => {
                  const Icon = iconMap[type.icon];
                  return (
                    <div
                      key={type.id}
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedType === type.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <RadioGroupItem value={type.id} className="sr-only" />
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{type.name}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          )}

          {/* Step 2: Choose Metrics */}
          {step === 2 && (
            <div className="space-y-2">
              {availableMetrics.map((metric) => (
                <div
                  key={metric}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleMetricToggle(metric)}
                >
                  <Checkbox
                    checked={selectedMetrics.includes(metric)}
                    onCheckedChange={() => handleMetricToggle(metric)}
                  />
                  <label className="flex-1 cursor-pointer">{metric}</label>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Choose Visualizations */}
          {step === 3 && (
            <div className="space-y-2">
              {availableCharts.map((chart) => (
                <div
                  key={chart.id}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleChartToggle(chart.id)}
                >
                  <Checkbox
                    checked={selectedCharts.includes(chart.id)}
                    onCheckedChange={() => handleChartToggle(chart.id)}
                  />
                  <label className="flex-1 cursor-pointer">{chart.name}</label>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Save Report */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name *</Label>
                <Input
                  id="report-name"
                  placeholder="e.g., Monthly Sales Performance"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-description">Description</Label>
                <Textarea
                  id="report-description"
                  placeholder="Brief description of what this report tracks..."
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Reports</SelectItem>
                    <SelectItem value="conversations">Conversations</SelectItem>
                    <SelectItem value="leads">Leads</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="campaigns">Campaigns</SelectItem>
                    <SelectItem value="team">Team Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Report Summary</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Type: {reportTypes.find((t) => t.id === selectedType)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Metrics: {selectedMetrics.length} selected
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Visualizations: {selectedCharts.length} selected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 1) {
                onOpenChange(false);
              } else {
                setStep(step - 1);
              }
            }}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <div className="flex gap-2">
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSave}>Create Report</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
