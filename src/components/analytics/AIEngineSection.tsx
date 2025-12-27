import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockAIvsHuman } from "@/lib/mockAnalytics";
import { Brain } from "lucide-react";

export function AIEngineSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-primary" />
        <h2 className="text-responsive-2xl font-semibold">AI Engine Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Metrics Cards */}
        <Card>
          <CardHeader>
            <CardTitle>AI Performance Metrics</CardTitle>
            <CardDescription>Key AI automation stats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">94.2%</div>
                <div className="text-sm text-muted-foreground mt-1">Auto-Reply Accuracy</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">78%</div>
                <div className="text-sm text-muted-foreground mt-1">AI Suggestions Adopted</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">12.3%</div>
                <div className="text-sm text-muted-foreground mt-1">Escalation Rate</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-primary">68%</div>
                <div className="text-sm text-muted-foreground mt-1">Fully Automated</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI vs Human Messages */}
        <Card>
          <CardHeader>
            <CardTitle>AI vs Human Handling</CardTitle>
            <CardDescription>Message distribution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockAIvsHuman}>
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
                <Bar dataKey="ai" stackId="a" fill="hsl(var(--accent))" name="AI Handled" /> {/* Using accent color */}
                <Bar dataKey="human" stackId="a" fill="hsl(var(--primary))" name="Human Handled" /> {/* Using primary color */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
