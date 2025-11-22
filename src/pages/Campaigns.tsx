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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Edit,
  Copy,
  Trash2,
  Calendar,
  Users,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  PlayCircle,
} from "lucide-react";
import { mockCampaigns } from "@/lib/mockData";
import { CampaignDrawer } from "@/components/campaigns/CampaignDrawer";
import { CampaignDetailDrawer } from "@/components/campaigns/CampaignDetailDrawer";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState("All Channels");
  const [statusFilter, setStatusFilter] = useState("All");

  const statusConfig = {
    Completed: { color: "bg-success text-success-foreground", icon: CheckCircle },
    Draft: { color: "bg-muted text-muted-foreground", icon: FileText },
    Scheduled: { color: "bg-accent text-accent-foreground", icon: Clock },
    Running: { color: "bg-warning text-warning-foreground", icon: PlayCircle },
    Failed: { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
  };

  const channelColors = {
    WhatsApp: "bg-[hsl(var(--whatsapp))] text-white",
    Instagram: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
    Email: "bg-[hsl(var(--channel-facebook))] text-white",
    "Unified Chat": "bg-accent text-accent-foreground",
  };

  const filters = [
    { name: "All Campaigns", icon: Send },
    { name: "Scheduled", icon: Clock },
    { name: "Running", icon: PlayCircle },
    { name: "Completed", icon: CheckCircle },
    { name: "Drafts", icon: FileText },
  ];

  const audienceFilters = [
    "All Customers",
    "New Customers",
    "Returning Customers",
    "High-Value Customers",
    "VIP Customers",
    "Abandoned Cart",
    "Inactive (30+ days)",
  ];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesChannel =
      channelFilter === "All Channels" || campaign.channel === channelFilter;

    const matchesStatus =
      statusFilter === "All" || campaign.status === statusFilter;

    let matchesFilter = true;
    if (activeFilter !== "All Campaigns") {
      if (activeFilter === "Drafts") matchesFilter = campaign.status === "Draft";
      if (activeFilter === "Scheduled") matchesFilter = campaign.status === "Scheduled";
      if (activeFilter === "Running") matchesFilter = campaign.status === "Running";
      if (activeFilter === "Completed") matchesFilter = campaign.status === "Completed";
    }

    return matchesSearch && matchesChannel && matchesStatus && matchesFilter;
  });

  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsDetailDrawerOpen(true);
  };

  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsCreateDrawerOpen(true);
  };

  const handleDuplicate = (campaign: any) => {
    const newCampaign = {
      ...campaign,
      id: `CMP-${String(campaigns.length + 1).padStart(3, "0")}`,
      name: `${campaign.name} (Copy)`,
      status: "Draft",
      sent: 0,
      delivered: 0,
      read: 0,
      clicks: 0,
      conversions: 0,
      failed: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      scheduledAt: null,
    };
    setCampaigns([newCampaign, ...campaigns]);
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const handleSaveCampaign = (campaignData: any) => {
    if (selectedCampaign) {
      // Update existing
      setCampaigns(
        campaigns.map((c) =>
          c.id === selectedCampaign.id
            ? { ...c, ...campaignData, updatedAt: new Date().toISOString().split("T")[0] }
            : c
        )
      );
    } else {
      // Create new
      const newCampaign = {
        ...campaignData,
        id: `CMP-${String(campaigns.length + 1).padStart(3, "0")}`,
        sent: 0,
        delivered: 0,
        read: 0,
        clicks: 0,
        conversions: 0,
        failed: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        createdBy: "You",
      };
      setCampaigns([newCampaign, ...campaigns]);
    }
    setIsCreateDrawerOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Filters */}
      <div className="w-64 border-r border-border bg-card">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">Filters</h3>
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
              <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Multi-channel marketing campaigns and automation flows
              </p>
            </div>
            <Button
              onClick={() => {
                setSelectedCampaign(null);
                setIsCreateDrawerOpen(true);
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </div>

          {/* Filters Bar */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Running">Running</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Channels">All Channels</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Unified Chat">Unified Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {filteredCampaigns.length === 0 ? (
              <Card className="p-12 text-center">
                <Send className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  No campaigns found
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "All" || channelFilter !== "All Channels"
                    ? "Try adjusting your filters"
                    : "Create your first campaign to get started"}
                </p>
                {!searchQuery && statusFilter === "All" && channelFilter === "All Channels" && (
                  <Button
                    onClick={() => {
                      setSelectedCampaign(null);
                      setIsCreateDrawerOpen(true);
                    }}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Campaign
                  </Button>
                )}
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Audience Size</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Scheduled Time</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => {
                      const StatusIcon =
                        statusConfig[campaign.status as keyof typeof statusConfig]?.icon;
                      return (
                        <TableRow
                          key={campaign.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewCampaign(campaign)}
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">
                                {campaign.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {campaign.id}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                channelColors[
                                  campaign.channel as keyof typeof channelColors
                                ] || ""
                              }
                            >
                              {campaign.channel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium text-foreground">
                                {campaign.audienceSize}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {campaign.audienceSegment}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium text-foreground">
                              {campaign.sent}
                            </div>
                            {campaign.sent > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {Math.round((campaign.delivered / campaign.sent) * 100)}%
                                delivered
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                statusConfig[campaign.status as keyof typeof statusConfig]
                                  ?.color
                              } gap-1`}
                            >
                              {StatusIcon && <StatusIcon className="h-3 w-3" />}
                              {campaign.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-foreground">
                              {campaign.scheduledAt || "—"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">
                              {campaign.updatedAt}
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
                                <DropdownMenuItem
                                  onClick={() => handleViewCampaign(campaign)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleEditCampaign(campaign)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDuplicate(campaign)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(campaign.id)}
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

      {/* Drawers */}
      <CampaignDrawer
        open={isCreateDrawerOpen}
        onOpenChange={setIsCreateDrawerOpen}
        campaign={selectedCampaign}
        onSave={handleSaveCampaign}
      />

      <CampaignDetailDrawer
        campaign={selectedCampaign}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />
    </div>
  );
}
