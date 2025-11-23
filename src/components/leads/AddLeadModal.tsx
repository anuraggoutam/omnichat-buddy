import { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";

type NewLeadData = Omit<
  Lead,
  "id" | "createdAt" | "tags" | "leadScore" | "assignedAgentId" | "stage" | "notes" | "timeline" | "tasks"
>;

interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onAddLead: (lead: NewLeadData) => void;
  isAdding?: boolean;
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  source: "Manual" as Lead["source"],
  leadValue: 0,
};

export function AddLeadModal({ open, onClose, onAddLead, isAdding }: AddLeadModalProps) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (open) {
      setFormData(initialFormData);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Name and phone are required");
      return;
    }

    onAddLead({
        ...formData,
        email: formData.email || null,
    });
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
              disabled={isAdding}
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
              disabled={isAdding}
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
              disabled={isAdding}
            />
          </div>

          <div>
            <Label htmlFor="source">Source</Label>
            <Select
              value={formData.source}
              onValueChange={(value: Lead["source"]) =>
                setFormData({ ...formData, source: value })
              }
              disabled={isAdding}
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
                setFormData({ ...formData, leadValue: parseInt(e.target.value) || 0 })
              }
              placeholder="0"
              min="0"
              disabled={isAdding}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isAdding}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAdding}>
              {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
