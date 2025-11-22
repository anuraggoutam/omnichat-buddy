export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: "active" | "suspended" | "pending";
  lastActive: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: string;
  sentDate: string;
  status: "sent" | "accepted" | "expired";
}

export interface ActivityLog {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "SJ",
    role: "Admin",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "MC",
    role: "Manager",
    status: "active",
    lastActive: "5 hours ago",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma@example.com",
    avatar: "ED",
    role: "Agent",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    avatar: "DK",
    role: "Agent",
    status: "suspended",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa@example.com",
    avatar: "LW",
    role: "Support",
    status: "active",
    lastActive: "4 hours ago",
  },
  {
    id: "6",
    name: "James Brown",
    email: "james@example.com",
    avatar: "JB",
    role: "Agent",
    status: "active",
    lastActive: "30 minutes ago",
  },
  {
    id: "7",
    name: "Sophie Turner",
    email: "sophie@example.com",
    avatar: "ST",
    role: "Manager",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: "8",
    name: "Alex Rivera",
    email: "alex@example.com",
    avatar: "AR",
    role: "Support",
    status: "pending",
    lastActive: "Never",
  },
  {
    id: "9",
    name: "Nina Patel",
    email: "nina@example.com",
    avatar: "NP",
    role: "Agent",
    status: "active",
    lastActive: "2 days ago",
  },
  {
    id: "10",
    name: "Tom Anderson",
    email: "tom@example.com",
    avatar: "TA",
    role: "Support",
    status: "active",
    lastActive: "6 hours ago",
  },
];

export const mockRoles: Role[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 1,
    permissions: ["all"],
  },
  {
    id: "manager",
    name: "Manager",
    description: "Manage team, campaigns, and view analytics",
    userCount: 2,
    permissions: [
      "users_view",
      "users_edit",
      "conversations_full",
      "campaigns_full",
      "analytics_view",
      "reports_full",
    ],
  },
  {
    id: "agent",
    name: "Agent",
    description: "Handle conversations and basic tasks",
    userCount: 4,
    permissions: [
      "conversations_view",
      "conversations_reply",
      "tasks_view",
      "tasks_edit",
      "customers_view",
    ],
  },
  {
    id: "support",
    name: "Support",
    description: "Limited access for support team",
    userCount: 3,
    permissions: ["conversations_view", "conversations_reply", "customers_view"],
  },
];

export const mockPermissions: Permission[] = [
  // User Management
  { id: "users_view", name: "View Users", category: "User Management", description: "View user list and details" },
  { id: "users_edit", name: "Edit Users", category: "User Management", description: "Create and edit users" },
  { id: "users_delete", name: "Delete Users", category: "User Management", description: "Remove users from system" },
  { id: "roles_manage", name: "Manage Roles", category: "User Management", description: "Create and modify roles" },

  // Conversations & Inbox
  { id: "conversations_view", name: "View Conversations", category: "Conversations & Inbox", description: "Access inbox and conversations" },
  { id: "conversations_reply", name: "Reply to Messages", category: "Conversations & Inbox", description: "Send messages to customers" },
  { id: "conversations_assign", name: "Assign Conversations", category: "Conversations & Inbox", description: "Assign chats to team members" },
  { id: "conversations_full", name: "Full Inbox Access", category: "Conversations & Inbox", description: "Complete control over inbox" },

  // Automation & Workflows
  { id: "workflows_view", name: "View Workflows", category: "Automation & Workflows", description: "View automation workflows" },
  { id: "workflows_create", name: "Create Workflows", category: "Automation & Workflows", description: "Build new automations" },
  { id: "workflows_edit", name: "Edit Workflows", category: "Automation & Workflows", description: "Modify existing workflows" },
  { id: "ai_settings", name: "AI Settings", category: "Automation & Workflows", description: "Configure AI engine" },

  // Campaigns & Broadcasting
  { id: "campaigns_view", name: "View Campaigns", category: "Campaigns & Broadcasting", description: "Access campaign list" },
  { id: "campaigns_create", name: "Create Campaigns", category: "Campaigns & Broadcasting", description: "Launch new campaigns" },
  { id: "broadcasts_send", name: "Send Broadcasts", category: "Campaigns & Broadcasting", description: "Send bulk messages" },
  { id: "campaigns_full", name: "Full Campaign Access", category: "Campaigns & Broadcasting", description: "Complete campaign control" },

  // Products & Orders
  { id: "products_view", name: "View Products", category: "Products & Orders", description: "View product catalog" },
  { id: "products_edit", name: "Edit Products", category: "Products & Orders", description: "Manage product inventory" },
  { id: "orders_view", name: "View Orders", category: "Products & Orders", description: "Access order history" },
  { id: "orders_manage", name: "Manage Orders", category: "Products & Orders", description: "Process and update orders" },

  // Analytics & Reports
  { id: "analytics_view", name: "View Analytics", category: "Analytics & Reports", description: "Access analytics dashboard" },
  { id: "reports_view", name: "View Reports", category: "Analytics & Reports", description: "Access report library" },
  { id: "reports_create", name: "Create Reports", category: "Analytics & Reports", description: "Build custom reports" },
  { id: "reports_full", name: "Full Reports Access", category: "Analytics & Reports", description: "Complete reports control" },

  // Billing & Subscription
  { id: "billing_view", name: "View Billing", category: "Billing & Subscription", description: "View billing information" },
  { id: "billing_manage", name: "Manage Billing", category: "Billing & Subscription", description: "Update payment methods" },
  { id: "subscription_manage", name: "Manage Subscription", category: "Billing & Subscription", description: "Change plans and add-ons" },

  // Customers
  { id: "customers_view", name: "View Customers", category: "Customers", description: "Access customer database" },
  { id: "customers_edit", name: "Edit Customers", category: "Customers", description: "Update customer information" },
  { id: "customers_delete", name: "Delete Customers", category: "Customers", description: "Remove customers" },

  // Tasks
  { id: "tasks_view", name: "View Tasks", category: "Tasks", description: "View task list" },
  { id: "tasks_edit", name: "Edit Tasks", category: "Tasks", description: "Create and update tasks" },
  { id: "tasks_assign", name: "Assign Tasks", category: "Tasks", description: "Assign tasks to team" },
];

