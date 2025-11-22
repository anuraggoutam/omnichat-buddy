import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAgentPerformance } from "@/lib/mockAnalytics";
import { Star } from "lucide-react";

export function AgentPerformanceSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Agent Performance</h2>

      <Card>
        <CardHeader>
          <CardTitle>Team Performance Metrics</CardTitle>
          <CardDescription>Individual agent statistics and KPIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-right">Total Chats</TableHead>
                  <TableHead className="text-right">Avg Response</TableHead>
                  <TableHead className="text-right">Avg Resolution</TableHead>
                  <TableHead className="text-right">CSAT Score</TableHead>
                  <TableHead className="text-right">Leads Converted</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAgentPerformance.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{agent.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{agent.totalChats}</TableCell>
                    <TableCell className="text-right">{agent.avgResponseTime}</TableCell>
                    <TableCell className="text-right">{agent.avgResolutionTime}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{agent.csatScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{agent.leadsConverted}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${agent.revenueGenerated.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
