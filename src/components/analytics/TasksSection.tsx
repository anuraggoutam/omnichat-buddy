import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { mockTaskBreakdown, mockTaskCompletionTrend } from "@/lib/mockAnalytics";

export function TasksSection() {
  const taskStatusColors = [
    "hsl(var(--primary))",    // E.g., for "Open"
    "hsl(var(--accent))",     // E.g., for "In Progress"
    "hsl(var(--success))",    // E.g., for "Completed"
    "hsl(var(--destructive))", // E.g., for "Overdue"
    "hsl(var(--warning))",    // E.g., for "Pending"
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-responsive-2xl font-semibold">Task Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Task Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Breakdown</CardTitle>
            <CardDescription>Current task distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockTaskBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  dataKey="count"
                >
                  {mockTaskBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={taskStatusColors[index % taskStatusColors.length]} />
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

        {/* Task Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle>
            <CardDescription>Tasks completed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTaskCompletionTrend}>
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
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
