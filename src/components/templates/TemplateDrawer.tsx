import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Save, Plus } from "lucide-react";
import { templateCategories, templateChannels, templateVariables } from "@/lib/mockData";
import { PreviewBubble } from "./PreviewBubble";

interface TemplateDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: any;
  onSave: (templateData: any) => void;
}

export function TemplateDrawer({
  open,
  onOpenChange,
  template,
  onSave,
}: TemplateDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Quick Replies",
    channel: "WhatsApp",
    content: "",
    variables: [] as string[],
  });

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        category: template.category,
        channel: template.channel,
        content: template.content,
        variables: template.variables || [],
      });
    } else {
      setFormData({
        name: "",
        category: "Quick Replies",
        channel: "WhatsApp",
        content: "",
        variables: [],
      });
    }
  }, [template, open]);

  const handleInsertVariable = (variable: string) => {
    const textarea = document.getElementById("template-content") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData.content;
      const before = text.substring(0, start);
      const after = text.substring(end);
      const newContent = before + variable + after;
      
      setFormData({ ...formData, content: newContent });
      
      // Update variables list
      const varMatch = variable.match(/\{\{(.+?)\}\}/);
      if (varMatch && !formData.variables.includes(varMatch[1])) {
        setFormData({
          ...formData,
          content: newContent,
          variables: [...formData.variables, varMatch[1]],
        });
      }
    }
  };

  const handleSave = () => {
    // Extract variables from content
    const variableMatches = formData.content.match(/\{\{(.+?)\}\}/g);
    const variables = variableMatches
      ? [...new Set(variableMatches.map((v) => v.replace(/[{}]/g, "")))]
      : [];

    onSave({
      ...formData,
      variables,
    });
  };

  const isValid = formData.name.trim() && formData.content.trim();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle className="text-xl">
            {template ? "Edit Template" : "Create New Template"}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Section - Editor */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Basic Info</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Template Name *</Label>
                    <Input
                      id="template-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Welcome Message"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger id="category" className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templateCategories
                          .filter((cat) => cat !== "All")
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="channel">Channel *</Label>
                    <Select
                      value={formData.channel}
                      onValueChange={(value) =>
                        setFormData({ ...formData, channel: value })
                      }
                    >
                      <SelectTrigger id="channel" className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templateChannels
                          .filter((ch) => ch !== "All Channels")
                          .map((channel) => (
                            <SelectItem key={channel} value={channel}>
                              {channel}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4 text-foreground">Template Builder</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="template-content">Message Content *</Label>
                    <Textarea
                      id="template-content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Type your message here... Use {{variable_name}} for dynamic content"
                      className="mt-1.5 min-h-[200px] font-mono text-sm"
                    />
                  </div>

                  <div>
                    <Label>Insert Variable</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {templateVariables.map((variable) => (
                        <Button
                          key={variable.value}
                          variant="outline"
                          size="sm"
                          onClick={() => handleInsertVariable(variable.value)}
                          className="text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {variable.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {formData.variables.length > 0 && (
                    <div>
                      <Label>Detected Variables</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.variables.map((variable) => (
                          <Badge key={variable} variant="secondary">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Preview */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Live Preview</h3>
              <Card className="p-4 bg-muted min-h-[400px]">
                <PreviewBubble
                  content={formData.content}
                  channel={formData.channel}
                  variables={formData.variables}
                />
              </Card>

              <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> Variables like{" "}
                  <code className="bg-background px-1 py-0.5 rounded text-accent">
                    {"{"}
                    {"{"}customer_name{"}}"}
                  </code>{" "}
                  will be replaced with actual data when the template is used.
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid} className="gap-2">
            <Save className="h-4 w-4" />
            {template ? "Update Template" : "Create Template"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
