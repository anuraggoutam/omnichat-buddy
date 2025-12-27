import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/analytics/StatCard";
import { ConversationsSection } from "@/components/analytics/ConversationsSection";
import { LeadsSection } from "@/components/analytics/LeadsSection";
import { SalesSection } from "@/components/analytics/SalesSection";
import { CampaignsSection } from "@/components/analytics/CampaignsSection";
import { AIEngineSection } from "@/components/analytics/AIEngineSection";
import { AgentPerformanceSection } from "@/components/analytics/AgentPerformanceSection";
import { TasksSection } from "@/components/analytics/TasksSection";
import { mockTopMetrics } from "@/lib/mockAnalytics";
import { Download, Calendar, MessageSquare, Users, TrendingUp, DollarSign, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("last30");
  const [channelFilter, setChannelFilter] = useState("all");

  const handleExport = (format: "csv" | "pdf") => {
    toast.success(`Exporting analytics as ${format.toUpperCase()}...`);
  };

  return (
    <div className="page-padding space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-responsive-3xl font-bold">Analytics</h1>
          <p className="text-responsive-base text-muted-foreground mt-1">
            Track performance across sales, conversations, leads, and campaigns
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-[150px] h-9 sm:h-10 text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7">Last 7 Days</SelectItem>
              <SelectItem value="last30">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-full sm:w-[140px] h-9 sm:h-10 text-xs sm:text-sm">
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="webchat">Webchat</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="default" size="sm" onClick={() => handleExport("csv")} className="h-9 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Button variant="default" size="sm" onClick={() => handleExport("pdf")} className="h-9 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Conversations"
          value={mockTopMetrics.totalConversations.value.toLocaleString()}
          change={mockTopMetrics.totalConversations.change}
          trend={mockTopMetrics.totalConversations.trend}
          icon={MessageSquare}
        />
        <StatCard
          title="New Leads"
          value={mockTopMetrics.newLeads.value.toLocaleString()}
          change={mockTopMetrics.newLeads.change}
          trend={mockTopMetrics.newLeads.trend}
          icon={Users}
        />
        <StatCard
          title="Closed Deals"
          value={mockTopMetrics.closedDeals.value.toLocaleString()}
          change={mockTopMetrics.closedDeals.change}
          trend={mockTopMetrics.closedDeals.trend}
          icon={TrendingUp}
        />
        <StatCard
          title="Conversion Rate"
          value={`${mockTopMetrics.conversionRate.value}%`}
          change={mockTopMetrics.conversionRate.change}
          trend={mockTopMetrics.conversionRate.trend}
          icon={TrendingUp}
        />
        <StatCard
          title="Avg Response Time"
          value={mockTopMetrics.avgResponseTime.value}
          change={mockTopMetrics.avgResponseTime.change}
          trend={mockTopMetrics.avgResponseTime.trend}
          icon={Clock}
          invertChange
        />
        <StatCard
          title="Revenue Generated"
          value={`$${(mockTopMetrics.revenueGenerated.value / 1000).toFixed(1)}k`}
          change={mockTopMetrics.revenueGenerated.change}
          trend={mockTopMetrics.revenueGenerated.trend}
          icon={DollarSign}
        />
      </div>

      {/* Conversations Analytics */}
      <ConversationsSection />

      {/* Lead Analytics */}
      <LeadsSection />

      {/* Sales Analytics */}
      <SalesSection />

      {/* Campaign Analytics */}
      <CampaignsSection />

      {/* AI Engine Analytics */}
      <AIEngineSection />

      {/* Agent Performance */}
      <AgentPerformanceSection />

      {/* Tasks Analytics */}
      <TasksSection />

      {/* Custom Reports CTA */}
      <Card className="p-8 text-center hover-lift"> {/* Added hover-lift */}
        <h3 className="text-responsive-xl font-semibold mb-2">Need Custom Reports?</h3> {/* Updated to text-responsive-xl */}
        <p className="text-muted-foreground mb-4">
          Create custom analytics reports with your own metrics and dimensions
        </p>
        <Button variant="default">Create Custom Report</Button> {/* Changed variant to default */}
      </Card>
    </div>
  );
}
