import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MarketplaceApp } from "@/lib/mockMarketplace";
import { Star, Download, CheckCircle2, ExternalLink, Shield } from "lucide-react";
import { toast } from "sonner";

interface AppDetailsModalProps {
  app: MarketplaceApp | null;
  open: boolean;
  onClose: () => void;
}

export function AppDetailsModal({ app, open, onClose }: AppDetailsModalProps) {
  if (!app) return null;

  const handleInstall = () => {
    toast.success(`${app.name} installed successfully! 🎉`);
    onClose();
  };

  const handleUninstall = () => {
    toast.success(`${app.name} uninstalled`);
    onClose();
  };

  const getPricingDisplay = () => {
    if (app.pricing === "free") return "Free";
    if (app.price) return app.price;
    return "Paid";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{app.icon}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl">{app.name}</DialogTitle>
                {app.verified && (
                  <div title="Verified Partner">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                )}
              </div>
              <DialogDescription className="text-base">{app.tagline}</DialogDescription>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">by</span>
                <span className="font-medium">{app.provider}</span>
              </div>
            </div>
            <div className="text-right space-y-2">
              {app.installed ? (
                <>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-2">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Installed
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleUninstall}>
                    Uninstall
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-lg font-bold">{getPricingDisplay()}</div>
                  <Button onClick={handleInstall}>Install App</Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 py-4 border-y">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{app.rating}</span>
            <span className="text-sm text-muted-foreground">({app.reviews} reviews)</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{app.downloads.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">downloads</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <Badge variant="secondary">{app.category}</Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{app.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {app.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {app.price && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                <p className="text-2xl font-bold">{app.price}</p>
              </div>
            )}
          </TabsContent>

          {/* Installation Tab */}
          <TabsContent value="installation" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Installation Guide</h3>
              <div className="space-y-2 bg-muted p-4 rounded-lg">
                {app.installationGuide.split("\n").map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {app.installed && (
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open App Settings
                </Button>
                <Button variant="outline" className="w-full">
                  Test Connection
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">What this app can access</h4>
                <p className="text-sm text-muted-foreground">
                  Review the permissions this app requires to function
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {app.permissions.map((permission, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{permission}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Changelog Tab */}
          <TabsContent value="changelog" className="space-y-4">
            {app.changelog.map((entry, index) => (
              <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">v{entry.version}</Badge>
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                </div>
                <ul className="space-y-1 text-sm">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
