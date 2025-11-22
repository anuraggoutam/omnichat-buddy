import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketplaceApp } from "@/lib/mockMarketplace";
import { Star, CheckCircle2, Zap } from "lucide-react";

interface FeaturedAppsSectionProps {
  apps: MarketplaceApp[];
  onAppClick: (app: MarketplaceApp) => void;
}

export function FeaturedAppsSection({ apps, onAppClick }: FeaturedAppsSectionProps) {
  if (apps.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Featured Apps</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {apps.slice(0, 4).map((app) => (
          <Card
            key={app.id}
            className="hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-background to-muted/30"
            onClick={() => onAppClick(app)}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{app.icon}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{app.name}</CardTitle>
                    {app.verified && (
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <CardDescription className="text-base">{app.tagline}</CardDescription>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{app.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({app.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {app.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  by <span className="font-medium">{app.provider}</span>
                </div>
                {app.installed ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Installed
                  </Badge>
                ) : (
                  <Button size="sm">Install Now</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