export const mockInvitations: Invitation[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    role: "Agent",
    sentDate: "2025-01-15",
    status: "sent",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    role: "Manager",
    sentDate: "2025-01-18",
    status: "accepted",
  },
  {
    id: "3",
    email: "bob.wilson@example.com",
    role: "Support",
    sentDate: "2024-12-20",
    status: "expired",
  },
  {
    id: "4",
    email: "alice.johnson@example.com",
    role: "Agent",
    sentDate: "2025-01-20",
    status: "sent",
  },
  {
    id: "5",
    email: "charlie.brown@example.com",
    role: "Support",
    sentDate: "2025-01-19",
    status: "sent",
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    userName: "Sarah Johnson",
    userAvatar: "SJ",
    action: "User Created",
    description: "Created new user account for Nina Patel",
    timestamp: "2025-01-22 10:30 AM",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    userName: "Mike Chen",
    userAvatar: "MC",
    action: "Role Changed",
    description: "Changed role of Emma Davis from Support to Agent",
    timestamp: "2025-01-22 09:15 AM",
    ipAddress: "192.168.1.101",
  },
  {
    id: "3",
    userName: "Sarah Johnson",
    userAvatar: "SJ",
    action: "User Suspended",
    description: "Suspended account for David Kim",
    timestamp: "2025-01-21 04:45 PM",
    ipAddress: "192.168.1.100",
  },
  {
    id: "4",
    userName: "Mike Chen",
    userAvatar: "MC",
    action: "Invitation Sent",
    description: "Sent invitation to alice.johnson@example.com",
    timestamp: "2025-01-20 02:20 PM",
    ipAddress: "192.168.1.101",
  },
  {
    id: "5",
    userName: "Sarah Johnson",
    userAvatar: "SJ",
    action: "Permission Updated",
    description: "Updated permissions for Agent role",
    timestamp: "2025-01-20 11:00 AM",
    ipAddress: "192.168.1.100",
  },
  {
    id: "6",
    userName: "Emma Davis",
    userAvatar: "ED",
    action: "Password Reset",
    description: "Reset password for own account",
    timestamp: "2025-01-19 03:30 PM",
    ipAddress: "192.168.1.105",
  },
  {
    id: "7",
    userName: "Mike Chen",
    userAvatar: "MC",
    action: "User Deleted",
    description: "Removed inactive user account",
    timestamp: "2025-01-19 10:15 AM",
    ipAddress: "192.168.1.101",
  },
  {
    id: "8",
    userName: "Sarah Johnson",
    userAvatar: "SJ",
    action: "Role Created",
    description: "Created new custom role: Supervisor",
    timestamp: "2025-01-18 01:45 PM",
    ipAddress: "192.168.1.100",
  },
];

export const permissionCategories = [
  "User Management",
  "Conversations & Inbox",
  "Automation & Workflows",
  "Campaigns & Broadcasting",
  "Products & Orders",
  "Analytics & Reports",
  "Billing & Subscription",
  "Customers",
  "Tasks",
];
