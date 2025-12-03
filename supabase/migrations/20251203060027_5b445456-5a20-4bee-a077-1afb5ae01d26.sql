-- Create message_templates table for reusable message templates
CREATE TABLE public.message_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  content TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create broadcasts table for bulk messaging
CREATE TABLE public.broadcasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name TEXT NOT NULL,
  template_id UUID REFERENCES public.message_templates(id),
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  status TEXT NOT NULL DEFAULT 'draft',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  audience_filter JSONB DEFAULT '{}',
  total_recipients INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  read_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create broadcast_recipients junction table
CREATE TABLE public.broadcast_recipients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  broadcast_id UUID NOT NULL REFERENCES public.broadcasts(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  UNIQUE(broadcast_id, contact_id)
);

-- Enable RLS on all tables
ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_recipients ENABLE ROW LEVEL SECURITY;

-- RLS policies for message_templates
CREATE POLICY "Users can view their own templates" ON public.message_templates
  FOR SELECT USING (auth.uid() = tenant_id);

CREATE POLICY "Users can create their own templates" ON public.message_templates
  FOR INSERT WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Users can update their own templates" ON public.message_templates
  FOR UPDATE USING (auth.uid() = tenant_id);

CREATE POLICY "Users can delete their own templates" ON public.message_templates
  FOR DELETE USING (auth.uid() = tenant_id);

-- RLS policies for broadcasts
CREATE POLICY "Users can view their own broadcasts" ON public.broadcasts
  FOR SELECT USING (auth.uid() = tenant_id);

CREATE POLICY "Users can create their own broadcasts" ON public.broadcasts
  FOR INSERT WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Users can update their own broadcasts" ON public.broadcasts
  FOR UPDATE USING (auth.uid() = tenant_id);

CREATE POLICY "Users can delete their own broadcasts" ON public.broadcasts
  FOR DELETE USING (auth.uid() = tenant_id);

-- RLS policies for broadcast_recipients (access through broadcasts)
CREATE POLICY "Users can view recipients of their broadcasts" ON public.broadcast_recipients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.broadcasts 
      WHERE broadcasts.id = broadcast_recipients.broadcast_id 
      AND broadcasts.tenant_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage recipients of their broadcasts" ON public.broadcast_recipients
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.broadcasts 
      WHERE broadcasts.id = broadcast_recipients.broadcast_id 
      AND broadcasts.tenant_id = auth.uid()
    )
  );

CREATE POLICY "Users can update recipients of their broadcasts" ON public.broadcast_recipients
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.broadcasts 
      WHERE broadcasts.id = broadcast_recipients.broadcast_id 
      AND broadcasts.tenant_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete recipients of their broadcasts" ON public.broadcast_recipients
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.broadcasts 
      WHERE broadcasts.id = broadcast_recipients.broadcast_id 
      AND broadcasts.tenant_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE TRIGGER update_message_templates_updated_at
  BEFORE UPDATE ON public.message_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_broadcasts_updated_at
  BEFORE UPDATE ON public.broadcasts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;