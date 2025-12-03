import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Copy,
  Trash2,
  Calendar,
  Users,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  ChevronLeft,
  Filter,
  Loader2,
} from "lucide-react";
import { BroadcastDetailDrawer } from "@/components/broadcasts/BroadcastDetailDrawer";
import { CreateBroadcastModal } from "@/components/broadcasts/CreateBroadcastModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Collapsible,
} from "@/components/ui/collapsible";
import { useBroadcasts, useCreateBroadcast, useDeleteBroadcast, useSendBroadcast, Broadcast } from "@/hooks/useBroadcasts";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Broadcasts() {
  const isMobile = useIsMobile();
  const { data: broadcasts = [], isLoading } = useBroadcasts();
  const createBroadcast = useCreateBroadcast();
  const deleteBroadcast = useDeleteBroadcast();
  const sendBroadcast = useSendBroadcast();

  const [selectedBroadcast, setSelectedBroadcast] = useState<Broadcast | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Broadcasts");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const statusConfig = {
    sent: { color: "bg-success text-success-foreground", icon: CheckCircle },
    draft: { color: "bg-muted text-muted-foreground", icon: FileText },
    scheduled: { color: "bg-accent text-accent-foreground", icon: Clock },
    sending: { color: "bg-warning text-warning-foreground", icon: Send },
    failed: { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
  };

  const filters = [
    { name: "All Broadcasts", icon: Send },
    { name: "draft", icon: FileText },
    { name: "scheduled", icon: Clock },
    { name: "sending", icon: Send },
    { name: "sent", icon: CheckCircle },
    { name: "failed", icon: AlertCircle },
  ];

  const audienceFilters = [
    "All Customers",
    "New Customers",
    "Returning Customers",
    "High-Value Customers",
    "VIP Customers",
  ];

  const filteredBroadcasts = broadcasts.filter((broadcast) => {
    const matchesSearch = broadcast.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All Broadcasts") return matchesSearch;
    return matchesSearch && broadcast.status === activeFilter;
  });

  const handleViewBroadcast = (broadcast: Broadcast) => {
    setSelectedBroadcast(broadcast);
    setIsDetailDrawerOpen(true);
  };

  const handleDuplicate = async (broadcast: Broadcast) => {
    try {
      await createBroadcast.mutateAsync({
        name: `${broadcast.name} (Copy)`,
        channel: broadcast.channel,
        template_id: broadcast.template_id || undefined,
        audience_filter: broadcast.audience_filter,
      });
      toast.success("Broadcast duplicated");
    } catch (error) {
      toast.error("Failed to duplicate broadcast");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBroadcast.mutateAsync(id);
      toast.success("Broadcast deleted");
    } catch (error) {
      toast.error("Failed to delete broadcast");
    }
  };

  const handleSend = async (id: string) => {
    try {
      await sendBroadcast.mutateAsync(id);
      toast.success("Broadcast sent");
    } catch (error) {
      toast.error("Failed to send broadcast");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Filters (Collapsible on Mobile) */}
      {isMobile ? (
        <Collapsible open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <div className={cn(
            "fixed inset-0 z-50 bg-background transition-transform",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <div className="w-64 h-full border-r border-border bg-card">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="h-[calc(100%-57px)]">
                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-foreground">Status</h3>
                    <div className="space-y-1">
                      {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                          <button
                            key={filter.name}
                            onClick={() => {
                              setActiveFilter(filter.name);
                              setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                              activeFilter === filter.name
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-foreground">Audience</h3>
                    <div className="space-y-1">
                      {audienceFilters.map((filter) => (
                        <button
                          key={filter}
                          className="w-full text-left px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted transition-colors"
                        >
                          <Users className="h-4 w-4 inline mr-2" />
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-foreground">Date Range</h3>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Last 30 days
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </Collapsible>
      ) : (
        <div className="w-64 border-r border-border bg-card flex-shrink-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Status</h3>
                <div className="space-y-1">
                  {filters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                      <button
                        key={filter.name}
                        onClick={() => setActiveFilter(filter.name)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          activeFilter === filter.name
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Audience</h3>
                <div className="space-y-1">
                  {audienceFilters.map((filter) => (
                    <button
                      key={filter}
                      className="w-full text-left px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Users className="h-4 w-4 inline mr-2" />
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">Date Range</h3>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 days
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-border bg-card px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="h-9 w-9 flex-shrink-0"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              )}
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">Broadcasts</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
                  Manage your broadcast campaigns
                </p>
              </div>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 flex-shrink-0 text-xs sm:text-sm" size="sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">New Broadcast</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search broadcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 sm:h-10"
            />
          </div>
        </div>

        {/* Table / Card View */}
        <ScrollArea className="flex-1">
          <div className="p-4 sm:p-6">
            {filteredBroadcasts.length === 0 ? (
              <Card className="p-12 text-center">
                <Send className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  No broadcasts found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || activeFilter !== "All Broadcasts"
                    ? "Try adjusting your filters"
                    : "Create your first broadcast to get started"}
                </p>
                {!searchQuery && activeFilter === "All Broadcasts" && (
                  <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Broadcast
                  </Button>
                )}
              </Card>
            ) : isMobile ? (
              // Mobile Card View
              <div className="space-y-3">
                {filteredBroadcasts.map((broadcast) => {
                  const StatusIcon = statusConfig[broadcast.status as keyof typeof statusConfig]?.icon;
                  return (
                    <Card
                      key={broadcast.id}
                      className="cursor-pointer hover:shadow-md transition-all"
                      onClick={() => handleViewBroadcast(broadcast)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base mb-1">{broadcast.name}</CardTitle>
                            <Badge
                              className={`${statusConfig[broadcast.status as keyof typeof statusConfig]?.color} gap-1 mb-2`}
                            >
                              {StatusIcon && <StatusIcon className="h-3 w-3" />}
                              {broadcast.status}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewBroadcast(broadcast)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {broadcast.status === "draft" && (
                                <DropdownMenuItem onClick={() => handleSend(broadcast.id)}>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Now
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleDuplicate(broadcast)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(broadcast.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{broadcast.total_recipients || 0}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{broadcast.channel}</span>
                        </div>
                        <div className="space-y-1 text-xs pt-2 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Delivered:</span>
                            <span className="font-medium">{broadcast.delivered_count || 0}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Read:</span>
                            <span className="font-medium text-success">{broadcast.read_count || 0}</span>
                          </div>
                          {broadcast.scheduled_at && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Scheduled:</span>
                              <span>{format(new Date(broadcast.scheduled_at), "MMM d, HH:mm")}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              // Desktop Table View
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Scheduled At</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBroadcasts.map((broadcast) => {
                      const StatusIcon = statusConfig[broadcast.status as keyof typeof statusConfig]?.icon;
                      return (
                        <TableRow
                          key={broadcast.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewBroadcast(broadcast)}
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">{broadcast.name}</div>
                              {broadcast.template?.name && (
                                <div className="text-xs text-muted-foreground">
                                  Template: {broadcast.template.name}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{broadcast.channel}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">{broadcast.total_recipients || 0}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={statusConfig[broadcast.status as keyof typeof statusConfig]?.color}
                            >
                              {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
                              {broadcast.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {broadcast.scheduled_at ? (
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                {format(new Date(broadcast.scheduled_at), "MMM d, HH:mm")}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              <div className="flex gap-2">
                                <span className="text-muted-foreground">Delivered:</span>
                                <span className="font-medium">{broadcast.delivered_count || 0}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-muted-foreground">Read:</span>
                                <span className="font-medium text-success">{broadcast.read_count || 0}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewBroadcast(broadcast)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                {broadcast.status === "draft" && (
                                  <DropdownMenuItem onClick={() => handleSend(broadcast.id)}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Now
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => handleDuplicate(broadcast)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(broadcast.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Broadcast Detail Drawer */}
      <BroadcastDetailDrawer
        broadcast={selectedBroadcast}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />

      {/* Create Broadcast Modal */}
      <CreateBroadcastModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
