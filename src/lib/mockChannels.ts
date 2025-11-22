export interface Channel {
  id: string;
  name: string;
  type: "whatsapp" | "instagram" | "facebook" | "email" | "website" | "sms" | "telegram" | "line" | "viber" | "slack";
  icon: string;
  connected: boolean;
  status?: "live" | "rate_limited" | "disconnected" | "token_expired";
  connectedAccount?: string;
  provider?: string;
  lastSynced?: string;
  config?: {
    apiKey?: string;
    webhookUrl?: string;
    phoneNumber?: string;
    handle?: string;
    email?: string;
    smtpHost?: string;
    smtpPort?: string;
    balance?: string;
    qualityRating?: string;
    permissions?: string[];
    embedCode?: string;
    themeColor?: string;
  };
  dailyLimit?: string;
  warningMessage?: string;
  comingSoon?: boolean;
}

export const mockChannels: Channel[] = [
  {
    id: "wa_1",
    name: "WhatsApp Business",
    type: "whatsapp",
    icon: "📱",
    connected: true,
    status: "live",
    connectedAccount: "+1 (555) 123-4567",
    provider: "Meta Cloud API",
    lastSynced: "2 mins ago",
    dailyLimit: "1,000 messages/day",
    config: {
      apiKey: "wa_live_••••••••••••7890",
      webhookUrl: "https://api.yourapp.com/webhooks/whatsapp",
      phoneNumber: "+15551234567",
      qualityRating: "High",
    }
  },
  {
    id: "ig_1",
    name: "Instagram",
    type: "instagram",
    icon: "📷",
    connected: true,
    status: "live",
    connectedAccount: "@yourbusiness",
    provider: "Meta OAuth",
    lastSynced: "5 mins ago",
    config: {
      handle: "@yourbusiness",
      permissions: ["Messaging", "Comment Replies", "Story Mentions"],
    }
  },
  {
    id: "fb_1",
    name: "Facebook Messenger",
    type: "facebook",
    icon: "💬",
    connected: true,
    status: "token_expired",
    connectedAccount: "Your Business Page",
    provider: "Meta OAuth",
    lastSynced: "2 hours ago",
    warningMessage: "Token expired. Please reconnect to continue receiving messages.",
    config: {
      permissions: ["Messaging", "Page Access"],
    }
  },
  {
    id: "email_1",
    name: "Email",
    type: "email",
    icon: "✉️",
    connected: true,
    status: "live",
    connectedAccount: "support@yourbusiness.com",
    provider: "Gmail OAuth",
    lastSynced: "1 min ago",
    config: {
      email: "support@yourbusiness.com",
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
    }
  },
  {
    id: "web_1",
    name: "Website Chat",
    type: "website",
    icon: "💻",
    connected: true,
    status: "live",
    connectedAccount: "yourbusiness.com",
    lastSynced: "just now",
    config: {
      embedCode: `<script src="https://widget.yourapp.com/chat.js" data-id="web_1"></script>`,
      themeColor: "#3b82f6",
    }
  },
  {
    id: "sms_1",
    name: "SMS",
    type: "sms",
    icon: "💬",
    connected: true,
    status: "live",
    connectedAccount: "Twilio",
    provider: "Twilio",
    lastSynced: "10 mins ago",
    dailyLimit: "500 messages/day",
    config: {
      apiKey: "twilio_••••••••••••4321",
      balance: "$48.50",
      phoneNumber: "+15559876543",
    }
  },
  {
    id: "tg_1",
    name: "Telegram",
    type: "telegram",
    icon: "✈️",
    connected: false,
    comingSoon: true,
  },
  {
    id: "line_1",
    name: "Line",
    type: "line",
    icon: "💚",
    connected: false,
    comingSoon: true,
  },
  {
    id: "viber_1",
    name: "Viber",
    type: "viber",
    icon: "📞",
    connected: false,
    comingSoon: true,
  },
  {
    id: "slack_1",
    name: "Slack",
    type: "slack",
    icon: "#️⃣",
    connected: false,
    comingSoon: true,
  },
];

export interface ChannelSettings {
  routingRule: "smart" | "specific" | "round_robin";
  assignedAgent?: string;
  defaultChannel: string;
  aiAutoReply: {
    enabled: boolean;
    channels: string[];
    delaySeconds: number;
    allowedHours: { start: string; end: string };
  };
}

export const mockChannelSettings: ChannelSettings = {
  routingRule: "smart",
  defaultChannel: "whatsapp",
  aiAutoReply: {
    enabled: true,
    channels: ["whatsapp", "instagram", "email"],
    delaySeconds: 30,
    allowedHours: { start: "09:00", end: "18:00" },
  },
};
