export interface MarketplaceApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  provider: string;
  category: string;
  pricing: "free" | "paid" | "freemium";
  price?: string;
  rating: number;
  reviews: number;
  downloads: number;
  installed: boolean;
  verified: boolean;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  staffPick?: boolean;
  screenshots?: string[];
  features: string[];
  permissions: string[];
  changelog: { version: string; date: string; changes: string[] }[];
  installationGuide: string;
  status?: "active" | "error" | "needs_update";
}

export const mockMarketplaceApps: MarketplaceApp[] = [
  // Featured Apps
  {
    id: "whatsapp-official",
    name: "WhatsApp Business API",
    tagline: "Official Meta WhatsApp Cloud API integration",
    description: "Connect your WhatsApp Business account with full API access. Send messages, manage conversations, and automate responses at scale.",
    icon: "📱",
    provider: "Meta",
    category: "Communication",
    pricing: "paid",
    price: "Starting at $0.005/message",
    rating: 4.9,
    reviews: 2847,
    downloads: 15420,
    installed: true,
    verified: true,
    featured: true,
    trending: true,
    status: "active",
    screenshots: [],
    features: [
      "Send and receive messages",
      "Rich media support (images, videos, documents)",
      "Message templates",
      "Automated webhooks",
      "Business profile management"
    ],
    permissions: ["Read messages", "Send messages", "Access business profile"],
    changelog: [
      { version: "2.1.0", date: "2025-01-15", changes: ["Added support for interactive buttons", "Improved webhook reliability"] }
    ],
    installationGuide: "1. Connect your Facebook Business account\n2. Verify your WhatsApp Business phone number\n3. Configure webhook URL\n4. Start sending messages"
  },
  {
    id: "instagram-dm",
    name: "Instagram Direct Messages",
    tagline: "Manage Instagram DMs and comments in one place",
    description: "Connect your Instagram business account to receive and respond to direct messages and comments directly from your CRM.",
    icon: "📷",
    provider: "Meta",
    category: "Communication",
    pricing: "free",
    rating: 4.7,
    reviews: 1923,
    downloads: 12500,
    installed: true,
    verified: true,
    featured: true,
    status: "active",
    features: [
      "Unified inbox for DMs and comments",
      "Automated comment replies",
      "Story mention notifications",
      "Media sharing",
      "Quick reply templates"
    ],
    permissions: ["Read DMs", "Send messages", "Access comments", "Story mentions"],
    changelog: [
      { version: "1.5.2", date: "2025-01-10", changes: ["Added story mention support", "Bug fixes"] }
    ],
    installationGuide: "1. Connect via Meta OAuth\n2. Grant Instagram permissions\n3. Select business account\n4. Done!"
  },
  {
    id: "ai-smart-agent",
    name: "AI Smart Agent Pack",
    tagline: "Advanced AI models for your sales conversations",
    description: "Upgrade your AI engine with GPT-4, Claude, and specialized sales models. Get better responses, sentiment analysis, and lead scoring.",
    icon: "🤖",
    provider: "Lovable AI",
    category: "AI Add-ons",
    pricing: "paid",
    price: "$99/month",
    rating: 4.8,
    reviews: 542,
    downloads: 3200,
    installed: false,
    verified: true,
    featured: true,
    staffPick: true,
    features: [
      "GPT-4 Turbo access",
      "Claude 3 Opus integration",
      "Advanced sentiment analysis",
      "Predictive lead scoring",
      "Multi-language support (50+ languages)"
    ],
    permissions: ["Access conversation history", "Generate AI responses", "Analyze customer data"],
    changelog: [
      { version: "3.0.0", date: "2025-01-20", changes: ["Added GPT-4 Turbo", "New sentiment engine"] }
    ],
    installationGuide: "1. Subscribe to AI Smart Agent Pack\n2. Select your preferred models\n3. Configure response tone\n4. Enable on conversations"
  },
  {
    id: "stripe-payments",
    name: "Stripe Payment Gateway",
    tagline: "Accept payments directly in conversations",
    description: "Send payment links, generate invoices, and accept payments from customers without leaving the chat.",
    icon: "💳",
    provider: "Stripe",
    category: "Payment Gateways",
    pricing: "free",
    rating: 4.9,
    reviews: 4521,
    downloads: 28900,
    installed: false,
    verified: true,
    trending: true,
    features: [
      "Generate payment links",
      "Invoice creation",
      "Subscription management",
      "Refund processing",
      "Real-time payment notifications"
    ],
    permissions: ["Create payments", "Access customer data", "Send invoices"],
    changelog: [
      { version: "2.3.1", date: "2025-01-18", changes: ["Added subscription support", "UI improvements"] }
    ],
    installationGuide: "1. Connect your Stripe account\n2. Configure payment settings\n3. Start accepting payments"
  },
  {
    id: "sendgrid-email",
    name: "SendGrid Email",
    tagline: "Professional email delivery infrastructure",
    description: "High-deliverability email sending with analytics, templates, and automated workflows.",
    icon: "✉️",
    provider: "Twilio",
    category: "Email Providers",
    pricing: "freemium",
    price: "Free up to 100 emails/day",
    rating: 4.6,
    reviews: 1834,
    downloads: 9500,
    installed: true,
    verified: true,
    status: "active",
    features: [
      "High deliverability rate",
      "Email templates",
      "Analytics dashboard",
      "A/B testing",
      "Automated workflows"
    ],
    permissions: ["Send emails", "Access email templates", "View analytics"],
    changelog: [
      { version: "1.8.0", date: "2025-01-12", changes: ["New analytics dashboard", "Template editor improvements"] }
    ],
    installationGuide: "1. Create SendGrid account\n2. Generate API key\n3. Add API key to settings\n4. Verify sender identity"
  },
  {
    id: "twilio-sms",
    name: "Twilio SMS",
    tagline: "Send SMS to customers worldwide",
    description: "Reliable SMS delivery with international coverage, short codes, and MMS support.",
    icon: "💬",
    provider: "Twilio",
    category: "SMS Providers",
    pricing: "paid",
    price: "$0.0075/SMS",
    rating: 4.7,
    reviews: 2156,
    downloads: 11200,
    installed: true,
    verified: true,
    status: "active",
    features: [
      "International SMS",
      "MMS support",
      "Two-way messaging",
      "Delivery tracking",
      "Short code support"
    ],
    permissions: ["Send SMS", "Receive SMS", "Access phone numbers"],
    changelog: [
      { version: "2.0.5", date: "2025-01-08", changes: ["Added MMS support", "Performance improvements"] }
    ],
    installationGuide: "1. Connect Twilio account\n2. Purchase phone number\n3. Configure messaging service\n4. Start sending SMS"
  },
  {
    id: "zapier-automation",
    name: "Zapier Automation",
    tagline: "Connect to 5000+ apps with no code",
    description: "Automate workflows between your CRM and 5000+ apps. Trigger actions, sync data, and build custom integrations.",
    icon: "⚡",
    provider: "Zapier",
    category: "Automations",
    pricing: "free",
    rating: 4.8,
    reviews: 3421,
    downloads: 18700,
    installed: false,
    verified: true,
    staffPick: true,
    features: [
      "5000+ app integrations",
      "Multi-step workflows",
      "Conditional logic",
      "Custom webhooks",
      "Schedule automation"
    ],
    permissions: ["Trigger workflows", "Access CRM data", "Send webhooks"],
    changelog: [
      { version: "1.4.2", date: "2025-01-15", changes: ["New app integrations", "Faster sync"] }
    ],
    installationGuide: "1. Connect Zapier account\n2. Authorize CRM access\n3. Create your first Zap\n4. Test and enable"
  },
  {
    id: "shopify-integration",
    name: "Shopify E-commerce",
    tagline: "Sync orders and customers from Shopify",
    description: "Automatically import Shopify orders, customers, and products. Manage e-commerce conversations in one place.",
    icon: "🛍️",
    provider: "Shopify",
    category: "E-commerce",
    pricing: "free",
    rating: 4.7,
    reviews: 2845,
    downloads: 14300,
    installed: false,
    verified: true,
    newArrival: true,
    features: [
      "Auto-sync orders",
      "Customer import",
      "Product catalog sync",
      "Order status updates",
      "Abandoned cart recovery"
    ],
    permissions: ["Read orders", "Access customer data", "View products"],
    changelog: [
      { version: "1.0.0", date: "2025-01-22", changes: ["Initial release"] }
    ],
    installationGuide: "1. Install Shopify app\n2. Authorize CRM access\n3. Select stores to sync\n4. Configure sync settings"
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    tagline: "Track visitor behavior and conversions",
    description: "Connect Google Analytics to track user behavior, conversions, and attribution in your CRM.",
    icon: "📊",
    provider: "Google",
    category: "Analytics",
    pricing: "free",
    rating: 4.5,
    reviews: 1523,
    downloads: 7800,
    installed: false,
    verified: true,
    features: [
      "Track conversions",
      "User behavior analytics",
      "Attribution reporting",
      "Custom events",
      "Real-time data"
    ],
    permissions: ["Access analytics data", "Track events", "View reports"],
    changelog: [
      { version: "2.1.0", date: "2025-01-05", changes: ["GA4 support", "New metrics"] }
    ],
    installationGuide: "1. Connect Google account\n2. Select Analytics property\n3. Configure tracking\n4. View reports"
  },
  {
    id: "hubspot-crm",
    name: "HubSpot CRM Sync",
    tagline: "Two-way sync with HubSpot CRM",
    description: "Sync contacts, deals, and activities between your CRM and HubSpot. Keep both systems updated in real-time.",
    icon: "🔄",
    provider: "HubSpot",
    category: "CRM Extensions",
    pricing: "paid",
    price: "$49/month",
    rating: 4.6,
    reviews: 892,
    downloads: 4200,
    installed: false,
    verified: true,
    features: [
      "Two-way sync",
      "Contact mapping",
      "Deal sync",
      "Activity logging",
      "Custom field mapping"
    ],
    permissions: ["Access contacts", "Sync deals", "Log activities", "Read custom fields"],
    changelog: [
      { version: "1.7.3", date: "2025-01-14", changes: ["Improved sync speed", "Bug fixes"] }
    ],
    installationGuide: "1. Connect HubSpot account\n2. Map fields\n3. Configure sync rules\n4. Start syncing"
  },
  {
    id: "slack-notifications",
    name: "Slack Notifications",
    tagline: "Get instant alerts in Slack",
    description: "Receive real-time notifications for new leads, conversations, and important events directly in Slack.",
    icon: "#️⃣",
    provider: "Slack",
    category: "Productivity",
    pricing: "free",
    rating: 4.8,
    reviews: 3241,
    downloads: 19200,
    installed: false,
    verified: true,
    trending: true,
    features: [
      "Real-time notifications",
      "Custom channels",
      "Lead alerts",
      "Daily summaries",
      "Team mentions"
    ],
    permissions: ["Send messages", "Access channels", "Post notifications"],
    changelog: [
      { version: "1.3.0", date: "2025-01-19", changes: ["Custom channel routing", "Rich message formatting"] }
    ],
    installationGuide: "1. Add to Slack workspace\n2. Select notification channels\n3. Configure alert types\n4. Test notifications"
  },
  {
    id: "voice-ai",
    name: "AI Voice Agent",
    tagline: "Automated voice calls with AI",
    description: "Make and receive automated voice calls using advanced AI. Perfect for sales outreach and customer support.",
    icon: "🎙️",
    provider: "Lovable AI",
    category: "AI Add-ons",
    pricing: "paid",
    price: "$149/month",
    rating: 4.9,
    reviews: 234,
    downloads: 1200,
    installed: false,
    verified: true,
    newArrival: true,
    staffPick: true,
    features: [
      "Natural voice synthesis",
      "Real-time conversation",
      "Call recording",
      "Sentiment detection",
      "Multi-language support"
    ],
    permissions: ["Make calls", "Record calls", "Access contact numbers", "Store recordings"],
    changelog: [
      { version: "1.0.0", date: "2025-01-25", changes: ["Initial launch", "25+ voice options"] }
    ],
    installationGuide: "1. Subscribe to Voice AI\n2. Select voice persona\n3. Configure call scripts\n4. Start making calls"
  }
];

export const categories = [
  "All",
  "Communication",
  "CRM Extensions",
  "AI Add-ons",
  "Automations",
  "Payment Gateways",
  "E-commerce",
  "Analytics",
  "Productivity",
  "SMS Providers",
  "Email Providers",
  "Developer Tools"
];
