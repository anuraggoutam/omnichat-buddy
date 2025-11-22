import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Calendar, DollarSign, Package } from "lucide-react";
import { mockCurrentPlan, mockAddons } from "@/lib/mockBilling";
import { useState } from "react";
import { ChangePlanModal } from "./ChangePlanModal";
import { toast } from "sonner";

export function BillingOverview() {
  const [showChangePlan, setShowChangePlan] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{mockCurrentPlan.name} Plan</CardTitle>
              <CardDescription>Your current subscription</CardDescription>
            </div>
            <Badge variant="default" className="text-sm">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{mockCurrentPlan.currency}{mockCurrentPlan.price}</span>
            <span className="text-muted-foreground">/{mockCurrentPlan.interval}</span>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Plan Features:</h4>
            <div className="grid gap-2">
              {mockCurrentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Next billing date: <strong>Feb 1, 2025</strong></span>
            </div>
            <Button onClick={() => setShowChangePlan(true)}>Change Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Invoice</CardTitle>
          <CardDescription>Your next billing cycle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">{mockCurrentPlan.name} Plan</span>
              <span className="text-sm font-medium">₹{mockCurrentPlan.price}.00</span>
            </div>
            {mockAddons.filter(a => a.quantity > 0).map((addon) => (
              <div key={addon.id} className="flex justify-between">
                <span className="text-sm">{addon.name} × {addon.quantity}</span>
                <span className="text-sm font-medium">₹{addon.price * addon.quantity}.00</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm">Subtotal</span>
              <span className="text-sm">₹{mockCurrentPlan.price + mockAddons.filter(a => a.quantity > 0).reduce((sum, a) => sum + (a.price * a.quantity), 0)}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">GST (18%)</span>
              <span className="text-sm">₹{Math.round((mockCurrentPlan.price + mockAddons.filter(a => a.quantity > 0).reduce((sum, a) => sum + (a.price * a.quantity), 0)) * 0.18)}.00</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold">Total due</span>
              <span className="text-lg font-bold">₹{Math.round((mockCurrentPlan.price + mockAddons.filter(a => a.quantity > 0).reduce((sum, a) => sum + (a.price * a.quantity), 0)) * 1.18)}.00</span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Preview Invoice
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add-ons Summary</CardTitle>
          <CardDescription>Manage your subscription add-ons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockAddons.map((addon) => (
            <div key={addon.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{addon.name}</div>
                  <div className="text-sm text-muted-foreground">{addon.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {addon.quantity > 0 ? (
                  <Badge variant="secondary">× {addon.quantity}</Badge>
                ) : (
                  <Badge variant="outline">Not active</Badge>
                )}
                <span className="text-sm font-medium">₹{addon.price}</span>
                <Button variant="ghost" size="sm" onClick={() => toast.info("Add-on modification coming soon")}>
                  Modify
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Alerts</CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Low credits alert</Label>
              <p className="text-sm text-muted-foreground">Get notified when credits are running low</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Payment failure alert</Label>
              <p className="text-sm text-muted-foreground">Get notified if payment fails</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Usage threshold alert</Label>
              <p className="text-sm text-muted-foreground">Get notified when reaching 80% usage</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <ChangePlanModal open={showChangePlan} onOpenChange={setShowChangePlan} />
    </div>
  );
}
