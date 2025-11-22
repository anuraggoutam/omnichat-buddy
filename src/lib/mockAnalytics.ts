export interface AnalyticsMetrics {
  totalConversations: { value: number; change: number; trend: number[] };
  newLeads: { value: number; change: number; trend: number[] };
  closedDeals: { value: number; change: number; trend: number[] };
  conversionRate: { value: number; change: number; trend: number[] };
  avgResponseTime: { value: string; change: number; trend: number[] };
  revenueGenerated: { value: number; change: number; trend: number[] };
}

export interface ConversationOverTime {
  date: string;
  whatsapp: number;
  instagram: number;
  facebook: number;
  webchat: number;
}

export interface ChannelBreakdown {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export interface AgentLoad {
  name: string;
  conversations: number;
}

export interface LeadFunnel {
  stage: string;
  value: number;
}

export interface LeadSource {
  source: string;
  leads: number;
}

export interface PipelineRevenue {
  month: string;
  forecasted: number;
  actual: number;
}

export interface CampaignPerformance {
  id: string;
  name: string;
  type: string;
  sent: number;
  openRate: number;
  replyRate: number;
  conversion: number;
  status: string;
}

export interface AgentPerformance {
  id: string;
  name: string;
  avatar: string;
  totalChats: number;
  avgResponseTime: string;
  avgResolutionTime: string;
  csatScore: number;
  leadsConverted: number;
  revenueGenerated: number;
}

export const mockTopMetrics: AnalyticsMetrics = {
  totalConversations: {
    value: 2847,
    change: 12.5,
    trend: [120, 145, 132, 178, 156, 189, 203],
  },
  newLeads: {
    value: 456,
    change: 8.3,
    trend: [35, 42, 38, 51, 48, 54, 61],
  },
  closedDeals: {
    value: 89,
    change: 15.7,
    trend: [8, 12, 11, 14, 13, 16, 19],
  },
  conversionRate: {
    value: 19.5,
    change: 2.4,
    trend: [17.2, 18.1, 17.8, 19.2, 18.9, 19.8, 20.1],
  },
  avgResponseTime: {
    value: "2m 34s",
    change: -8.5,
    trend: [180, 165, 172, 158, 154, 148, 145],
  },
  revenueGenerated: {
    value: 124500,
    change: 22.3,
    trend: [95000, 102000, 98000, 115000, 108000, 118000, 124500],
  },
};

export const mockConversationsOverTime: ConversationOverTime[] = [
  { date: "Jan 15", whatsapp: 45, instagram: 32, facebook: 28, webchat: 15 },
  { date: "Jan 16", whatsapp: 52, instagram: 38, facebook: 31, webchat: 18 },
  { date: "Jan 17", whatsapp: 48, instagram: 42, facebook: 35, webchat: 22 },
  { date: "Jan 18", whatsapp: 61, instagram: 51, facebook: 38, webchat: 25 },
  { date: "Jan 19", whatsapp: 58, instagram: 48, facebook: 42, webchat: 28 },
  { date: "Jan 20", whatsapp: 67, instagram: 54, facebook: 45, webchat: 31 },
  { date: "Jan 21", whatsapp: 72, instagram: 59, facebook: 48, webchat: 34 },
];

export const mockChannelBreakdown: ChannelBreakdown[] = [
  { name: "WhatsApp", value: 1240, color: "#25D366" },
  { name: "Instagram", value: 856, color: "#E4405F" },
  { name: "Facebook", value: 542, color: "#1877F2" },
  { name: "Webchat", value: 209, color: "#3B82F6" },
];

export const mockAgentLoad: AgentLoad[] = [
  { name: "Sarah Johnson", conversations: 245 },
  { name: "Mike Chen", conversations: 198 },
  { name: "Emma Davis", conversations: 187 },
  { name: "David Kim", conversations: 156 },
  { name: "Lisa Wang", conversations: 142 },
  { name: "Tom Brown", conversations: 128 },
];

export const mockLeadFunnel: LeadFunnel[] = [
  { stage: "New", value: 456 },
  { stage: "Contacted", value: 342 },
  { stage: "Qualified", value: 234 },
  { stage: "Proposal Sent", value: 156 },
  { stage: "Won", value: 89 },
];

export const mockLeadSources: LeadSource[] = [
  { source: "WhatsApp", leads: 178 },
  { source: "Instagram", leads: 142 },
  { source: "Facebook Ads", leads: 98 },
  { source: "Website", leads: 67 },
  { source: "Referral", leads: 45 },
  { source: "Custom UTM", leads: 32 },
];

export const mockPipelineRevenue: PipelineRevenue[] = [
  { month: "Jul", forecasted: 85000, actual: 78000 },
  { month: "Aug", forecasted: 92000, actual: 88000 },
  { month: "Sep", forecasted: 98000, actual: 95000 },
  { month: "Oct", forecasted: 105000, actual: 102000 },
  { month: "Nov", forecasted: 115000, actual: 108000 },
  { month: "Dec", forecasted: 125000, actual: 118000 },
  { month: "Jan", forecasted: 135000, actual: 124500 },
];

export const mockDealsClosedByAgent = [
  { name: "Sarah J.", deals: 23 },
  { name: "Mike C.", deals: 19 },
  { name: "Emma D.", deals: 16 },
  { name: "David K.", deals: 14 },
  { name: "Lisa W.", deals: 11 },
  { name: "Tom B.", deals: 6 },
];

export const mockDealsWonLost = [
  { name: "Won", value: 89, color: "#22C55E" },
  { name: "Lost", value: 67, color: "#EF4444" },
];

export const mockMessageDelivery = [
  { status: "Delivered", count: 2458 },
  { status: "Seen", count: 2134 },
  { status: "Replied", count: 876 },
  { status: "Failed", count: 34 },
];

export const mockCampaignPerformance: CampaignPerformance[] = [
  {
    id: "1",
    name: "New Year Sale",
    type: "Broadcast",
    sent: 1250,
    openRate: 68.5,
    replyRate: 12.3,
    conversion: 8.4,
    status: "Completed",
  },
  {
    id: "2",
    name: "Product Launch Drip",
    type: "Drip",
    sent: 842,
    openRate: 72.1,
    replyRate: 18.5,
    conversion: 14.2,
    status: "Active",
  },
  {
    id: "3",
    name: "Cart Abandonment",
    type: "Automation",
    sent: 567,
    openRate: 81.3,
    replyRate: 24.7,
    conversion: 19.8,
    status: "Active",
  },
  {
    id: "4",
    name: "Weekend Flash Sale",
    type: "Broadcast",
    sent: 2100,
    openRate: 64.2,
    replyRate: 9.8,
    conversion: 6.1,
    status: "Completed",
  },
];

export const mockAIvsHuman = [
  { date: "Week 1", ai: 145, human: 89 },
  { date: "Week 2", ai: 168, human: 72 },
  { date: "Week 3", ai: 189, human: 68 },
  { date: "Week 4", ai: 203, human: 54 },
];

export const mockAgentPerformance: AgentPerformance[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "SJ",
    totalChats: 245,
    avgResponseTime: "1m 45s",
    avgResolutionTime: "12m 30s",
    csatScore: 4.8,
    leadsConverted: 23,
    revenueGenerated: 34500,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "MC",
    totalChats: 198,
    avgResponseTime: "2m 10s",
    avgResolutionTime: "15m 20s",
    csatScore: 4.6,
    leadsConverted: 19,
    revenueGenerated: 28700,
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "ED",
    totalChats: 187,
    avgResponseTime: "1m 55s",
    avgResolutionTime: "13m 45s",
    csatScore: 4.7,
    leadsConverted: 16,
    revenueGenerated: 24200,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "DK",
    totalChats: 156,
    avgResponseTime: "2m 30s",
    avgResolutionTime: "16m 10s",
    csatScore: 4.5,
    leadsConverted: 14,
    revenueGenerated: 21100,
  },
  {
    id: "5",
    name: "Lisa Wang",
    avatar: "LW",
    totalChats: 142,
    avgResponseTime: "2m 05s",
    avgResolutionTime: "14m 30s",
    csatScore: 4.6,
    leadsConverted: 11,
    revenueGenerated: 16500,
  },
];

export const mockTaskBreakdown = [
  { status: "To Do", count: 45, color: "#94A3B8" },
  { status: "In Progress", count: 32, color: "#3B82F6" },
  { status: "Blocked", count: 8, color: "#EF4444" },
  { status: "Completed", count: 156, color: "#22C55E" },
];

export const mockTaskCompletionTrend = [
  { date: "Week 1", completed: 28 },
  { date: "Week 2", completed: 34 },
  { date: "Week 3", completed: 31 },
  { date: "Week 4", completed: 39 },
  { date: "Week 5", completed: 42 },
];
