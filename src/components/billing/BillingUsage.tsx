import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, Bot, FileText, Send, Users, Database, TrendingUp } from "lucide-react";
import { mockUsageMetrics } from "@/lib/mockBilling";

const iconMap: Record<string, React.ReactNode> = {
  "Monthly Messages": <MessageSquare className="h-5 w-5" />,
  "AI Responses": <Bot className="h-5 w-5" />,
  "Templates": <FileText className="h-5 w-5" />,
  "Broadcasts Sent": <Send className="h-5 w-5" />,
  "Conversations": <Users className="h-5 w-5" />,
  "Contacts": <Database className="h-5 w-5" />,
  "Leads Added": <TrendingUp className="h-5 w-5" />,
  "Storage (GB)": <Database className="h-5 w-5" />,
};

export function BillingUsage() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockUsageMetrics.map((metric) => {
          const percentage = (metric.used / metric.quota) * 100;
          const isNearLimit = percentage >= 80;

          return (
            <Card key={metric.feature}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {iconMap[metric.feature]}
                  </div>
                  {isNearLimit && (
                    <Badge variant="destructive">Near Limit</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold">{metric.feature}</h3>
                  <p className="text-2xl font-bold mt-1">
                    {metric.used.toLocaleString()}
                    <span className="text-sm text-muted-foreground font-normal">
                      {" "}/ {metric.quota.toLocaleString()}
                    </span>
                  </p>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {metric.quota - metric.used > 0 
                    ? `${(metric.quota - metric.used).toLocaleString()} remaining`
                    : 'Limit reached'
                  }
                </p>
                {isNearLimit && (
                  <Button variant="outline" size="sm" className="w-full">
                    Upgrade for more
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Usage Breakdown</CardTitle>
          <CardDescription>
            View your resource consumption across all features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead className="text-right">Quota</TableHead>
                <TableHead className="text-right">Used</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead>Reset Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsageMetrics.map((metric) => {
                const remaining = metric.quota - metric.used;
                const percentage = (metric.used / metric.quota) * 100;

                return (
                  <TableRow key={metric.feature}>
                    <TableCell className="font-medium">{metric.feature}</TableCell>
                    <TableCell className="text-right">{metric.quota.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {metric.used.toLocaleString()}
                        {percentage >= 80 && (
                          <Badge variant="destructive" className="text-xs">
                            {Math.round(percentage)}%
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{remaining.toLocaleString()}</TableCell>
                    <TableCell>{metric.resetDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
