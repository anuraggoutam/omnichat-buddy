import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { aiModels } from "@/lib/mockSettings";
import { toast } from "sonner";

export function AIEngineSettings() {
  const handleSave = () => {
    toast.success("AI settings updated successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Engine Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure AI behavior and automation rules
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Model Selection</CardTitle>
          <CardDescription>
            Choose the AI model that powers your automation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>AI Model</Label>
            <Select defaultValue="gemini-pro">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {aiModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Personality & Tone</CardTitle>
          <CardDescription>
            Define how AI should communicate with your customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-tone">AI Response Tone</Label>
            <Textarea
              id="ai-tone"
              placeholder="E.g., Professional, friendly, and helpful. Always use customer's name..."
              rows={4}
              defaultValue="You are a helpful customer service agent. Be professional, friendly, and concise. Always address customers by name when possible. If you don't know something, direct them to a human agent."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Configuration</CardTitle>
          <CardDescription>
            Fine-tune AI response behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Response Length</Label>
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
            <p className="text-xs text-muted-foreground">
              Short responses are quick, long responses are detailed
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Confidence Threshold</Label>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Slider defaultValue={[75]} max={100} step={5} />
            <p className="text-xs text-muted-foreground">
              AI will hand over to human if confidence is below this threshold
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>
            Control when AI should respond automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-Reply to New Conversations</Label>
              <p className="text-sm text-muted-foreground">
                AI responds immediately to new inquiries
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-Handover on Complex Queries</Label>
              <p className="text-sm text-muted-foreground">
                Transfer to human when query is complex
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>AI Responses During Off-Hours</Label>
              <p className="text-sm text-muted-foreground">
                Continue AI responses outside business hours
              </p>
            </div>
            <Switch defaultChecked />
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
