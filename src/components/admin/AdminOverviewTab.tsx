import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, TrendingUp, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    title: "Total Customers",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-primary bg-primary/10",
  },
  {
    title: "Active Conversations",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: MessageSquare,
    color: "text-accent bg-accent/10",
  },
  {
    title: "Revenue",
    value: "$89,420",
    change: "+23.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success bg-success/10",
  },
  {
    title: "Orders",
    value: "3,621",
    change: "-2.4%",
    trend: "down",
    icon: ShoppingCart,
    color: "text-warning bg-warning/10",
  },
];

const recentActivity = [
  { user: "Sarah Johnson", action: "signed up", time: "2 minutes ago", type: "signup" },
  { user: "Mike Chen", action: "completed purchase", time: "5 minutes ago", type: "purchase" },
  { user: "Emily Davis", action: "started conversation", time: "8 minutes ago", type: "conversation" },
  { user: "John Smith", action: "upgraded to Pro", time: "15 minutes ago", type: "upgrade" },
  { user: "Lisa Anderson", action: "submitted feedback", time: "22 minutes ago", type: "feedback" },
];

export function AdminOverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest customer and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {activity.user.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
