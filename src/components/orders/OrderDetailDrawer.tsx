import { X, Package, User, Clock, CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

interface OrderDetailDrawerProps {
  order: any;
  open: boolean;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "confirmed":
    case "packed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "cancelled":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    case "shipped":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const OrderDetailDrawer = ({ order, open, onClose }: OrderDetailDrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[440px] bg-card border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{order.id}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {format(new Date(order.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(order.fulfillmentStatus)}>
            {order.fulfillmentStatus.charAt(0).toUpperCase() +
              order.fulfillmentStatus.slice(1)}
          </Badge>
          <ChannelBadge channel={order.channel} />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Order Summary</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status</span>
                <span className="font-medium text-foreground capitalize">
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <Badge variant="outline" className="uppercase">
                  {order.paymentMethod}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-semibold text-lg text-foreground">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Customer Info</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">{order.customer.avatar}</span>
                <div>
                  <p className="font-medium text-foreground">{order.customer.name}</p>
                  <p className="text-muted-foreground text-xs">{order.customer.phone}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {order.customer.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Lifetime Value</span>
                <span className="font-medium text-foreground">
                  ₹{order.customer.ltv.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-medium text-foreground">
                  {order.customer.ltv > 5000 ? "12+" : "4"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Items List */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Order Items</h3>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.product.image}</span>
                          <span className="text-sm">{item.product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        ₹{item.product.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Order Timeline</h3>
            </div>
            <div className="space-y-3">
              {order.timeline.map((event: any, idx: number) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        idx === 0 ? "bg-primary" : "bg-muted"
                      }`}
                    />
                    {idx !== order.timeline.length - 1 && (
                      <div className="w-px h-full bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <p className="text-sm font-medium text-foreground">{event.event}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
