import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Download, CreditCard, Plus } from "lucide-react";
import { mockInvoices } from "@/lib/mockSettings";
import { toast } from "sonner";

export function BillingSettings() {
  const handleUpgrade = () => {
    toast.success("Redirecting to upgrade page...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and payment methods
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your subscription details and usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Professional Plan</h3>
              <p className="text-muted-foreground">$299/month • Billed monthly</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Cancel Plan</Button>
              <Button onClick={handleUpgrade}>Upgrade Plan</Button>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Next billing date</span>
              <span className="text-sm text-muted-foreground">Feb 1, 2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Amount due</span>
              <span className="text-sm font-semibold">$299.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>
            Track your monthly usage against plan limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Conversations</span>
              <span className="text-muted-foreground">2,847 / 5,000</span>
            </div>
            <Progress value={57} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Messages Sent</span>
              <span className="text-muted-foreground">12,456 / 25,000</span>
            </div>
            <Progress value={50} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>AI Responses</span>
              <span className="text-muted-foreground">3,421 / 10,000</span>
            </div>
            <Progress value={34} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Storage Used</span>
              <span className="text-muted-foreground">8.4 GB / 20 GB</span>
            </div>
            <Progress value={42} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium">•••• •••• •••• 4242</div>
              <div className="text-sm text-muted-foreground">Expires 12/2026</div>
            </div>
            <Badge>Default</Badge>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Download invoices and view payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount}.00</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid"
                          ? "default"
                          : invoice.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
