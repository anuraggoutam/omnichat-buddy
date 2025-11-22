import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Sparkles } from "lucide-react";
import { mockPlans, mockCurrentPlan } from "@/lib/mockBilling";
import { useState } from "react";
import { toast } from "sonner";

interface ChangePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePlanModal({ open, onOpenChange }: ChangePlanModalProps) {
  const [isYearly, setIsYearly] = useState(false);

  const handleChangePlan = (planId: string) => {
    toast.success(`Plan change to ${mockPlans.find(p => p.id === planId)?.name} initiated!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Change Your Plan</DialogTitle>
          <DialogDescription>
            Choose the plan that best fits your needs
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-3 my-4">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-cycle">
            Yearly <Badge variant="secondary" className="ml-2">Save 20%</Badge>
          </Label>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockPlans.map((plan) => {
            const price = isYearly ? Math.round(plan.price * 12 * 0.8) : plan.price;
            const isCurrent = plan.id === mockCurrentPlan.id;

            return (
              <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge variant="default" className="gap-1">
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-2xl font-bold mt-2">
                    {plan.currency}{price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {isCurrent ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleChangePlan(plan.id)}
                    >
                      {plan.price > mockCurrentPlan.price ? "Upgrade" : "Downgrade"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
