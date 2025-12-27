import { useState } from "react";
import { Search, Plus, MoreVertical, Users as UsersIcon, Upload } from "lucide-react";
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
import { demoCustomers } from "@/lib/mockData";
import { ChannelBadge } from "@/components/conversations/ChannelBadge";
import { CustomerDetailDrawer } from "@/components/customers/CustomerDetailDrawer";
import { AddCustomerModal } from "@/components/customers/AddCustomerModal";
import { formatDistanceToNow } from "date-fns";
import { EmptyState } from "@/components/ui/empty-state";

const statusFilters = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "returning", label: "Returning" },
  { id: "lead", label: "Hot Leads" },
  { id: "vip", label: "VIP" },
  { id: "new", label: "New Users" },
];

const sourceChannels = ["All", "WhatsApp", "Instagram", "Facebook", "Website", "Email"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-success/10 text-success";
    case "Returning":
      return "bg-accent/10 text-accent";
    case "Lead":
      return "bg-warning/10 text-warning";
    case "New User": // Assuming "New Users" or similar maps to this
      return "bg-primary/10 text-primary";
    case "VIP": // Assuming "VIP" maps to this
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"; // Using a different color for VIP
    default:
      return "bg-muted/60 text-muted-foreground";
  }
};

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredCustomers = demoCustomers.filter((customer) => {
    // Search filter
    if (
      searchQuery &&
      !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !customer.phone.includes(searchQuery)
    ) {
      return false;
    }

    // Status filter
    if (statusFilter === "active" && customer.status !== "Active") return false;
    if (statusFilter === "returning" && customer.status !== "Returning") return false;
    if (statusFilter === "lead" && customer.status !== "Lead") return false;
    if (statusFilter === "vip" && !customer.tags.includes("VIP")) return false;
    if (statusFilter === "new" && customer.totalOrders === 0) return false;

    // Source filter
    if (sourceFilter !== "All") {
      const sourceMap: Record<string, string> = {
        WhatsApp: "whatsapp",
        Instagram: "instagram",
        Facebook: "facebook",
        Website: "website",
        Email: "email",
      };
      if (customer.source !== sourceMap[sourceFilter]) return false;
    }

    return true;
  });

  const selectedCustomer = demoCustomers.find((customer) => customer.id === selectedCustomerId);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-3">
            <div className="min-w-0">
              <h1 className="text-responsive-2xl font-bold text-foreground">Customers</h1>
              <p className="text-responsive-sm text-muted-foreground mt-1">
                Manage your customer relationships
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="secondary" size="sm" className="hidden sm:flex text-sm"> {/* Changed to secondary, text size */}
                <Upload className="h-4 w-4 mr-2" /> {/* Standardized icon size */}
                Import
              </Button>
              <Button onClick={() => setIsAddModalOpen(true)} size="sm" className="text-sm"> {/* Standardized text size, default variant */}
                <Plus className="h-4 w-4 mr-2" /> {/* Standardized icon size */}
                <span className="hidden xs:inline">Add Customer</span> {/* Added xs:inline for more compact mobile */}
                <span className="xs:hidden">Add</span>
              </Button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 sm:h-10"
              />
            </div>

            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-9 sm:h-10">
                <SelectValue placeholder="Source Channel" />
              </SelectTrigger>
              <SelectContent>
                {sourceChannels.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
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

      {/* Customers Table */}
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6">
          {filteredCustomers.length === 0 ? (
            <Card>
              <EmptyState
                icon={<UsersIcon className="h-10 w-10 sm:h-12 sm:w-12" />}
                title="No customers found yet"
                description="Start chatting or import your customer list"
                action={{
                  label: "Import Customers",
                  onClick: () => setIsAddModalOpen(true),
                }}
              />
            </Card>
          ) : (
            <div className="rounded-lg border border-border bg-card overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead className="hidden sm:table-cell">Tags</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Lifetime Value</TableHead>
                    <TableHead className="hidden lg:table-cell">Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedCustomerId(customer.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                            {customer.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.length > 0 ? (
                            customer.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">No tags</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <ChannelBadge channel={customer.source} />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {customer.totalOrders}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{customer.lifetimeValue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-foreground">
                            {formatDistanceToNow(new Date(customer.lastActive), {
                              addSuffix: true,
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {customer.totalChats} chats
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px] bg-card">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Add Tag</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Block
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <CustomerDetailDrawer
          customer={selectedCustomer}
          open={!!selectedCustomerId}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}

      {/* Add Customer Modal */}
      <AddCustomerModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default Customers;
