import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { demoOrders } from "@/lib/mockData";
import { ChannelBadge } from "@/components/conversations/ChannelBadge";
import { OrderDetailDrawer } from "@/components/orders/OrderDetailDrawer";
import { formatDistanceToNow } from "date-fns";

const filters = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "packed", label: "Packed" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
  { id: "whatsapp", label: "🟢 WA" },
  { id: "instagram", label: "🟣 IG" },
  { id: "facebook", label: "🔵 FB" },
  { id: "website", label: "💬 Site" },
  { id: "email", label: "✉️ Email" },
  { id: "cod", label: "COD" },
  { id: "prepaid", label: "Prepaid" },
];

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

const getPaymentColor = (method: string) => {
  return method === "prepaid"
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
};

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = demoOrders.filter((order) => {
    // Search filter
    if (
      searchQuery &&
      !order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Status filters
    if (filter === "pending" && order.fulfillmentStatus !== "pending") return false;
    if (filter === "confirmed" && order.fulfillmentStatus !== "confirmed") return false;
    if (filter === "packed" && order.fulfillmentStatus !== "packed") return false;
    if (filter === "shipped" && order.fulfillmentStatus !== "shipped") return false;
    if (filter === "delivered" && order.fulfillmentStatus !== "delivered") return false;
    if (filter === "cancelled" && order.fulfillmentStatus !== "cancelled") return false;

    // Channel filters
    if (filter === "whatsapp" && order.channel !== "whatsapp") return false;
    if (filter === "instagram" && order.channel !== "instagram") return false;
    if (filter === "facebook" && order.channel !== "facebook") return false;
    if (filter === "website" && order.channel !== "website") return false;
    if (filter === "email" && order.channel !== "email") return false;

    // Payment method filters
    if (filter === "cod" && order.paymentMethod !== "cod") return false;
    if (filter === "prepaid" && order.paymentMethod !== "prepaid") return false;

    return true;
  });

  const selectedOrder = demoOrders.find((order) => order.id === selectedOrderId);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
              <p className="text-sm text-muted-foreground mt-1">
                All orders across all channels
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ChevronDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders, customers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Badge
                key={f.id}
                variant={filter === f.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-center">Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No orders found — try changing filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{order.customer.avatar}</span>
                          <span>{order.customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{order.total.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentColor(order.paymentMethod)}>
                          {order.paymentMethod.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.fulfillmentStatus)}>
                          {order.fulfillmentStatus.charAt(0).toUpperCase() +
                            order.fulfillmentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ChannelBadge channel={order.channel} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <OrderDetailDrawer
          order={selectedOrder}
          open={!!selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
};

export default Orders;
