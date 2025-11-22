export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  createdBy: string;
  lastUpdated: string;
  type: string;
  folderId?: string;
}

export interface ReportMetric {
  label: string;
  value: string | number;
  change: number;
  trend: number[];
}

export interface ReportCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const mockReportCategories: ReportCategory[] = [
  { id: "overview", name: "Overview Reports", icon: "BarChart3", count: 5 },
  { id: "conversations", name: "Conversation Reports", icon: "MessageSquare", count: 8 },
  { id: "leads", name: "Lead Reports", icon: "Users", count: 6 },
  { id: "sales", name: "Sales & Pipeline Reports", icon: "DollarSign", count: 7 },
  { id: "campaigns", name: "Campaign Reports", icon: "Megaphone", count: 4 },
  { id: "ai", name: "AI Engine Reports", icon: "Brain", count: 3 },
  { id: "team", name: "Team Performance Reports", icon: "UsersRound", count: 5 },
  { id: "custom", name: "Custom Reports", icon: "FileEdit", count: 2 },
  { id: "saved", name: "Saved Reports", icon: "Star", count: 12 },
];

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Daily Conversations Summary",
    description: "Overview of all conversations across channels",
    category: "conversations",
    createdBy: "System",
    lastUpdated: "2 hours ago",
    type: "overview",
  },
  {
    id: "2",
    title: "WhatsApp Performance",
    description: "Message delivery, replies, and engagement metrics",
    category: "conversations",
    createdBy: "Admin",
    lastUpdated: "5 hours ago",
    type: "channel",
  },
  {
    id: "3",
    title: "Lead Funnel Analysis",
    description: "Track leads through pipeline stages",
    category: "leads",
    createdBy: "Sales Team",
    lastUpdated: "1 day ago",
    type: "funnel",
  },
  {
    id: "4",
    title: "Revenue Forecast",
    description: "Predicted revenue based on pipeline weighted values",
    category: "sales",
    createdBy: "Finance",
    lastUpdated: "3 hours ago",
    type: "forecast",
  },
  {
    id: "5",
    title: "Campaign ROI Dashboard",
    description: "Compare campaign performance and conversion rates",
    category: "campaigns",
    createdBy: "Marketing",
    lastUpdated: "1 day ago",
    type: "campaign",
  },
  {
    id: "6",
    title: "AI vs Human Resolution",
    description: "Breakdown of AI-handled vs agent-handled conversations",
    category: "ai",
    createdBy: "System",
    lastUpdated: "4 hours ago",
    type: "ai",
  },
  {
    id: "7",
    title: "Agent Performance Scorecard",
    description: "Response time, CSAT, and conversion metrics per agent",
    category: "team",
    createdBy: "HR",
    lastUpdated: "6 hours ago",
    type: "performance",
  },
  {
    id: "8",
    title: "Lead Source Attribution",
    description: "Track which channels generate the most qualified leads",
    category: "leads",
    createdBy: "Marketing",
    lastUpdated: "2 days ago",
    type: "attribution",
  },
  {
    id: "9",
    title: "Broadcast Delivery Report",
    description: "Sent, delivered, seen, and replied metrics",
    category: "campaigns",
    createdBy: "Marketing",
    lastUpdated: "8 hours ago",
    type: "broadcast",
  },
  {
    id: "10",
    title: "Pipeline Velocity",
    description: "Average time leads spend in each stage",
    category: "sales",
    createdBy: "Sales Ops",
    lastUpdated: "1 day ago",
    type: "velocity",
  },
];

export const mockReportMetrics: ReportMetric[] = [
  {
    label: "Total Conversations",
    value: 2847,
    change: 12.5,
    trend: [120, 145, 132, 178, 156, 189, 203],
  },
  {
    label: "Leads Generated",
    value: 456,
    change: 8.3,
    trend: [35, 42, 38, 51, 48, 54, 61],
  },
  {
    label: "Conversion Rate",
    value: "19.5%",
    change: 2.4,
    trend: [17, 18, 17, 19, 18, 19, 20],
  },
  {
    label: "Revenue",
    value: "$124.5k",
    change: 22.3,
    trend: [95, 102, 98, 115, 108, 118, 124],
  },
];

export const mockReportData = {
  conversationsOverTime: [
    { date: "Jan 15", whatsapp: 45, instagram: 32, facebook: 28, webchat: 15 },
    { date: "Jan 16", whatsapp: 52, instagram: 38, facebook: 31, webchat: 18 },
    { date: "Jan 17", whatsapp: 48, instagram: 42, facebook: 35, webchat: 22 },
    { date: "Jan 18", whatsapp: 61, instagram: 51, facebook: 38, webchat: 25 },
    { date: "Jan 19", whatsapp: 58, instagram: 48, facebook: 42, webchat: 28 },
    { date: "Jan 20", whatsapp: 67, instagram: 54, facebook: 45, webchat: 31 },
    { date: "Jan 21", whatsapp: 72, instagram: 59, facebook: 48, webchat: 34 },
  ],
  leadsByStage: [
    { stage: "New", count: 456 },
    { stage: "Contacted", count: 342 },
    { stage: "Qualified", count: 234 },
    { stage: "Proposal", count: 156 },
    { stage: "Won", count: 89 },
  ],
  tableData: [
    {
      date: "2025-01-21",
      conversations: 203,
      leads: 61,
      deals: 19,
      revenue: 34500,
      channel: "WhatsApp",
      agent: "Sarah Johnson",
    },
    {
      date: "2025-01-20",
      conversations: 189,
      leads: 54,
      deals: 16,
      revenue: 28700,
      channel: "Instagram",
      agent: "Mike Chen",
    },
    {
      date: "2025-01-19",
      conversations: 176,
      leads: 48,
      deals: 13,
      revenue: 24200,
      channel: "Facebook",
      agent: "Emma Davis",
    },
    {
      date: "2025-01-18",
      conversations: 178,
      leads: 51,
      deals: 14,
      revenue: 21100,
      channel: "WhatsApp",
      agent: "David Kim",
    },
    {
      date: "2025-01-17",
      conversations: 156,
      leads: 48,
      deals: 13,
      revenue: 16500,
      channel: "Webchat",
      agent: "Lisa Wang",
    },
  ],
};

export const reportTypes = [
  { id: "conversations", name: "Conversations Report", icon: "MessageSquare" },
  { id: "leads", name: "Lead Report", icon: "Users" },
  { id: "funnel", name: "Funnel Report", icon: "Filter" },
  { id: "ai", name: "AI Engine Report", icon: "Brain" },
  { id: "team", name: "Team Performance", icon: "UsersRound" },
  { id: "sales", name: "Sales / Deals Report", icon: "DollarSign" },
  { id: "campaign", name: "Campaign Report", icon: "Megaphone" },
  { id: "custom", name: "Custom Report", icon: "FileEdit" },
];

export const availableMetrics = [
  "Count of conversations",
  "Leads by stage",
  "Closed deals",
  "Revenue",
  "Conversion %",
  "Avg response time",
  "Template performance",
  "Message delivery rate",
  "AI handled vs human handled",
  "Agent rankings",
];

export const availableCharts = [
  { id: "line", name: "Line Chart" },
  { id: "bar", name: "Bar Chart" },
  { id: "pie", name: "Pie Chart" },
  { id: "funnel", name: "Funnel Chart" },
  { id: "table", name: "Data Table" },
];
