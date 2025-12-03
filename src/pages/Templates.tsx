import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  MessageSquare,
  Calendar,
  Loader2,
} from "lucide-react";
import { TemplateDrawer } from "@/components/templates/TemplateDrawer";
import { useTemplates, useCreateTemplate, useUpdateTemplate, useDeleteTemplate, MessageTemplate } from "@/hooks/useTemplates";
import { toast } from "sonner";
import { format } from "date-fns";

const templateCategories = ["All", "general", "marketing", "support", "sales", "automated"];
const templateChannels = ["All Channels", "whatsapp", "instagram", "facebook", "email"];

export default function Templates() {
  const { data: templates = [], isLoading } = useTemplates();
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();
  const deleteTemplate = useDeleteTemplate();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All Channels");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

  const channelColors: Record<string, string> = {
    whatsapp: "bg-[hsl(var(--whatsapp))] text-white",
    instagram: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
    facebook: "bg-[hsl(var(--channel-facebook))] text-white",
    email: "bg-accent text-accent-foreground",
  };

  const categoryColors: Record<string, string> = {
    automated: "bg-primary/10 text-primary border-primary/20",
    general: "bg-success/10 text-success border-success/20",
    marketing: "bg-accent/10 text-accent border-accent/20",
    sales: "bg-warning/10 text-warning border-warning/20",
    support: "bg-muted text-muted-foreground border-border",
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || template.category === categoryFilter;
    const matchesChannel =
      channelFilter === "All Channels" || template.channel === channelFilter;

    return matchesSearch && matchesCategory && matchesChannel;
  });

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setIsDrawerOpen(true);
  };

  const handleDuplicate = async (template: MessageTemplate) => {
    try {
      await createTemplate.mutateAsync({
        name: `${template.name} (Copy)`,
        category: template.category,
        content: template.content,
        variables: template.variables,
        channel: template.channel,
        is_approved: false,
      });
      toast.success("Template duplicated");
    } catch (error) {
      toast.error("Failed to duplicate template");
    }
  };

  const handleDeleteConfirm = async () => {
    if (templateToDelete) {
      try {
        await deleteTemplate.mutateAsync(templateToDelete);
        toast.success("Template deleted");
      } catch (error) {
        toast.error("Failed to delete template");
      }
      setTemplateToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleSaveTemplate = async (templateData: any) => {
    try {
      if (selectedTemplate) {
        await updateTemplate.mutateAsync({
          id: selectedTemplate.id,
          ...templateData,
        });
        toast.success("Template updated");
      } else {
        await createTemplate.mutateAsync(templateData);
        toast.success("Template created");
      }
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error("Failed to save template");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Chat Templates</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage reusable message templates
            </p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {templateCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              {templateChannels.map((channel) => (
                <SelectItem key={channel} value={channel}>
                  {channel.charAt(0).toUpperCase() + channel.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {filteredTemplates.length === 0 ? (
            <Card className="p-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                No templates found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || categoryFilter !== "All" || channelFilter !== "All Channels"
                  ? "Try adjusting your filters"
                  : "Create your first template to get started"}
              </p>
              {!searchQuery && categoryFilter === "All" && channelFilter === "All Channels" && (
                <Button onClick={handleCreateNew} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Template
                </Button>
              )}
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow
                      key={template.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleEdit(template)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{template.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                            {template.content}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={categoryColors[template.category] || ""}
                        >
                          {template.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={channelColors[template.channel] || "bg-muted"}>
                          {template.channel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={template.is_approved ? "default" : "secondary"}>
                          {template.is_approved ? "Approved" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(template.updated_at), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(template)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setTemplateToDelete(template.id);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </ScrollArea>

      {/* Template Drawer */}
      <TemplateDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        template={selectedTemplate}
        onSave={handleSaveTemplate}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
