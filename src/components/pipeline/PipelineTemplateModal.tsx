import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pipelineTemplates, PipelineTemplate } from "@/lib/mockPipeline";
import { Check } from "lucide-react";

interface PipelineTemplateModalProps {
  open: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PipelineTemplate) => void;
}

export function PipelineTemplateModal({
  open,
  onClose,
  onSelectTemplate,
}: PipelineTemplateModalProps) {
  const handleSelect = (template: PipelineTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  const categoryColors: Record<string, string> = {
    B2B: "bg-blue-100 text-blue-700",
    B2C: "bg-green-100 text-green-700",
    SaaS: "bg-purple-100 text-purple-700",
    "E-commerce": "bg-orange-100 text-orange-700",
    Agency: "bg-pink-100 text-pink-700",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Pipeline Template</DialogTitle>
          <DialogDescription>
            Start with a pre-built pipeline designed for your industry or use case
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {pipelineTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
              onClick={() => handleSelect(template)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className={categoryColors[template.category]} variant="secondary">
                      {template.category}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost">
                    Use Template
                  </Button>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    {template.stages.length} Stages
                  </div>
                  <div className="space-y-1">
                    {template.stages.map((stage, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="text-muted-foreground">{stage.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {stage.probability}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
