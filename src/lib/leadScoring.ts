// Lead Scoring Algorithm
// Calculates scores based on engagement factors

import type { Lead } from "./mockLeads";

interface ScoringWeights {
  source: number;
  stage: number;
  tags: number;
  activity: number;
  value: number;
  recency: number;
}

const WEIGHTS: ScoringWeights = {
  source: 15,
  stage: 25,
  tags: 15,
  activity: 20,
  value: 15,
  recency: 10,
};

const SOURCE_SCORES: Record<Lead["source"], number> = {
  "Referral": 1.0,
  "Website": 0.85,
  "Landing Page": 0.8,
  "WhatsApp": 0.7,
  "Instagram": 0.6,
  "Facebook": 0.55,
  "Manual": 0.4,
};

const STAGE_SCORES: Record<Lead["stage"], number> = {
  "Closed Won": 1.0,
  "Qualified": 0.8,
  "Follow Up": 0.6,
  "Contacted": 0.4,
  "New": 0.2,
  "Closed Lost": 0.1,
};

const TAG_SCORES: Record<string, number> = {
  "VIP": 25,
  "Hot": 20,
  "High Value": 18,
  "Urgent": 15,
  "Warm": 12,
  "Returning Customer": 10,
  "Follow-up": 5,
  "Bulk": 3,
  "Low Priority": -5,
};

export function calculateLeadScore(lead: Lead): number {
  let totalScore = 0;

  // Source score (0-15 points)
  const sourceMultiplier = SOURCE_SCORES[lead.source] || 0.5;
  totalScore += WEIGHTS.source * sourceMultiplier;

  // Stage score (0-25 points)
  const stageMultiplier = STAGE_SCORES[lead.stage] || 0.2;
  totalScore += WEIGHTS.stage * stageMultiplier;

  // Tags score (0-15 points, capped)
  let tagScore = 0;
  lead.tags.forEach((tag) => {
    tagScore += TAG_SCORES[tag] || 2;
  });
  totalScore += Math.min(WEIGHTS.tags, Math.max(0, (tagScore / 30) * WEIGHTS.tags));

  // Activity score (0-20 points)
  const activityCount = (lead.timeline?.length || 0) + (lead.notes?.length || 0);
  const completedTasks = lead.tasks?.filter((t) => t.status === "completed").length || 0;
  const activityMultiplier = Math.min(1, (activityCount + completedTasks * 2) / 10);
  totalScore += WEIGHTS.activity * activityMultiplier;

  // Value score (0-15 points)
  const valueMultiplier = Math.min(1, lead.leadValue / 3000);
  totalScore += WEIGHTS.value * valueMultiplier;

  // Recency score (0-10 points) - newer leads get higher scores
  const daysSinceCreation = Math.floor(
    (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  const recencyMultiplier = Math.max(0, 1 - daysSinceCreation / 60);
  totalScore += WEIGHTS.recency * recencyMultiplier;

  return Math.round(Math.min(100, Math.max(0, totalScore)));
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Hot", color: "text-red-500" };
  if (score >= 60) return { label: "Warm", color: "text-orange-500" };
  if (score >= 40) return { label: "Neutral", color: "text-yellow-500" };
  if (score >= 20) return { label: "Cool", color: "text-blue-500" };
  return { label: "Cold", color: "text-slate-500" };
}

export function recalculateAllScores(leads: Lead[]): Lead[] {
  return leads.map((lead) => ({
    ...lead,
    leadScore: calculateLeadScore(lead),
  }));
}
