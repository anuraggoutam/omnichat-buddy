import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  TrendingUp,
  Users,
  ShoppingCart,
  Zap,
  BarChart3,
  Send,
  Calendar,
} from "lucide-react";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const quickActions = [
  {
    icon: MessageSquare,
    label: "Reply to pending messages",
    prompt: "Help me reply to all pending customer messages from today",
  },
  {
    icon: TrendingUp,
    label: "Analyze sales trends",
    prompt: "Analyze my sales trends from the last 7 days and suggest improvements",
  },
  {
    icon: Users,
    label: "Follow up with leads",
    prompt: "Draft follow-up messages for leads that haven't responded in 3 days",
  },
  {
    icon: ShoppingCart,
    label: "Create promotional offer",
    prompt: "Help me create a promotional offer for my best-selling products",
  },
  {
    icon: Send,
    label: "Schedule broadcast",
    prompt: "Help me schedule a WhatsApp broadcast to my customer list",
  },
  {
    icon: BarChart3,
    label: "Weekly report",
    prompt: "Generate a weekly performance report for my business",
  },
];

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <p className="text-sm text-muted-foreground text-center mb-4">
        Quick actions to get started
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-28 sm:h-24 py-3 px-4 flex flex-col items-center justify-center gap-2 text-center hover:bg-muted transition-all group border-dashed"
            onClick={() => onActionClick(action.prompt)}
          >
            <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium leading-tight text-responsive-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
