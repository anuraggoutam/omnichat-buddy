export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastActive: string;
  avatar: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: "active" | "revoked";
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  downloadUrl: string;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "Manager",
    status: "active",
    lastActive: "5 hours ago",
    avatar: "MC",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "Agent",
    status: "active",
    lastActive: "1 day ago",
    avatar: "ED",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    role: "Agent",
    status: "inactive",
    lastActive: "3 days ago",
    avatar: "DK",
  },
];

export const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_live_51J3••••••••••••••••••••••••",
    created: "2025-01-15",
    lastUsed: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "sk_test_51J3••••••••••••••••••••••••",
    created: "2025-01-10",
    lastUsed: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    name: "Legacy Key",
    key: "sk_live_old••••••••••••••••••••••••",
    created: "2024-12-01",
    lastUsed: "Never",
    status: "revoked",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "INV-2025-001",
    date: "2025-01-01",
    amount: 299,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-2024-012",
    date: "2024-12-01",
    amount: 299,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "INV-2024-011",
    date: "2024-11-01",
    amount: 299,
    status: "paid",
    downloadUrl: "#",
  },
];

export const roles = [
  { id: "admin", name: "Admin" },
  { id: "manager", name: "Manager" },
  { id: "agent", name: "Agent" },
  { id: "viewer", name: "Viewer" },
];

export const permissions = [
  "View Conversations",
  "Manage Conversations",
  "View Campaigns",
  "Create Campaigns",
  "View Templates",
  "Manage Templates",
  "View Products",
  "Manage Products",
  "View Leads",
  "Manage Leads",
  "View Reports",
  "Export Data",
  "View Settings",
  "Manage Settings",
  "View Billing",
  "Manage Billing",
];

export const aiModels = [
  { id: "gemini-pro", name: "Google Gemini Pro" },
  { id: "gpt-4", name: "GPT-4" },
  { id: "claude-3", name: "Claude 3" },
  { id: "gemini-flash", name: "Google Gemini Flash" },
];

export const mockChannelStatus = {
  whatsapp: {
    connected: true,
    number: "+1 (555) 123-4567",
    apiType: "Cloud API",
    status: "Active",
  },
  instagram: {
    connected: true,
    handle: "@yourbusiness",
    status: "Active",
  },
  facebook: {
    connected: true,
    pageName: "Your Business Page",
    status: "Active",
  },
  webchat: {
    enabled: true,
    position: "right",
    theme: "primary",
  },
};
