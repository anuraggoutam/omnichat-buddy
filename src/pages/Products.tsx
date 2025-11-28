import { useState } from "react";
import { Search, Plus, MoreVertical, Package } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoProducts } from "@/lib/mockData";
import { ProductDetailDrawer } from "@/components/products/ProductDetailDrawer";
import { AddProductModal } from "@/components/products/AddProductModal";

const statusFilters = [
  { id: "all", label: "All" },
  { id: "available", label: "Available" },
  { id: "low-stock", label: "Low Stock" },
  { id: "out-of-stock", label: "Out of Stock" },
];

const categories = ["All", "Cakes", "Cupcakes", "Pastries", "Cookies", "Breads", "Jars"];

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
      return { color: "bg-green-500", label: "Available" };
    case "Low Stock":
      return { color: "bg-yellow-500", label: "Low Stock" };
    case "Out of Stock":
      return { color: "bg-red-500", label: "Out of Stock" };
    default:
      return { color: "bg-gray-500", label: "Unknown" };
  }
};

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = demoProducts.filter((product) => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status filter
    if (statusFilter === "available" && product.status !== "Available") return false;
    if (statusFilter === "low-stock" && product.status !== "Low Stock") return false;
    if (statusFilter === "out-of-stock" && product.status !== "Out of Stock") return false;

    // Category filter
    if (categoryFilter !== "All" && product.category !== categoryFilter) return false;

    return true;
  });

  const selectedProduct = demoProducts.find((product) => product.id === selectedProductId);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-3">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Products</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Manage your product catalog
              </p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="flex-shrink-0 text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 sm:h-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-9 sm:h-10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <Badge
                key={f.id}
                variant={statusFilter === f.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setStatusFilter(f.id)}
              >
                {f.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6">
          <div className="rounded-lg border border-border bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Channels</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No products found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.status);
                    return (
                      <TableRow
                        key={product.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedProductId(product.id)}
                      >
                        <TableCell>
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                            {product.image}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {product.channel.map((channel) => {
                              const badge = getChannelBadge(channel);
                              return (
                                <Badge key={channel} className={badge.color + " text-xs"}>
                                  {badge.emoji} {channel}
                                </Badge>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{product.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${stockStatus.color}`} />
                            <span className="text-sm">
                              {product.stock} {product.stock === 1 ? "unit" : "units"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px] bg-card">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>

      {/* Product Detail Drawer */}
      {selectedProduct && (
        <ProductDetailDrawer
          product={selectedProduct}
          open={!!selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}

      {/* Add Product Modal */}
      <AddProductModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default Products;
