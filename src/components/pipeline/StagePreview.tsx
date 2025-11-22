import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PipelineStage } from "@/lib/mockPipeline";
import { ArrowRight } from "lucide-react";

interface StagePreviewProps {
  stages: PipelineStage[];
}

export function StagePreview({ stages }: StagePreviewProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Pipeline Preview</CardTitle>
        <CardDescription>Visual representation of your pipeline stages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div key={stage.id}>
              <div
                className="p-3 rounded-lg border-2 flex items-center justify-between transition-all hover:shadow-md"
                style={{ borderColor: stage.color }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: stage.color }}
                  />
                  <div className="font-medium truncate text-sm">{stage.name}</div>
                </div>
                <div className="text-xs text-muted-foreground ml-2">{stage.probability}%</div>
              </div>
              {index < stages.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {stages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No stages to preview
          </div>
        )}

        {/* Summary */}
        {stages.length > 0 && (
          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Stages</span>
              <span className="font-medium">{stages.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Open Stages</span>
              <span className="font-medium">
                {stages.filter((s) => s.type === "Open").length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Closed Stages</span>
              <span className="font-medium">
                {stages.filter((s) => s.type !== "Open").length}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
