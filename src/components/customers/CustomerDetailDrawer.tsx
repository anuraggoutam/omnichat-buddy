import { X, User, MessageSquare, ShoppingCart, TrendingUp, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChannelBadge } from "@/components/conversations/ChannelBadge";
import { formatDistanceToNow, format } from "date-fns";
import { Contact } from "@/hooks/useContacts";

interface CustomerDetailDrawerProps {
  customer: Contact | any | null;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

const suggestedTags = ["VIP", "Hot Lead", "Bulk Order", "Repeat Buyer", "Premium"];

export const CustomerDetailDrawer = ({ customer, open, onOpenChange, onClose }: CustomerDetailDrawerProps) => {
  if (!open || !customer) return null;

  const handleClose = () => {
    onOpenChange?.(false);
    onClose?.();
  };

  // Support both old mock data format and new Contact format
  const name = customer.name || "Unknown";
  const phone = customer.phone || "";
  const email = customer.email || "";
  const channel = customer.channel || customer.source || "whatsapp";
  const tags = customer.tags || [];
  const lifetimeValue = customer.lifetime_value || customer.lifetimeValue || 0;
  const totalOrders = customer.total_orders || customer.totalOrders || 0;
  const isVip = customer.is_vip || customer.tags?.includes("VIP") || false;
  const lastActive = customer.last_active || customer.lastActive;
  const avatarUrl = customer.avatar_url || customer.avatar;
  const notes = customer.notes || "";
  const createdAt = customer.created_at || customer.joinedOn;

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] max-w-full bg-card border-l border-border shadow-xl z-50 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="text-2xl">
                {name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{name}</h2>
              {phone && <p className="text-sm text-muted-foreground mt-1">{phone}</p>}
              {email && <p className="text-sm text-muted-foreground">{email}</p>}
              <div className="flex items-center gap-2 mt-2">
                <ChannelBadge channel={channel} />
                {isVip && <Badge className="bg-warning/10 text-warning">VIP</Badge>}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="flex-1">
            View Conversations
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Customer Info</h3>
            </div>
            <div className="space-y-2 text-sm">
              {customer.id && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer ID</span>
                  <span className="font-medium text-foreground font-mono text-xs">
                    {customer.id.slice(0, 8)}...
                  </span>
                </div>
              )}
              {createdAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Joined On</span>
                  <span className="font-medium text-foreground">
                    {format(new Date(createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Channel</span>
                <ChannelBadge channel={channel} />
              </div>
            </div>

            {notes && (
              <div className="mt-4">
                <label className="text-sm text-muted-foreground mb-2 block">Notes</label>
                <Textarea
                  defaultValue={notes}
                  placeholder="Add notes about this customer..."
                  className="min-h-[80px]"
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Insights */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Insights</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Lifetime Value</p>
                <p className="text-xl font-bold text-foreground">
                  ${Number(lifetimeValue).toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
                <p className="text-xl font-bold text-foreground">{totalOrders}</p>
              </div>
            </div>
            {lastActive && (
              <div className="mt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Active</span>
                  <span className="font-medium text-foreground">
                    {formatDistanceToNow(new Date(lastActive), { addSuffix: true })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                  <X className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" />
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mb-3">
              <Plus className="h-4 w-4 mr-2" />
              Add Tag
            </Button>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags
                  .filter((tag) => !tags.includes(tag))
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
