import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Broadcast {
  id: string;
  tenant_id: string;
  name: string;
  template_id: string | null;
  channel: string;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  audience_filter: any;
  total_recipients: number | null;
  delivered_count: number | null;
  read_count: number | null;
  failed_count: number | null;
  created_at: string;
  updated_at: string;
  template?: {
    id: string;
    name: string;
    content: string;
  };
}

export interface BroadcastRecipient {
  id: string;
  broadcast_id: string;
  contact_id: string;
  status: string;
  sent_at: string | null;
  delivered_at: string | null;
  read_at: string | null;
  error_message: string | null;
  contact?: {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
  };
}

export function useBroadcasts() {
  return useQuery({
    queryKey: ["broadcasts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("broadcasts")
        .select(`
          *,
          template:message_templates(id, name, content)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Broadcast[];
    },
  });
}

export function useBroadcast(broadcastId: string | null) {
  return useQuery({
    queryKey: ["broadcast", broadcastId],
    queryFn: async () => {
      if (!broadcastId) return null;
      const { data, error } = await supabase
        .from("broadcasts")
        .select(`
          *,
          template:message_templates(id, name, content)
        `)
        .eq("id", broadcastId)
        .single();

      if (error) throw error;
      return data as Broadcast;
    },
    enabled: !!broadcastId,
  });
}

export function useBroadcastRecipients(broadcastId: string | null) {
  return useQuery({
    queryKey: ["broadcast-recipients", broadcastId],
    queryFn: async () => {
      if (!broadcastId) return [];
      const { data, error } = await supabase
        .from("broadcast_recipients")
        .select(`
          *,
          contact:contacts(id, name, phone, email)
        `)
        .eq("broadcast_id", broadcastId);

      if (error) throw error;
      return data as BroadcastRecipient[];
    },
    enabled: !!broadcastId,
  });
}

export function useCreateBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (broadcast: {
      name: string;
      template_id?: string;
      channel: string;
      scheduled_at?: string;
      audience_filter?: any;
      contact_ids?: string[];
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { contact_ids, ...broadcastData } = broadcast;

      // Create the broadcast
      const { data, error } = await supabase
        .from("broadcasts")
        .insert({
          ...broadcastData,
          tenant_id: user.id,
          status: broadcast.scheduled_at ? "scheduled" : "draft",
          total_recipients: contact_ids?.length || 0,
        })
        .select()
        .single();

      if (error) throw error;

      // Add recipients if provided
      if (contact_ids && contact_ids.length > 0) {
        const recipients = contact_ids.map((contactId) => ({
          broadcast_id: data.id,
          contact_id: contactId,
          status: "pending",
        }));

        const { error: recipientError } = await supabase
          .from("broadcast_recipients")
          .insert(recipients);

        if (recipientError) throw recipientError;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
    },
  });
}

export function useUpdateBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Broadcast> & { id: string }) => {
      const { data, error } = await supabase
        .from("broadcasts")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
    },
  });
}

export function useDeleteBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (broadcastId: string) => {
      const { error } = await supabase
        .from("broadcasts")
        .delete()
        .eq("id", broadcastId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
    },
  });
}

export function useSendBroadcast() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (broadcastId: string) => {
      // Update broadcast status to sending
      const { data, error } = await supabase
        .from("broadcasts")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
        })
        .eq("id", broadcastId)
        .select()
        .single();

      if (error) throw error;

      // In a real app, this would trigger an edge function to actually send messages
      // For now, we'll just update the recipient statuses
      await supabase
        .from("broadcast_recipients")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
        })
        .eq("broadcast_id", broadcastId);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
    },
  });
}
