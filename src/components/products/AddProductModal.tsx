import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = ["Cakes", "Cupcakes", "Pastries", "Cookies", "Breads", "Jars"];
const channels = [
  { id: "whatsapp", label: "WhatsApp", emoji: "🟢" },
  { id: "instagram", label: "Instagram", emoji: "🟣" },
  { id: "facebook", label: "Facebook", emoji: "🔵" },
  { id: "website", label: "Website", emoji: "🌐" },
  { id: "email", label: "Email", emoji: "✉️" },
];

export const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleSubmit = () => {
    // Mock submit - just close the modal
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product for your catalog
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name *</Label>
            <Input id="product-name" placeholder="e.g., Chocolate Truffle Cake" />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input id="price" type="number" placeholder="850" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a detailed description of your product..."
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>

          {/* Initial Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Initial Stock</Label>
            <Input id="stock" type="number" placeholder="0" />
          </div>

          {/* Channels */}
          <div className="space-y-3">
            <Label>Available Channels</Label>
            <div className="space-y-2">
              {channels.map((channel) => (
                <div key={channel.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={channel.id}
                    checked={selectedChannels.includes(channel.id)}
                    onCheckedChange={() => handleChannelToggle(channel.id)}
                  />
                  <label
                    htmlFor={channel.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {channel.emoji} {channel.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Create Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
