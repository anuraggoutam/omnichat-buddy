import { X, Package, TrendingUp, Zap, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

interface ProductDetailDrawerProps {
  product: any;
  open: boolean;
  onClose: () => void;
}

const getChannelBadge = (channel: string) => {
  const badges: Record<string, { emoji: string; color: string }> = {
    WhatsApp: { emoji: "🟢", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    Instagram: { emoji: "🟣", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
    Facebook: { emoji: "🔵", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    Website: { emoji: "🌐", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400" },
    Email: { emoji: "✉️", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
  };
  return badges[channel] || badges.Website;
};

const getStockStatus = (status: string) => {
  switch (status) {
    case "Available":
      return { color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", label: "Available" };
    case "Low Stock":
      return { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", label: "Low Stock" };
    case "Out of Stock":
      return { color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", label: "Out of Stock" };
    default:
      return { color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", label: "Unknown" };
  }
};

export const ProductDetailDrawer = ({ product, open, onClose }: ProductDetailDrawerProps) => {
  if (!open) return null;

  const stockStatus = getStockStatus(product.status);

  return (
    <div className="fixed inset-y-0 right-0 w-[440px] bg-card border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-3xl">
              {product.image}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{product.name}</h2>
              <p className="text-2xl font-bold text-foreground mt-1">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
          <Badge variant="outline">{product.id}</Badge>
        </div>
        <Button className="w-full mt-4" variant="outline">
          Edit Product
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Product Info</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product ID</span>
                <span className="font-medium text-foreground">{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <div className="pt-2">
                <span className="text-muted-foreground">Description</span>
                <p className="text-foreground mt-1">{product.description}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Inventory */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Inventory</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Current Stock</span>
                <span className="font-semibold text-lg text-foreground">
                  {product.stock} units
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Stock Status</span>
                <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
              </div>
              <Button className="w-full" variant="outline" size="sm">
                Update Inventory
              </Button>
            </div>
          </div>

          <Separator />

          {/* Sales Insights */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Sales Insights</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lifetime Sales</span>
                <span className="font-medium text-foreground">
                  {product.lifetimeSales} orders
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Sales</span>
                <span className="font-medium text-foreground">
                  {product.monthlySales} orders
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Ordered</span>
                <span className="font-medium text-foreground">
                  {formatDistanceToNow(new Date(product.lastOrdered), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Channels */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Plug className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Connected Channels</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.channels.map((channel: string) => {
                const badge = getChannelBadge(channel);
                return (
                  <Badge key={channel} className={badge.color}>
                    {badge.emoji} {channel}
                  </Badge>
                );
              })}
            </div>
            <Button className="w-full" variant="outline" size="sm">
              Add Channel
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
