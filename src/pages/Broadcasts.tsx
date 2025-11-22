import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
} from "lucide-react";
import { mockBroadcasts } from "@/lib/mockData";
import { BroadcastDetailDrawer } from "@/components/broadcasts/BroadcastDetailDrawer";
import { CreateBroadcastModal } from "@/components/broadcasts/CreateBroadcastModal";

export default function Broadcasts() {
  const [selectedBroadcast, setSelectedBroadcast] = useState<any>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Broadcasts");
  const [searchQuery, setSearchQuery] = useState("");
  const [broadcasts, setBroadcasts] = useState(mockBroadcasts);

  const statusConfig = {
    Completed: { color: "bg-success text-success-foreground", icon: CheckCircle },
    Draft: { color: "bg-muted text-muted-foreground", icon: FileText },
    Scheduled: { color: "bg-accent text-accent-foreground", icon: Clock },
    Sending: { color: "bg-warning text-warning-foreground", icon: Send },
    Failed: { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
  };

  const filters = [
    { name: "All Broadcasts", icon: Send },
    { name: "Drafts", icon: FileText },
    { name: "Scheduled", icon: Clock },
    { name: "Sending", icon: Send },
    { name: "Completed", icon: CheckCircle },
    { name: "Failed", icon: AlertCircle },
  ];

  const audienceFilters = [
    "All Customers",
    "New Customers",
    "Returning Customers",
    "High-Value Customers",
    "VIP Customers",
    "Abandoned Cart",
  ];

  const filteredBroadcasts = broadcasts.filter((broadcast) => {
    const matchesSearch = broadcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broadcast.messagePreview.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All Broadcasts") return matchesSearch;
    if (activeFilter === "Drafts") return matchesSearch && broadcast.status === "Draft";
    if (activeFilter === "Scheduled") return matchesSearch && broadcast.status === "Scheduled";
    if (activeFilter === "Sending") return matchesSearch && broadcast.status === "Sending";
    if (activeFilter === "Completed") return matchesSearch && broadcast.status === "Completed";
    if (activeFilter === "Failed") return matchesSearch && broadcast.status === "Failed";
    
    return matchesSearch;
  });

  const handleViewBroadcast = (broadcast: any) => {
    setSelectedBroadcast(broadcast);
    setIsDetailDrawerOpen(true);
  };

  const handleDuplicate = (broadcast: any) => {
    const newBroadcast = {
      ...broadcast,
      id: `BR-${String(broadcasts.length + 1).padStart(3, "0")}`,
      title: `${broadcast.title} (Copy)`,
      status: "Draft",
      sent: 0,
      delivered: 0,
      read: 0,
      clicks: 0,
      failed: 0,
      createdAt: new Date().toISOString().split("T")[0],
      scheduledAt: null,
    };
    setBroadcasts([newBroadcast, ...broadcasts]);
  };

  const handleDelete = (id: string) => {
    setBroadcasts(broadcasts.filter((b) => b.id !== id));
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Filters */}
      <div className="w-64 border-r border-border bg-card">
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
                      {filter.name}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Broadcasts</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your WhatsApp broadcast campaigns
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Broadcast
            </Button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search broadcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Message Preview</TableHead>
                    <TableHead>Audience</TableHead>
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
                            <div className="font-medium text-foreground">{broadcast.title}</div>
                            <div className="text-xs text-muted-foreground">{broadcast.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate text-sm text-muted-foreground">
                            {broadcast.messagePreview}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-foreground">{broadcast.audienceCount}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {broadcast.audienceSegment}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${statusConfig[broadcast.status as keyof typeof statusConfig]?.color} gap-1`}
                          >
                            {StatusIcon && <StatusIcon className="h-3 w-3" />}
                            {broadcast.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-foreground">
                            {broadcast.scheduledAt || "—"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Created {broadcast.createdAt}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Sent:</span>
                              <span className="font-medium text-foreground">{broadcast.sent}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Read:</span>
                              <span className="font-medium text-success">{broadcast.read}</span>
                            </div>
                            {broadcast.failed > 0 && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Failed:</span>
                                <span className="font-medium text-destructive">{broadcast.failed}</span>
                              </div>
                            )}
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
          </div>
        </ScrollArea>
      </div>

      {/* Drawers and Modals */}
      <BroadcastDetailDrawer
        broadcast={selectedBroadcast}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />

      <CreateBroadcastModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onBroadcastCreated={(newBroadcast) => {
          setBroadcasts([newBroadcast, ...broadcasts]);
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}
