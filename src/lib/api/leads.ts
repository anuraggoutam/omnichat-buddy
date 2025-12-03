// src/lib/api/leads.ts

import { Lead } from "@/lib/mockLeads"; // We can reuse the type definition for now

// A placeholder for what an API response for leads might look like
export interface GetLeadsResponse {
  leads: Lead[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// A placeholder for filter options
export interface LeadsFilters {
  searchTerm?: string;
  source?: string;
  stage?: string;
  agentId?: string;
  page?: number;
  pageSize?: number;
}

const API_BASE_URL = "/api"; // Using a placeholder base URL

/**
 * Fetches leads from the API.
 * In a real app, this would make a network request.
 * For now, it will simulate a delay and return mock data.
 */
export const getLeads = async (filters: LeadsFilters = {}): Promise<GetLeadsResponse> => {
  console.log("Fetching leads with filters:", filters);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real implementation, you'd build query params from filters
  // e.g., /api/leads?searchTerm=...&page=...

  // For now, we'll just return a mock response.
  // The filtering logic that was in the component will eventually be on the backend.
  const mockLeads: Lead[] = []; // In a real app, this would come from a dynamic import or be removed.
  return {
    leads: mockLeads,
    totalCount: mockLeads.length,
    page: filters.page || 1,
    pageSize: filters.pageSize || 10,
  };
};

/**
 * Adds a new lead.
 */
export const addLead = async (newLeadData: Omit<Lead, "id" | "createdAt">): Promise<Lead> => {
  console.log("Adding new lead:", newLeadData);
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLeadData),
  });
  if (!response.ok) {
    throw new Error("Failed to add lead");
  }
  // Let's pretend the API returns the created lead with a new ID and createdAt
  const createdLead: Lead = {
    ...newLeadData,
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  return createdLead;
};

/**
 * Updates an existing lead.
 */
export const updateLead = async (leadId: string, updatedData: Partial<Lead>): Promise<Lead> => {
  console.log(`Updating lead ${leadId}:`, updatedData);
  const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Failed to update lead");
  }
  // Let's pretend the API returns the full updated lead
  const updatedLead: Lead = {
      // This is just a mock, a real implementation would get this from the response
      id: leadId,
      name: "Updated Name",
      email: "updated@example.com",
      phone: "1234567890",
      stage: "Contacted",
      source: "Website",
      leadScore: 80,
      leadValue: 0,
      assignedAgentId: "agent_1",
      createdAt: new Date().toISOString(),
      tags: [],
      notes: [],
      timeline: [],
      tasks: [],
      ...updatedData
  }
  return updatedLead;
};

/**
 * Deletes a lead.
 */
export const deleteLead = async (leadId: string): Promise<{ success: boolean }> => {
  console.log(`Deleting lead ${leadId}`);
  const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete lead");
  }
  return { success: true };
};

/**
 * Placeholder for bulk actions
 */
export const bulkUpdateLeads = async (
  leadIds: string[],
  action: { type: "assign" | "stage" | "delete"; payload: any }
): Promise<{ success: boolean }> => {
  console.log(`Bulk updating ${leadIds.length} leads with action:`, action);
  const response = await fetch(`${API_BASE_URL}/leads/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ leadIds, action }),
  });
   if (!response.ok) {
    throw new Error("Failed to perform bulk action");
  }
  return { success: true };
};
