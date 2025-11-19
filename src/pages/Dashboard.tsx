import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  ShoppingCart,
  Package,
  TrendingUp,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  dashboardKPIs,
  salesChartData,
  demoConversations,
  demoOrders,
  aiSuggestions,
  storeHealth,
} from "@/lib/mockData";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = () => {
  const kpis = [
    {
      title: "New Conversations",
      value: dashboardKPIs.newConversations.value,
      change: dashboardKPIs.newConversations.change,
      trend: dashboardKPIs.newConversations.trend,
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "Orders",
      value: dashboardKPIs.orders.value,
      change: dashboardKPIs.orders.change,
      trend: dashboardKPIs.orders.trend,
      icon: ShoppingCart,
      color: "text-accent",
    },
    {
      title: "Products",
      value: dashboardKPIs.products.value,
      change: dashboardKPIs.products.change,
      trend: dashboardKPIs.products.trend,
      icon: Package,
      color: "text-success",
    },
    {
      title: "Revenue",
      value: `₹${(dashboardKPIs.revenue.value / 1000).toFixed(1)}k`,
      change: dashboardKPIs.revenue.change,
      trend: dashboardKPIs.revenue.trend,
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      paid: { variant: "default", label: "Paid" },
      pending: { variant: "secondary", label: "Pending" },
      payment_link_sent: { variant: "outline", label: "Link Sent" },
      delivered: { variant: "default", label: "Delivered" },
      shipped: { variant: "secondary", label: "Shipped" },
      processing: { variant: "outline", label: "Processing" },
      awaiting_payment: { variant: "outline", label: "Awaiting Payment" },
    };
    const config = variants[status] || { variant: "outline", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {kpi.trend === "up" && (
                  <>
                    <ArrowUp className="h-3 w-3 text-success mr-1" />
                    <span className="text-success">+{kpi.change}%</span>
                  </>
                )}
                {kpi.trend === "down" && (
                  <>
                    <ArrowDown className="h-3 w-3 text-destructive mr-1" />
                    <span className="text-destructive">-{kpi.change}%</span>
                  </>
                )}
                <span className="ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Chart & AI Suggestions */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Revenue and orders over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesChartData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value: any, name: string) =>
                    name === "revenue" ? [`₹${value}`, "Revenue"] : [value, "Orders"]
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <CardTitle>AI Suggestions</CardTitle>
            </div>
            <CardDescription>Smart recommendations to boost your sales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                    <div className="flex gap-2 text-xs text-muted-foreground mt-2">
                      {suggestion.expectedReach && (
                        <span className="text-primary font-medium">
                          Reach: {suggestion.expectedReach}
                        </span>
                      )}
                      {suggestion.potentialRevenue && (
                        <span className="text-success font-medium">
                          {suggestion.potentialRevenue}
                        </span>
                      )}
                      {suggestion.expectedSales && (
                        <span className="text-accent font-medium">{suggestion.expectedSales}</span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Latest customer interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoConversations.slice(0, 5).map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="text-2xl">{conv.customer.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">{conv.customer.name}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(conv.timestamp).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    <div className="flex gap-1 mt-1">
                      {conv.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {conv.unread > 0 && (
                        <Badge variant="default" className="text-xs">
                          {conv.unread} new
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="text-2xl">{order.customer.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{order.id}</p>
                      <span className="text-sm font-semibold">₹{order.total}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                    <div className="flex gap-2 mt-2">
                      {getStatusBadge(order.paymentStatus)}
                      {getStatusBadge(order.fulfillmentStatus)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Health */}
      <Card>
        <CardHeader>
          <CardTitle>Store Health</CardTitle>
          <CardDescription>Key performance metrics for your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(storeHealth).map(([key, metric]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  {metric.status === "excellent" && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                  {metric.status === "good" && <Clock className="h-4 w-4 text-warning" />}
                  {metric.status === "poor" && <AlertCircle className="h-4 w-4 text-destructive" />}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <Badge
                    variant={
                      metric.status === "excellent"
                        ? "default"
                        : metric.status === "good"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {metric.score}
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
