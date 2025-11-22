import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Plus, Minus, Coins } from "lucide-react";
import { mockAddons, mockCredits } from "@/lib/mockBilling";
import { useState } from "react";
import { BuyCreditsModal } from "./BuyCreditsModal";
import { toast } from "sonner";

export function BillingAddons() {
  const [showBuyCredits, setShowBuyCredits] = useState(false);
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>(
    Object.fromEntries(mockAddons.map((a) => [a.id, a.quantity]))
  );

  const handleQuantityChange = (addonId: string, delta: number) => {
    setAddonQuantities((prev) => ({
      ...prev,
      [addonId]: Math.max(0, (prev[addonId] || 0) + delta),
    }));
    toast.info("Add-on quantity updated");
  };

  const creditsUsedPercentage = (mockCredits.used / (mockCredits.current + mockCredits.used)) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Credits Summary
              </CardTitle>
              <CardDescription>
                Your current credit balance and usage
              </CardDescription>
            </div>
            <Button onClick={() => setShowBuyCredits(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Buy Credits
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{mockCredits.current.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Available Credits</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-muted-foreground">
                {mockCredits.used.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Used this month</p>
            </div>
          </div>
          <Progress value={creditsUsedPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Credits expire on: <strong>{mockCredits.expiry}</strong>
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {mockAddons.map((addon) => {
          const quantity = addonQuantities[addon.id] || 0;
          const totalPrice = addon.price * quantity;

          return (
            <Card key={addon.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{addon.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {addon.description}
                      </CardDescription>
                    </div>
                  </div>
                  {quantity > 0 && (
                    <Badge variant="secondary">Active</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹{addon.price}</span>
                  <span className="text-sm text-muted-foreground">/month each</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(addon.id, -1)}
                      disabled={quantity === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(addon.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {quantity > 0 && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Monthly cost</p>
                      <p className="font-semibold">₹{totalPrice.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <BuyCreditsModal open={showBuyCredits} onOpenChange={setShowBuyCredits} />
    </div>
  );
}
