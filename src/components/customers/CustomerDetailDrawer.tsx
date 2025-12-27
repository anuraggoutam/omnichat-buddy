import { X, User, MessageSquare, ShoppingCart, TrendingUp, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChannelBadge } from "@/components/conversations/ChannelBadge";
import { formatDistanceToNow, format } from "date-fns";

interface CustomerDetailDrawerProps {
  customer: any;
  open: boolean;
  onClose: () => void;
}

// Re-using the getStatusColor logic from Customers.tsx
const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-success/10 text-success";
    case "Returning":
      return "bg-accent/10 text-accent";
    case "Lead":
      return "bg-warning/10 text-warning";
    case "New User":
      return "bg-primary/10 text-primary";
    case "VIP":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
    default:
      return "bg-muted/60 text-muted-foreground";
  }
};

const mockOrderHistory = [
  { id: "ORD-2401-1234", date: "2024-01-18", amount: 850, status: "Delivered" },
  { id: "ORD-2401-1235", date: "2024-01-15", amount: 1200, status: "Delivered" },
  { id: "ORD-2401-1220", date: "2024-01-10", amount: 650, status: "Delivered" },
];

const suggestedTags = ["VIP", "Hot Lead", "Bulk Order", "Repeat Buyer", "Premium"];

export const CustomerDetailDrawer = ({ customer, open, onClose }: CustomerDetailDrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] md:w-[480px] bg-card border-l border-border shadow-xl z-50 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl">
              {customer.avatar}
            </div>
            <div>
              <h2 className="text-responsive-xl font-semibold text-foreground">{customer.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{customer.phone}</p>
              <div className="flex items-center gap-2 mt-2">
                <ChannelBadge channel={customer.source} />
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {customer.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 text-sm"> {/* Standardized text size */}
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="flex-1 text-sm"> {/* Standardized text size */}
            View in Conversations
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer ID</span>
                <span className="font-medium text-foreground">{customer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language</span>
                <span className="font-medium text-foreground">{customer.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined On</span>
                <span className="font-medium text-foreground">
                  {format(new Date(customer.joinedOn), "MMM dd, yyyy")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source Channel</span>
                <ChannelBadge channel={customer.source} />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-muted-foreground mb-2 block">Notes</label>
              <Textarea
                placeholder="Add notes about this customer..."
                className="min-h-[80px]"
              />
            </div>
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
                  ₹{customer.lifetimeValue.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
                <p className="text-xl font-bold text-foreground">{customer.totalOrders}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Total Chats</p>
                <p className="text-xl font-bold text-foreground">{customer.totalChats}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Avg Response</p>
                <p className="text-xl font-bold text-foreground">{customer.avgResponseTime}</p>
              </div>
            </div>
            <div className="mt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Active</span>
                <span className="font-medium text-foreground">
                  {formatDistanceToNow(new Date(customer.lastActive), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order History */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Order History</h3>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrderHistory.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-xs">{order.id}</TableCell>
                      <TableCell className="text-xs">
                        {format(new Date(order.date), "MMM dd")}
                      </TableCell>
                      <TableCell className="text-right text-xs font-semibold">
                        ₹{order.amount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="bg-success/10 text-success" // Using design system colors
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {customer.tags.map((tag: string) => (
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
                  .filter((tag) => !customer.tags.includes(tag))
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
