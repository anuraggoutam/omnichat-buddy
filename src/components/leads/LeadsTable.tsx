import { useState } from "react";
import { Lead, mockAgents } from "@/lib/mockLeads";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, ArrowUpDown, Phone, Mail, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LeadsTableProps {
  leads: Lead[];
  selectedLeads: string[];
  onSelectLead: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  onViewLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
}

const stageColors = {
  "New": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "Contacted": "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
  "Qualified": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Follow Up": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  "Closed Won": "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/20",
  "Closed Lost": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
};

const sourceIcons = {
  WhatsApp: <MessageCircle className="h-3 w-3" />,
  Instagram: <span className="text-xs">IG</span>,
  Facebook: <span className="text-xs">FB</span>,
  Website: <span className="text-xs">WEB</span>,
  "Landing Page": <span className="text-xs">LP</span>,
  Referral: <span className="text-xs">REF</span>,
  Manual: <span className="text-xs">MAN</span>,
};

export function LeadsTable({
  leads,
  selectedLeads,
  onSelectLead,
  onSelectAll,
  onViewLead,
  onDeleteLead,
}: LeadsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof Lead) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  const allSelected = leads.length > 0 && selectedLeads.length === leads.length;
  const isMobile = useIsMobile();

  // Mobile Card View
  if (isMobile) {
    return (
      <div className="space-y-3">
        {sortedLeads.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No leads found</p>
          </div>
        ) : (
          sortedLeads.map((lead) => {
            const agent = mockAgents.find((a) => a.id === lead.assignedAgentId);
            return (
              <Card
                key={lead.id}
                className={cn(
                  "cursor-pointer hover:shadow-md transition-all",
                  selectedLeads.includes(lead.id) && "ring-2 ring-primary"
                )}
                onClick={() => onViewLead(lead)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => onSelectLead(lead.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select ${lead.name}`}
                      />
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="text-xs">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{lead.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={stageColors[lead.stage]}>{lead.stage}</Badge>
                          <Badge
                            variant="outline"
                            className={
                              lead.leadScore >= 70
                                ? "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400"
                                : lead.leadScore >= 40
                                  ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                  : "border-gray-500/20 bg-gray-500/10 text-gray-700 dark:text-gray-400"
                            }
                          >
                            Score: {lead.leadScore}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewLead(lead)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                        <DropdownMenuItem>Change Stage</DropdownMenuItem>
                        <DropdownMenuItem>Create Task</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => onDeleteLead(lead.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span className="text-xs">{lead.phone}</span>
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span className="text-xs truncate">{lead.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1 text-xs">
                          {sourceIcons[lead.source]}
                          {lead.source}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ${lead.leadValue.toLocaleString()}
                        </span>
                      </div>
                      {agent && (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {agent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{agent.name}</span>
                        </div>
                      )}
                    </div>

                    {lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2 border-t">
                        {lead.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {lead.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{lead.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground pt-1">
                      Created {format(new Date(lead.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    );
  }

  // Desktop Table View
  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="h-8 px-2 lg:px-3 gap-1"
              >
                Lead Name
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("leadScore")}
                className="h-8 px-2 lg:px-3 gap-1"
              >
                Score
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("leadValue")}
                className="h-8 px-2 lg:px-3 gap-1"
              >
                Value
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Assigned</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("createdAt")}
                className="h-8 px-2 lg:px-3 gap-1"
              >
                Created
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLeads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            sortedLeads.map((lead) => {
              const agent = mockAgents.find((a) => a.id === lead.assignedAgentId);
              return (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onViewLead(lead)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={() => onSelectLead(lead.id)}
                      aria-label={`Select ${lead.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{lead.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      {sourceIcons[lead.source]}
                      {lead.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {lead.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{lead.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        lead.leadScore >= 70
                          ? "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400"
                          : lead.leadScore >= 40
                            ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                            : "border-gray-500/20 bg-gray-500/10 text-gray-700 dark:text-gray-400"
                      }
                    >
                      {lead.leadScore}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${lead.leadValue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {agent ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {agent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{agent.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={stageColors[lead.stage]}>{lead.stage}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewLead(lead)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                        <DropdownMenuItem>Change Stage</DropdownMenuItem>
                        <DropdownMenuItem>Create Task</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => onDeleteLead(lead.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
