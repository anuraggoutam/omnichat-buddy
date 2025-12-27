import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  mockConversationsOverTime,
  mockChannelBreakdown,
  mockAgentLoad,
} from "@/lib/mockAnalytics";

export function ConversationsSection() {
  const channelColors = {
    whatsapp: "hsl(var(--channel-whatsapp))",
    instagram: "hsl(var(--channel-instagram))",
    facebook: "hsl(var(--channel-facebook))",
    webchat: "hsl(var(--channel-website))",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-responsive-2xl font-semibold">Conversations Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Conversations Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversations Over Time</CardTitle>
            <CardDescription>Message volume by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockConversationsOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    borderColor: "hsl(var(--border))", 
                    borderRadius: "var(--radius)" 
                  }} 
                  itemStyle={{ color: "hsl(var(--foreground))" }} 
                />
                <Legend />
                <Line type="monotone" dataKey="whatsapp" stroke={channelColors.whatsapp} strokeWidth={2} />
                <Line type="monotone" dataKey="instagram" stroke={channelColors.instagram} strokeWidth={2} />
                <Line type="monotone" dataKey="facebook" stroke={channelColors.facebook} strokeWidth={2} />
                <Line type="monotone" dataKey="webchat" stroke={channelColors.webchat} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Channel Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Breakdown</CardTitle>
            <CardDescription>Distribution by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockChannelBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {mockChannelBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    borderColor: "hsl(var(--border))", 
                    borderRadius: "var(--radius)" 
                  }} 
                  itemStyle={{ color: "hsl(var(--foreground))" }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Load Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Load Distribution</CardTitle>
            <CardDescription>Conversations handled per agent</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAgentLoad} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--popover))", 
                    borderColor: "hsl(var(--border))", 
                    borderRadius: "var(--radius)" 
                  }} 
                  itemStyle={{ color: "hsl(var(--foreground))" }} 
                />
                <Bar dataKey="conversations" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
