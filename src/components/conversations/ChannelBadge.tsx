import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle } from "lucide-react";
import { Channel } from "@/lib/mockData";

interface ChannelBadgeProps {
  channel: Channel;
  size?: "sm" | "md";
}

const channelConfig = {
  whatsapp: {
    label: "WhatsApp",
    icon: "💬",
    backgroundColor: "hsl(var(--channel-whatsapp))",
    textColor: "hsl(var(--whatsapp-foreground))", // Assuming whatsapp-foreground is appropriate or default to white
  },
  instagram: {
    label: "Instagram",
    icon: "📸",
    backgroundColor: "hsl(var(--channel-instagram))",
    textColor: "white",
  },
  facebook: {
    label: "Facebook",
    icon: "👍",
    backgroundColor: "hsl(var(--channel-facebook))",
    textColor: "white",
  },
  email: {
    label: "Email",
    icon: "✉️",
    backgroundColor: "hsl(var(--channel-email))",
    textColor: "white",
  },
  website: {
    label: "Website",
    icon: "🌐",
    backgroundColor: "hsl(var(--channel-website))",
    textColor: "white",
  },
};

export const ChannelBadge = ({ channel, size = "sm" }: ChannelBadgeProps) => {
  const config = channelConfig[channel];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <Badge
      style={{ backgroundColor: config.backgroundColor, color: config.textColor }}
      className={`border-0 ${sizeClasses} font-medium`}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
};
