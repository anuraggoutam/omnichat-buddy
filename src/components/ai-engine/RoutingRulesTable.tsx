import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, MoreVertical, TrendingUp } from "lucide-react";

interface RoutingRulesTableProps {
  routingRules: any[];
  onUpdate: (data: any[]) => void;
}

const priorityColors = {
  High: "bg-destructive text-destructive-foreground",
  Medium: "bg-warning text-warning-foreground",
  Low: "bg-muted text-muted-foreground",
};

export function RoutingRulesTable({ routingRules, onUpdate }: RoutingRulesTableProps) {
  const handleDelete = (id: string) => {
    onUpdate(routingRules.filter((rule) => rule.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    onUpdate(
      routingRules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              status: rule.status === "Active" ? ("Paused" as const) : ("Active" as const),
            }
          : rule
      )
    );
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rule Name</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Times Triggered</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routingRules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell>
                <div>
                  <div className="font-medium text-foreground">{rule.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                    {rule.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">
                    {rule.condition}
                  </Badge>
                  <div className="text-xs text-muted-foreground">{rule.conditionValue}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">{rule.action}</div>
                  <div className="text-xs text-muted-foreground">{rule.actionValue}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={priorityColors[rule.priority as keyof typeof priorityColors]}>
                  {rule.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-foreground">{rule.timesTriggered}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    rule.status === "Active"
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {rule.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(rule.id)}>
                      {rule.status === "Active" ? "Pause" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(rule.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
