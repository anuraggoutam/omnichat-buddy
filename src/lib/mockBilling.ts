export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  popular?: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  paymentMethod: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "upi";
  brand?: string;
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

export interface UsageMetric {
  feature: string;
  quota: number;
  used: number;
  resetDate: string;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export const mockPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 499,
    currency: "₹",
    interval: "month",
    features: [
      "1,000 conversations/month",
      "5,000 messages/month",
      "Basic AI responses",
      "1 team member",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 1499,
    currency: "₹",
    interval: "month",
    features: [
      "5,000 conversations/month",
      "25,000 messages/month",
      "Advanced AI responses",
      "5 team members",
      "Priority support",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 2999,
    currency: "₹",
    interval: "month",
    features: [
      "Unlimited conversations",
      "100,000 messages/month",
      "Premium AI responses",
      "Unlimited team members",
      "24/7 support",
      "Custom integrations",
      "Advanced analytics",
      "White-label option",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 9999,
    currency: "₹",
    interval: "month",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom contract",
      "Custom SLA",
      "On-premise deployment option",
      "Custom training",
    ],
  },
];

export const mockCurrentPlan = mockPlans[1]; // Growth plan

export const mockInvoices: Invoice[] = [
  {
    id: "INV-2025-001",
    date: "2025-01-01",
    amount: 1499,
    status: "paid",
    paymentMethod: "•••• 4242",
    items: [
      { description: "Growth Plan", quantity: 1, unitPrice: 1499, total: 1499 },
    ],
  },
  {
    id: "INV-2024-012",
    date: "2024-12-01",
    amount: 1499,
    status: "paid",
    paymentMethod: "•••• 4242",
    items: [
      { description: "Growth Plan", quantity: 1, unitPrice: 1499, total: 1499 },
    ],
  },
  {
    id: "INV-2024-011",
    date: "2024-11-01",
    amount: 1499,
    status: "paid",
    paymentMethod: "•••• 4242",
    items: [
      { description: "Growth Plan", quantity: 1, unitPrice: 1499, total: 1499 },
    ],
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiry: "12/2026",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "Mastercard",
    last4: "5555",
    expiry: "08/2025",
    isDefault: false,
  },
];

export const mockUsageMetrics: UsageMetric[] = [
  { feature: "Monthly Messages", quota: 25000, used: 12456, resetDate: "2025-02-01" },
  { feature: "AI Responses", quota: 10000, used: 3421, resetDate: "2025-02-01" },
  { feature: "Templates", quota: 100, used: 23, resetDate: "2025-02-01" },
  { feature: "Broadcasts Sent", quota: 50, used: 18, resetDate: "2025-02-01" },
  { feature: "Conversations", quota: 5000, used: 2847, resetDate: "2025-02-01" },
  { feature: "Contacts", quota: 10000, used: 4532, resetDate: "Never" },
  { feature: "Leads Added", quota: 2000, used: 876, resetDate: "2025-02-01" },
  { feature: "Storage (GB)", quota: 20, used: 8.4, resetDate: "Never" },
];

export const mockAddons: Addon[] = [
  {
    id: "addon_1",
    name: "Extra WhatsApp Number",
    description: "Add another WhatsApp business number",
    price: 499,
    quantity: 0,
  },
  {
    id: "addon_2",
    name: "AI Agent Seats",
    description: "Additional AI-powered agent capacity",
    price: 299,
    quantity: 2,
  },
  {
    id: "addon_3",
    name: "Extra Storage (10GB)",
    description: "Additional file and media storage",
    price: 199,
    quantity: 1,
  },
  {
    id: "addon_4",
    name: "Additional Contacts (5K)",
    description: "Increase your contact limit",
    price: 399,
    quantity: 0,
  },
  {
    id: "addon_5",
    name: "Broadcast Speed Booster",
    description: "Send broadcasts faster",
    price: 599,
    quantity: 0,
  },
];

export const mockCredits = {
  current: 1250,
  expiry: "2025-03-31",
  used: 750,
};
