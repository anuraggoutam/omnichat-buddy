// Mock data for Leads CRM Module
// This can be replaced with API calls later

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  source: "WhatsApp" | "Instagram" | "Facebook" | "Website" | "Landing Page" | "Referral" | "Manual";
  utm?: {
    campaign?: string;
    source?: string;
    medium?: string;
  };
  leadValue: number;
  createdAt: string;
  tags: string[];
  leadScore: number;
  assignedAgentId: string | null;
  stage: "New" | "Contacted" | "Qualified" | "Follow Up" | "Closed Won" | "Closed Lost";
  notes: Array<{
    id: string;
    author: string;
    text: string;
    createdAt: string;
  }>;
  timeline: Array<{
    id: string;
    type: string;
    text: string;
    createdAt: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    status: "pending" | "completed";
    assignedTo: string;
    dueDate: string;
  }>;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string | null;
  status: "online" | "offline" | "busy";
}

export const mockAgents: Agent[] = [
  { id: "agent_01", name: "Sarah Johnson", avatar: null, status: "online" },
  { id: "agent_02", name: "Mike Chen", avatar: null, status: "online" },
  { id: "agent_03", name: "Emily Davis", avatar: null, status: "busy" },
  { id: "agent_04", name: "James Wilson", avatar: null, status: "offline" },
  { id: "agent_05", name: "Lisa Anderson", avatar: null, status: "online" },
  { id: "agent_06", name: "David Brown", avatar: null, status: "busy" },
];

export const mockTags = [
  "VIP",
  "Hot",
  "Warm",
  "Bulk",
  "Follow-up",
  "Low Priority",
  "Urgent",
  "High Value",
  "Returning Customer",
];

const sources: Lead["source"][] = ["WhatsApp", "Instagram", "Facebook", "Website", "Landing Page", "Referral", "Manual"];
const stages: Lead["stage"][] = ["New", "Contacted", "Qualified", "Follow Up", "Closed Won", "Closed Lost"];

const generateRandomDate = (daysBack: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
};

const sampleNames = [
  "John Smith", "Emma Wilson", "Michael Brown", "Sophia Davis", "William Jones",
  "Olivia Garcia", "James Miller", "Ava Martinez", "Robert Anderson", "Isabella Taylor",
  "David Thomas", "Mia Jackson", "Joseph White", "Charlotte Harris", "Charles Martin",
  "Amelia Thompson", "Christopher Moore", "Harper Lee", "Daniel Lewis", "Evelyn Walker",
  "Matthew Hall", "Abigail Allen", "Anthony Young", "Emily King", "Mark Wright",
  "Elizabeth Lopez", "Donald Hill", "Sofia Scott", "Steven Green", "Avery Adams",
  "Andrew Baker", "Ella Nelson", "Joshua Carter", "Scarlett Mitchell", "Kevin Perez",
  "Madison Roberts", "Brian Turner", "Luna Phillips", "George Campbell", "Chloe Parker",
];

export const mockLeads: Lead[] = Array.from({ length: 40 }, (_, i) => {
  const stage = stages[Math.floor(Math.random() * stages.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const createdAt = generateRandomDate(60);
  const assignedAgentId = Math.random() > 0.3 ? mockAgents[Math.floor(Math.random() * mockAgents.length)].id : null;
  const leadScore = Math.floor(Math.random() * 100);
  const leadValue = Math.floor(Math.random() * 5000) + 100;
  const numTags = Math.floor(Math.random() * 3);
  const tags = Array.from({ length: numTags }, () => mockTags[Math.floor(Math.random() * mockTags.length)]);

  return {
    id: `lead_${String(i + 1).padStart(3, "0")}`,
    name: sampleNames[i % sampleNames.length],
    phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    email: Math.random() > 0.2 ? `${sampleNames[i % sampleNames.length].toLowerCase().replace(" ", ".")}@example.com` : null,
    source,
    utm: source === "Website" || source === "Landing Page" ? {
      campaign: ["summer-sale", "product-launch", "holiday-promo"][Math.floor(Math.random() * 3)],
      source: ["google", "facebook", "instagram"][Math.floor(Math.random() * 3)],
      medium: ["cpc", "social", "email"][Math.floor(Math.random() * 3)],
    } : undefined,
    leadValue,
    createdAt,
    tags: [...new Set(tags)],
    leadScore,
    assignedAgentId,
    stage,
    notes: [
      {
        id: `note_${i}_1`,
        author: mockAgents[Math.floor(Math.random() * mockAgents.length)].name,
        text: "Initial contact made. Customer interested in product demo.",
        createdAt: generateRandomDate(30),
      },
    ],
    timeline: [
      {
        id: `tl_${i}_1`,
        type: "created",
        text: "Lead created",
        createdAt,
      },
      {
        id: `tl_${i}_2`,
        type: "stage_change",
        text: `Stage changed to ${stage}`,
        createdAt: generateRandomDate(20),
      },
    ],
    tasks: [
      {
        id: `task_${i}_1`,
        title: "Follow up call",
        status: Math.random() > 0.5 ? "completed" : "pending",
        assignedTo: assignedAgentId || mockAgents[0].id,
        dueDate: generateRandomDate(-5),
      },
    ],
  };
});
