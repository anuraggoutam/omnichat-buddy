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
