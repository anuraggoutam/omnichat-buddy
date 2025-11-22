import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { mockPipelineRevenue, mockDealsClosedByAgent, mockDealsWonLost } from "@/lib/mockAnalytics";

export function SalesSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Sales Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pipeline Revenue Forecast */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline Revenue Forecast</CardTitle>
            <CardDescription>Forecasted vs actual revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockPipelineRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="forecasted"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#22C55E"
                  fill="#22C55E"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deals Closed by Agent */}
        <Card>
          <CardHeader>
            <CardTitle>Deals Closed by Agent</CardTitle>
            <CardDescription>Top performers this period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockDealsClosedByAgent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deals" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deals Won vs Lost */}
        <Card>
          <CardHeader>
            <CardTitle>Deals Won vs Lost</CardTitle>
            <CardDescription>Win rate analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockDealsWonLost}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockDealsWonLost.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-green-600">57%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
