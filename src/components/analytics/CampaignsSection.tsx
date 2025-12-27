import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockMessageDelivery, mockCampaignPerformance } from "@/lib/mockAnalytics";

export function CampaignsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-responsive-2xl font-semibold">Broadcast & Campaign Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Message Delivery Report */}
        <Card>
          <CardHeader>
            <CardTitle>Message Delivery Report</CardTitle>
            <CardDescription>Overall message performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockMessageDelivery}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="status" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} /> {/* Using primary color */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Campaign Performance Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Detailed metrics by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Sent</TableHead>
                    <TableHead className="text-right">Open Rate</TableHead>
                    <TableHead className="text-right">Reply Rate</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaignPerformance.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{campaign.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{campaign.sent}</TableCell>
                      <TableCell className="text-right">{campaign.openRate}%</TableCell>
                      <TableCell className="text-right">{campaign.replyRate}%</TableCell>
                      <TableCell className="text-right">{campaign.conversion}%</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            campaign.status === "Active"
                              ? "bg-success/10 text-success" // Using design system colors
                              : "bg-muted/60 text-muted-foreground" // Using design system colors
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
