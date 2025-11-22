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
import { CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface BuyCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const creditPacks = [
  {
    id: "pack_500",
    credits: 500,
    price: 999,
    perCredit: 2.0,
  },
  {
    id: "pack_1000",
    credits: 1000,
    price: 1799,
    perCredit: 1.8,
    popular: true,
  },
  {
    id: "pack_5000",
    credits: 5000,
    price: 7999,
    perCredit: 1.6,
  },
];

export function BuyCreditsModal({ open, onOpenChange }: BuyCreditsModalProps) {
  const handleBuy = (packId: string, credits: number) => {
    toast.success(`Successfully purchased ${credits.toLocaleString()} credits!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Buy Credits</DialogTitle>
          <DialogDescription>
            Choose a credit pack that fits your needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {creditPacks.map((pack) => (
            <Card key={pack.id} className={pack.popular ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{pack.credits.toLocaleString()}</CardTitle>
                  {pack.popular && (
                    <Badge variant="default" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      Popular
                    </Badge>
                  )}
                </div>
                <CardDescription>Credits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">₹{pack.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ₹{pack.perCredit.toFixed(2)} per credit
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Valid for 12 months</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Use across all features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>No hidden charges</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant={pack.popular ? "default" : "outline"}
                  onClick={() => handleBuy(pack.id, pack.credits)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Credits are used for AI responses, broadcasts, and other premium features.
            Unused credits expire after 12 months from purchase date.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
