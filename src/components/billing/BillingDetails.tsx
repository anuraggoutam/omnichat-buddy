import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function BillingDetails() {
  const handleSave = () => {
    toast.success("Billing details saved successfully!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Contact</CardTitle>
          <CardDescription>
            Contact information for billing communications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billing-name">Full Name</Label>
              <Input id="billing-name" placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-email">Email</Label>
              <Input id="billing-email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-phone">Phone Number</Label>
            <Input id="billing-phone" type="tel" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>
            Legal business information for invoicing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Legal Name</Label>
            <Input id="business-name" placeholder="Your Company Pvt Ltd" defaultValue="Your Company Pvt Ltd" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gst">GST Number</Label>
              <Input id="gst" placeholder="29ABCDE1234F1Z5" defaultValue="29ABCDE1234F1Z5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input id="pan" placeholder="ABCDE1234F" defaultValue="ABCDE1234F" />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input id="address" placeholder="Street Address" defaultValue="123 Business Street" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" defaultValue="Mumbai" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="State" defaultValue="Maharashtra" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal">Postal Code</Label>
              <Input id="postal" placeholder="400001" defaultValue="400001" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="India" defaultValue="India" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Preferences</CardTitle>
          <CardDescription>
            Configure how you receive invoices and billing notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email invoice copy</Label>
              <p className="text-sm text-muted-foreground">
                Send invoice copy to billing email
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Send to accountant</Label>
              <p className="text-sm text-muted-foreground">
                CC invoices to your accountant
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-generate GST invoice</Label>
              <p className="text-sm text-muted-foreground">
                Automatically create GST-compliant invoices
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Billing Details
        </Button>
      </div>
    </div>
  );
}
