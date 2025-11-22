import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { mockPaymentMethods } from "@/lib/mockBilling";
import { useState } from "react";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";
import { toast } from "sonner";

export function BillingPaymentMethods() {
  const [showAddCard, setShowAddCard] = useState(false);

  const handleSetDefault = (id: string) => {
    toast.success("Payment method set as default");
  };

  const handleRemove = (id: string) => {
    toast.success("Payment method removed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payment Methods</h2>
          <p className="text-muted-foreground">Manage your saved payment methods</p>
        </div>
        <Button onClick={() => setShowAddCard(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid gap-4">
        {mockPaymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-10 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {method.brand} •••• {method.last4}
                    </span>
                    {method.isDefault && (
                      <Badge variant="default">Default</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires {method.expiry}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UPI Payment (Coming Soon)</CardTitle>
          <CardDescription>
            Add your UPI ID for instant payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="yourname@upi"
              className="flex-1 px-3 py-2 border rounded-md"
              disabled
            />
            <Button disabled>Verify UPI</Button>
          </div>
        </CardContent>
      </Card>

      <AddPaymentMethodModal open={showAddCard} onOpenChange={setShowAddCard} />
    </div>
  );
}
