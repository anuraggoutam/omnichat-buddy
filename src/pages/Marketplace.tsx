import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppCard } from "@/components/marketplace/AppCard";
import { AppDetailsModal } from "@/components/marketplace/AppDetailsModal";
import { FeaturedAppsSection } from "@/components/marketplace/FeaturedAppsSection";
import { InstalledAppsSection } from "@/components/marketplace/InstalledAppsSection";
import { mockMarketplaceApps, categories, MarketplaceApp } from "@/lib/mockMarketplace";
import { Search, TrendingUp, Sparkles, Package } from "lucide-react";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [selectedApp, setSelectedApp] = useState<MarketplaceApp | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const filteredAndSortedApps = useMemo(() => {
    let filtered = mockMarketplaceApps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || app.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort
    switch (sortBy) {
      case "trending":
        filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case "popular":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "new":
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const featuredApps = mockMarketplaceApps.filter((app) => app.featured);
  const trendingApps = mockMarketplaceApps.filter((app) => app.trending);
  const staffPicks = mockMarketplaceApps.filter((app) => app.staffPick);
  const newArrivals = mockMarketplaceApps.filter((app) => app.newArrival);
  const installedApps = mockMarketplaceApps.filter((app) => app.installed);

  const handleAppClick = (app: MarketplaceApp) => {
    setSelectedApp(app);
    setDetailsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Extend your workspace with powerful apps & integrations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search apps, integrations, and extensions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Installed Apps */}
      {installedApps.length > 0 && (
        <InstalledAppsSection apps={installedApps} onAppClick={handleAppClick} />
      )}

      {/* Featured Apps */}
      {searchQuery === "" && selectedCategory === "All" && (
        <FeaturedAppsSection apps={featuredApps} onAppClick={handleAppClick} />
      )}

      {/* Trending This Week */}
      {searchQuery === "" && selectedCategory === "All" && trendingApps.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Trending This Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingApps.slice(0, 6).map((app) => (
              <AppCard key={app.id} app={app} onClick={() => handleAppClick(app)} />
            ))}
          </div>
        </div>
      )}

      {/* Staff Picks */}
      {searchQuery === "" && selectedCategory === "All" && staffPicks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Staff Picks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffPicks.map((app) => (
              <AppCard key={app.id} app={app} onClick={() => handleAppClick(app)} />
            ))}
          </div>
        </div>
      )}

      {/* New Arrivals */}
      {searchQuery === "" && selectedCategory === "All" && newArrivals.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newArrivals.map((app) => (
              <AppCard key={app.id} app={app} onClick={() => handleAppClick(app)} />
            ))}
          </div>
        </div>
      )}

      {/* All Apps Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {selectedCategory === "All" ? "All Apps" : selectedCategory}
          </h2>
          <Badge variant="secondary">{filteredAndSortedApps.length} apps</Badge>
        </div>

        {filteredAndSortedApps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No apps found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedApps.map((app) => (
              <AppCard key={app.id} app={app} onClick={() => handleAppClick(app)} />
            ))}
          </div>
        )}
      </div>

      {/* App Details Modal */}
      <AppDetailsModal
        app={selectedApp}
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />
    </div>
  );
}
