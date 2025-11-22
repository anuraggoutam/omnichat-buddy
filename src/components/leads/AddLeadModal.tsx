import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lead } from "@/lib/mockLeads";
import { toast } from "sonner";

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
}

export function AddLeadModal({ open, onClose, onAddLead }: AddLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Manual" as Lead["source"],
    leadValue: "0",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Name and phone are required");
      return;
    }

    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      source: formData.source,
      leadValue: parseInt(formData.leadValue) || 0,
      createdAt: new Date().toISOString(),
      tags: [],
      leadScore: 50,
      assignedAgentId: null,
      stage: "New",
      notes: [],
      timeline: [
        {
          id: `tl_${Date.now()}`,
          type: "created",
          text: "Lead created",
          createdAt: new Date().toISOString(),
        },
      ],
      tasks: [],
    };

    onAddLead(newLead);
    toast.success("Lead added successfully");
    setFormData({
      name: "",
      phone: "",
      email: "",
      source: "Manual",
      leadValue: "0",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1234567890"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <Label htmlFor="source">Source</Label>
            <Select
              value={formData.source}
              onValueChange={(value: Lead["source"]) =>
                setFormData({ ...formData, source: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Landing Page">Landing Page</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="leadValue">Lead Value ($)</Label>
            <Input
              id="leadValue"
              type="number"
              value={formData.leadValue}
              onChange={(e) =>
                setFormData({ ...formData, leadValue: e.target.value })
              }
              placeholder="0"
              min="0"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
