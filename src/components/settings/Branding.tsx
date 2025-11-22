import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Branding() {
  const handleSave = () => {
    toast.success("Branding updated successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Branding</h1>
        <p className="text-muted-foreground mt-1">
          Customize colors and appearance across your platform
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brand Colors</CardTitle>
          <CardDescription>
            Set your brand colors that will be used throughout the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-color"
                  type="color"
                  defaultValue="#3b82f6"
                  className="w-16 h-10 p-1"
                />
                <Input defaultValue="#3b82f6" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary-color"
                  type="color"
                  defaultValue="#8b5cf6"
                  className="w-16 h-10 p-1"
                />
                <Input defaultValue="#8b5cf6" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accent-color"
                  type="color"
                  defaultValue="#10b981"
                  className="w-16 h-10 p-1"
                />
                <Input defaultValue="#10b981" className="flex-1" />
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="flex gap-2">
              <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: "#3b82f6" }} />
              <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: "#8b5cf6" }} />
              <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: "#10b981" }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chat Widget Theme</CardTitle>
          <CardDescription>
            Customize the appearance of your website chat widget
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="widget-color">Widget Color</Label>
            <div className="flex gap-2">
              <Input
                id="widget-color"
                type="color"
                defaultValue="#25D366"
                className="w-16 h-10 p-1"
              />
              <Input defaultValue="#25D366" className="flex-1" />
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Widget Preview</h4>
            <div className="flex justify-end">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
