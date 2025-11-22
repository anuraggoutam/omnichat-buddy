import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketplaceApp } from "@/lib/mockMarketplace";
import { Star, Download, CheckCircle2, TrendingUp, Sparkles, Package } from "lucide-react";

interface AppCardProps {
  app: MarketplaceApp;
  onClick: () => void;
}

export function AppCard({ app, onClick }: AppCardProps) {
  const getPricingBadge = () => {
    switch (app.pricing) {
      case "free":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Free</Badge>;
      case "paid":
        return <Badge variant="secondary">Paid</Badge>;
      case "freemium":
        return <Badge variant="outline">Freemium</Badge>;
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-all cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{app.icon}</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {app.name}
                </CardTitle>
                {app.verified && (
                  <div title="Verified">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {getPricingBadge()}
                {app.trending && (
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {app.staffPick && (
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Staff Pick
                  </Badge>
                )}
                {app.newArrival && (
                  <Badge variant="secondary" className="text-xs">
                    <Package className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">{app.tagline}</CardDescription>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{app.rating}</span>
            <span className="text-muted-foreground">({app.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Download className="h-4 w-4" />
            <span>{app.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Provider */}
        <div className="text-xs text-muted-foreground">
          by <span className="font-medium">{app.provider}</span>
        </div>

        {/* CTA Button */}
        {app.installed ? (
          <Button variant="secondary" size="sm" className="w-full">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Installed
          </Button>
        ) : (
          <Button size="sm" className="w-full">
            Install
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
