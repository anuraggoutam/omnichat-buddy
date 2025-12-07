import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Search, MoreHorizontal, Mail, Phone, Star, UserPlus, Download, Filter } from "lucide-react";
import { toast } from "sonner";
import { AddCustomerModal } from "./AddCustomerModal";

interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  channel: string;
  is_vip: boolean | null;
  lifetime_value: number | null;
  total_orders: number | null;
  created_at: string | null;
  tags: string[] | null;
}

export function AdminCustomersTab() {
  const [customers, setCustomers] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.includes(searchQuery)
  );

  const handleDeleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      toast.success("Customer deleted successfully");
    } catch (err) {
      console.error("Error deleting customer:", err);
      toast.error("Failed to delete customer");
    }
  };

  const handleToggleVIP = async (id: string, currentStatus: boolean | null) => {
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ is_vip: !currentStatus })
        .eq("id", id);
      if (error) throw error;
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_vip: !currentStatus } : c))
      );
      toast.success(currentStatus ? "VIP status removed" : "Marked as VIP");
    } catch (err) {
      console.error("Error updating VIP status:", err);
      toast.error("Failed to update VIP status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddModal(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Lifetime Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{customer.name}</p>
                            {customer.tags && customer.tags.length > 0 && (
                              <div className="flex gap-1 mt-0.5">
                                {customer.tags.slice(0, 2).map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-[10px] px-1 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {customer.email && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </div>
                          )}
                          {customer.phone && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {customer.channel}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.total_orders || 0}</TableCell>
                      <TableCell>
                        ${(customer.lifetime_value || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {customer.is_vip && (
                          <Badge className="bg-warning/20 text-warning border-warning/30">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            VIP
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleToggleVIP(customer.id, customer.is_vip)}
                            >
                              <Star className="h-4 w-4 mr-2" />
                              {customer.is_vip ? "Remove VIP" : "Mark as VIP"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              Delete Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddCustomerModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onSuccess={fetchCustomers}
      />
    </div>
  );
}
