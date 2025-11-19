import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, Mail, Lock, QrCode } from "lucide-react";
import { demoTenant } from "@/lib/mockData";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleWhatsAppLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-2xl shadow-lg">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">OmniChat OS</h1>
          <p className="text-muted-foreground mt-1">WhatsApp-first AI Business Assistant</p>
        </div>

        <Card className="shadow-card border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your business dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="whatsapp">WhatsApp QR</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="hello@bakerybliss.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="px-0 text-sm">
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="whatsapp" className="space-y-4">
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <QrCode className="w-24 h-24 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium">Scan with WhatsApp</p>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Open WhatsApp on your phone, tap Menu → Linked Devices → Link a Device
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleWhatsAppLogin}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Connecting..." : "Login with Demo QR"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Account</span>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{demoTenant.name}</p>
              <p className="text-xs mt-1">Use any credentials for demo access</p>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Button variant="link" className="px-1">
            Contact Sales
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
