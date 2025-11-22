import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  FolderPlus,
  Download,
  Search,
  BarChart3,
  MessageSquare,
  Users,
  DollarSign,
  Megaphone,
  Brain,
  UsersRound,
  FileEdit,
  Star,
} from "lucide-react";
import { mockReports, mockReportCategories } from "@/lib/mockReports";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportViewer } from "@/components/reports/ReportViewer";
import { CreateReportModal } from "@/components/reports/CreateReportModal";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  BarChart3,
  MessageSquare,
  Users,
  DollarSign,
  Megaphone,
  Brain,
  UsersRound,
  FileEdit,
  Star,
};

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredReports = mockReports.filter(
    (report) =>
      (selectedCategory === "overview" || report.category === selectedCategory) &&
      (searchQuery === "" ||
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleExport = (format: "csv" | "pdf") => {
    toast.success(`Exporting reports as ${format.toUpperCase()}...`);
  };

  if (selectedReport) {
    return (
      <ReportViewer
        reportId={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="space-y-1">
              {mockReportCategories.map((category) => {
                const Icon = iconMap[category.icon];
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs opacity-60">{category.count}</span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-background p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Reports</h1>
              <p className="text-muted-foreground mt-1">
                Build, customize, and export performance reports across your system
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Report
              </Button>
              <Button variant="outline" size="icon">
                <FolderPlus className="h-4 w-4" />
              </Button>
              <Select onValueChange={handleExport}>
                <SelectTrigger className="w-32">
                  <Download className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">Export CSV</SelectItem>
                  <SelectItem value="pdf">Export PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Report Grid */}
        <ScrollArea className="flex-1 p-6">
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <BarChart3 className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No reports yet</h3>
              <p className="text-muted-foreground mb-4 max-w-sm">
                Create your first report to start tracking insights across your organization
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Report
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={() => setSelectedReport(report.id)}
                  onDuplicate={() => toast.success("Report duplicated")}
                  onDelete={() => toast.success("Report deleted")}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Create Report Modal */}
      <CreateReportModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
