export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  probability: number;
  type: "Open" | "Closed Won" | "Closed Lost";
  description?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  stages: PipelineStage[];
}

export const defaultPipeline: Pipeline = {
  id: "default",
  name: "Default Sales Pipeline",
  description: "Standard sales process from lead to close",
  stages: [
    {
      id: "stage_1",
      name: "New",
      color: "#3b82f6",
      probability: 10,
      type: "Open",
      description: "Newly created leads"
    },
    {
      id: "stage_2",
      name: "Contacted",
      color: "#06b6d4",
      probability: 25,
      type: "Open",
      description: "Initial contact made"
    },
    {
      id: "stage_3",
      name: "Qualified",
      color: "#22c55e",
      probability: 50,
      type: "Open",
      description: "Lead has been qualified"
    },
    {
      id: "stage_4",
      name: "Follow Up",
      color: "#facc15",
      probability: 70,
      type: "Open",
      description: "Active follow-up in progress"
    },
    {
      id: "stage_5",
      name: "Closed Won",
      color: "#15803d",
      probability: 100,
      type: "Closed Won",
      description: "Successfully closed deal"
    },
    {
      id: "stage_6",
      name: "Closed Lost",
      color: "#9ca3af",
      probability: 0,
      type: "Closed Lost",
      description: "Lead did not convert"
    }
  ]
};

export const colorPresets = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#facc15" },
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Purple", value: "#a855f7" },
  { name: "Gray", value: "#9ca3af" },
  { name: "Dark Green", value: "#15803d" },
  { name: "Emerald", value: "#10b981" }
];

export interface PipelineTemplate {
  id: string;
  name: string;
  description: string;
  category: "B2B" | "B2C" | "SaaS" | "E-commerce" | "Agency";
  stages: Omit<PipelineStage, "id">[];
}

export const pipelineTemplates: PipelineTemplate[] = [
  {
    id: "b2b-sales",
    name: "B2B Sales Pipeline",
    description: "Standard enterprise sales process with qualification and demos",
    category: "B2B",
    stages: [
      { name: "New Lead", color: "#3b82f6", probability: 10, type: "Open", description: "Initial contact received" },
      { name: "Qualification", color: "#06b6d4", probability: 25, type: "Open", description: "Qualifying lead fit" },
      { name: "Demo Scheduled", color: "#8b5cf6", probability: 40, type: "Open", description: "Product demo booked" },
      { name: "Proposal Sent", color: "#22c55e", probability: 60, type: "Open", description: "Proposal delivered" },
      { name: "Negotiation", color: "#facc15", probability: 75, type: "Open", description: "Terms discussion" },
      { name: "Closed Won", color: "#15803d", probability: 100, type: "Closed Won", description: "Deal closed successfully" },
      { name: "Closed Lost", color: "#9ca3af", probability: 0, type: "Closed Lost", description: "Lost to competitor or no budget" }
    ]
  },
  {
    id: "b2c-simple",
    name: "B2C Simple Pipeline",
    description: "Quick sales cycle for direct consumer purchases",
    category: "B2C",
    stages: [
      { name: "Inquiry", color: "#3b82f6", probability: 20, type: "Open", description: "Customer asked about product" },
      { name: "Quote Sent", color: "#06b6d4", probability: 50, type: "Open", description: "Pricing shared" },
      { name: "Follow Up", color: "#facc15", probability: 70, type: "Open", description: "Checking back with customer" },
      { name: "Purchase", color: "#15803d", probability: 100, type: "Closed Won", description: "Customer bought" },
      { name: "Not Interested", color: "#9ca3af", probability: 0, type: "Closed Lost", description: "Customer declined" }
    ]
  },
  {
    id: "saas-onboarding",
    name: "SaaS Trial to Paid",
    description: "Convert trial users to paying customers",
    category: "SaaS",
    stages: [
      { name: "Trial Started", color: "#3b82f6", probability: 15, type: "Open", description: "User signed up for trial" },
      { name: "Activated", color: "#06b6d4", probability: 30, type: "Open", description: "User completed onboarding" },
      { name: "Engaged", color: "#8b5cf6", probability: 50, type: "Open", description: "Active usage detected" },
      { name: "Payment Added", color: "#22c55e", probability: 80, type: "Open", description: "Credit card on file" },
      { name: "Converted", color: "#15803d", probability: 100, type: "Closed Won", description: "Paid subscription" },
      { name: "Churned", color: "#9ca3af", probability: 0, type: "Closed Lost", description: "Trial expired" }
    ]
  },
  {
    id: "ecommerce-order",
    name: "E-commerce Order Flow",
    description: "Track orders from cart to delivery",
    category: "E-commerce",
    stages: [
      { name: "Cart Created", color: "#3b82f6", probability: 30, type: "Open", description: "Items added to cart" },
      { name: "Checkout Started", color: "#06b6d4", probability: 50, type: "Open", description: "Entered checkout" },
      { name: "Payment Pending", color: "#facc15", probability: 70, type: "Open", description: "Processing payment" },
      { name: "Order Confirmed", color: "#22c55e", probability: 90, type: "Open", description: "Payment successful" },
      { name: "Delivered", color: "#15803d", probability: 100, type: "Closed Won", description: "Order completed" },
      { name: "Abandoned", color: "#9ca3af", probability: 0, type: "Closed Lost", description: "Cart abandoned" }
    ]
  },
  {
    id: "agency-project",
    name: "Agency Project Pipeline",
    description: "Manage client projects from pitch to delivery",
    category: "Agency",
    stages: [
      { name: "Initial Inquiry", color: "#3b82f6", probability: 10, type: "Open", description: "Client reached out" },
      { name: "Discovery Call", color: "#06b6d4", probability: 30, type: "Open", description: "Requirements discussion" },
      { name: "Proposal", color: "#8b5cf6", probability: 50, type: "Open", description: "Scope and pricing sent" },
      { name: "Contract Review", color: "#facc15", probability: 75, type: "Open", description: "Legal review in progress" },
      { name: "Project Started", color: "#15803d", probability: 100, type: "Closed Won", description: "Contract signed" },
      { name: "Declined", color: "#9ca3af", probability: 0, type: "Closed Lost", description: "Client went elsewhere" }
    ]
  }
];
