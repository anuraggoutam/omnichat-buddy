import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BillingOverview } from "@/components/billing/BillingOverview";
import { BillingUsage } from "@/components/billing/BillingUsage";
import { BillingInvoices } from "@/components/billing/BillingInvoices";
import { BillingPaymentMethods } from "@/components/billing/BillingPaymentMethods";
import { BillingDetails } from "@/components/billing/BillingDetails";
import { BillingAddons } from "@/components/billing/BillingAddons";

export default function Billing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Billing</h1>
            <p className="text-muted-foreground mt-1">
              Manage your subscription, payments, and invoices.
            </p>
          </div>
        </div>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="billing-details">Billing Details</TabsTrigger>
              <TabsTrigger value="addons">Add-ons & Credits</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <BillingOverview />
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <BillingUsage />
            </TabsContent>

            <TabsContent value="invoices" className="mt-6">
              <BillingInvoices />
            </TabsContent>

            <TabsContent value="payment-methods" className="mt-6">
              <BillingPaymentMethods />
            </TabsContent>

            <TabsContent value="billing-details" className="mt-6">
              <BillingDetails />
            </TabsContent>

            <TabsContent value="addons" className="mt-6">
              <BillingAddons />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
