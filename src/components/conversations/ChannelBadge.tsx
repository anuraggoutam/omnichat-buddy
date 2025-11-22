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
    gradient: "bg-gradient-to-r from-green-500 to-green-600",
    textColor: "text-white",
  },
  instagram: {
    label: "Instagram",
    icon: "📸",
    gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
    textColor: "text-white",
  },
  facebook: {
    label: "Facebook",
    icon: "👍",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    textColor: "text-white",
  },
  email: {
    label: "Email",
    icon: "✉️",
    gradient: "bg-gradient-to-r from-gray-500 to-gray-600",
    textColor: "text-white",
  },
  website: {
    label: "Website",
    icon: "🌐",
    gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    textColor: "text-white",
  },
};

export const ChannelBadge = ({ channel, size = "sm" }: ChannelBadgeProps) => {
  const config = channelConfig[channel];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <Badge
      className={`${config.gradient} ${config.textColor} border-0 ${sizeClasses} font-medium`}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
};
