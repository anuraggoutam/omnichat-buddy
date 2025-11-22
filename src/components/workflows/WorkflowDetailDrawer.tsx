import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Layers, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";
import { mockWorkflowSteps, mockWorkflowRuns } from "@/lib/mockData";

interface WorkflowDetailDrawerProps {
  workflow: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkflowDetailDrawer({
  workflow,
  open,
  onOpenChange,
}: WorkflowDetailDrawerProps) {
  if (!workflow) return null;

  const steps = mockWorkflowSteps[workflow.id as keyof typeof mockWorkflowSteps] || [];
  const runs = mockWorkflowRuns.filter((run) => run.workflowId === workflow.id);

  const stepTypeLabels: Record<string, string> = {
    sendMessage: "Send Message",
    addTag: "Add Tag",
    removeTag: "Remove Tag",
    assignTeam: "Assign to Team",
    delay: "Delay",
    checkKeyword: "Check Keyword",
    addNote: "Add Note",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{workflow.name}</span>
            <Badge
              className={
                workflow.status === "Active"
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-muted-foreground"
              }
            >
              {workflow.status}
            </Badge>
          </SheetTitle>
          <SheetDescription>{workflow.description}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)] mt-6">
          <div className="space-y-6 pr-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <Layers className="h-5 w-5 mb-2 text-muted-foreground" />
                <div className="text-2xl font-bold text-foreground">{workflow.steps}</div>
                <div className="text-xs text-muted-foreground">Total Steps</div>
              </Card>
              <Card className="p-4">
                <TrendingUp className="h-5 w-5 mb-2 text-muted-foreground" />
                <div className="text-2xl font-bold text-foreground">
                  {workflow.totalRuns}
                </div>
                <div className="text-xs text-muted-foreground">Total Runs</div>
              </Card>
              <Card className="p-4">
                <CheckCircle className="h-5 w-5 mb-2 text-success" />
                <div className="text-2xl font-bold text-success">
                  {workflow.successRate}
                </div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </Card>
            </div>

            <Separator />

            {/* Trigger Summary */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Trigger Configuration
              </h3>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      Trigger Type
                    </div>
                    <Badge variant="outline">{workflow.trigger}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Category</div>
                    <div className="text-sm font-medium text-foreground">
                      {workflow.category}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Separator />

            {/* Steps Overview */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Workflow Steps
              </h3>
              {steps.length > 0 ? (
                <div className="space-y-3">
                  {steps.map((step: any, index: number) => (
                    <Card key={step.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground mb-1">
                            {stepTypeLabels[step.type] || step.type}
                          </div>
                          {step.content && (
                            <div className="text-xs text-muted-foreground">
                              {step.content}
                            </div>
                          )}
                          {step.tag && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Tag: {step.tag}
                            </Badge>
                          )}
                          {step.duration && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Duration: {step.duration}
                            </div>
                          )}
                          {step.team && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Team: {step.team}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No steps configured yet
                  </p>
                </Card>
              )}
            </div>

            <Separator />

            {/* Run Logs */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">
                Recent Run Logs
              </h3>
              {runs.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Steps</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {runs.map((run) => (
                        <TableRow key={run.id}>
                          <TableCell>
                            <div className="flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {run.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                run.status === "Success"
                                  ? "bg-success text-success-foreground"
                                  : "bg-destructive text-destructive-foreground"
                              }
                            >
                              {run.status === "Success" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {run.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-foreground">
                              {run.stepCount} / {workflow.steps}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-muted-foreground">
                              {run.triggerSource}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-muted-foreground">
                              {run.duration}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No runs recorded yet
                  </p>
                </Card>
              )}
            </div>

            <Separator />

            {/* Metadata */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">Metadata</h3>
              <Card className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created By:</span>
                  <span className="font-medium text-foreground">{workflow.createdBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created At:</span>
                  <span className="font-medium text-foreground">{workflow.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium text-foreground">{workflow.updatedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Run:</span>
                  <span className="font-medium text-foreground">{workflow.lastRun}</span>
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
