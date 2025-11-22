import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketplaceApp } from "@/lib/mockMarketplace";
import { CheckCircle2, AlertCircle, RefreshCw, Settings, Unplug } from "lucide-react";
import { toast } from "sonner";

interface InstalledAppsSectionProps {
  apps: MarketplaceApp[];
  onAppClick: (app: MarketplaceApp) => void;
}

export function InstalledAppsSection({ apps, onAppClick }: InstalledAppsSectionProps) {
  if (apps.length === 0) return null;

  const getStatusBadge = (app: MarketplaceApp) => {
    switch (app.status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      case "needs_update":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <RefreshCw className="h-3 w-3 mr-1" />
            Update Available
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleUninstall = (e: React.MouseEvent, app: MarketplaceApp) => {
    e.stopPropagation();
    toast.success(`${app.name} uninstalled`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Installed Apps</h2>
        <Badge variant="secondary">{apps.length} installed</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <Card
            key={app.id}
            className="hover:shadow-lg transition-all cursor-pointer"
            onClick={() => onAppClick(app)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{app.icon}</div>
                  <div>
                    <CardTitle className="text-base">{app.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      by {app.provider}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(app)}
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success("Opening app settings...");
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleUninstall(e, app)}
                  className="text-destructive hover:text-destructive"
                >
                  <Unplug className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
