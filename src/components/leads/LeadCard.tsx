import { Lead, mockAgents } from "@/lib/mockLeads";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Phone, Mail, MessageCircle } from "lucide-react";
import { format } from "date-fns";

interface LeadCardProps {
  lead: Lead;
  onViewLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
}

const sourceIcons = {
  WhatsApp: <MessageCircle className="h-3 w-3" />,
  Instagram: <span className="text-xs font-semibold">IG</span>,
  Facebook: <span className="text-xs font-semibold">FB</span>,
  Website: <span className="text-xs font-semibold">WEB</span>,
  "Landing Page": <span className="text-xs font-semibold">LP</span>,
  Referral: <span className="text-xs font-semibold">REF</span>,
  Manual: <span className="text-xs font-semibold">MAN</span>,
};

export function LeadCard({ lead, onViewLead, onDeleteLead }: LeadCardProps) {
  const agent = mockAgents.find((a) => a.id === lead.assignedAgentId);

  return (
    <div
      className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onViewLead(lead)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-sm">{lead.name}</h4>
            <Badge variant="outline" className="gap-1 text-xs mt-1">
              {sourceIcons[lead.source]}
              {lead.source}
            </Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewLead(lead)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>Assign Agent</DropdownMenuItem>
            <DropdownMenuItem>Quick Move</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDeleteLead(lead.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          {lead.phone}
        </div>
        {lead.email && (
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-sm">
          <span className="text-muted-foreground">Value:</span>{" "}
          <span className="font-semibold">${lead.leadValue.toLocaleString()}</span>
        </div>
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

      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
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

      <div className="flex items-center justify-between pt-3 border-t">
        {agent ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs">
                {agent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{agent.name}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Unassigned</span>
        )}
        <span className="text-xs text-muted-foreground">
          {format(new Date(lead.createdAt), "MMM d")}
        </span>
      </div>
    </div>
  );
}
