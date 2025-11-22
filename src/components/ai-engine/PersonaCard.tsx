import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bot,
  MoreVertical,
  Edit,
  Trash2,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  Pause,
} from "lucide-react";

interface PersonaCardProps {
  persona: any;
  onEdit: (persona: any) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const personaIcons: Record<string, any> = {
  Sales: "💼",
  Support: "🎧",
  "Lead Gen": "🎯",
  Booking: "📅",
};

const channelIcons: Record<string, string> = {
  whatsapp: "📱",
  instagram: "📸",
  web: "🌐",
  email: "✉️",
};

export function PersonaCard({ persona, onEdit, onDelete, onToggleStatus }: PersonaCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
            {personaIcons[persona.type] || "🤖"}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{persona.name}</h3>
            <Badge variant="outline" className="text-xs mt-1">
              {persona.type}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(persona)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus(persona.id)}>
              {persona.status === "Active" ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Activate
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(persona.id)} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {persona.description}
      </p>

      {/* Channels */}
      <div className="flex items-center gap-2 mb-4">
        {persona.channels.map((channel: string) => (
          <span key={channel} className="text-lg" title={channel}>
            {channelIcons[channel]}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t">
        <div className="text-center">
          <MessageSquare className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-lg font-semibold text-foreground">
            {persona.conversationsHandled}
          </div>
          <div className="text-xs text-muted-foreground">Conversations</div>
        </div>
        <div className="text-center">
          <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-lg font-semibold text-foreground">
            {persona.avgResponseTime}
          </div>
          <div className="text-xs text-muted-foreground">Avg Response</div>
        </div>
        <div className="text-center">
          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-lg font-semibold text-success">
            {persona.successRate}
          </div>
          <div className="text-xs text-muted-foreground">Success Rate</div>
        </div>
      </div>

      {/* Status and Last Updated */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Badge
          className={
            persona.status === "Active"
              ? "bg-success text-success-foreground"
              : "bg-muted text-muted-foreground"
          }
        >
          {persona.status}
        </Badge>
        <span className="text-xs text-muted-foreground">
          Updated {persona.updatedAt}
        </span>
      </div>
    </Card>
  );
}
