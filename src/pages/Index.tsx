import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles, Zap, BarChart3, Users, CheckCircle, ArrowRight, ShoppingCart, Workflow } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [navigate]);

  const features = [
    { icon: MessageSquare, title: "Unified Inbox", description: "Manage WhatsApp, Instagram, Facebook & Web Chat in one place", color: "text-primary" },
    { icon: Sparkles, title: "AI-Powered Assistant", description: "Intelligent responses and automatic conversation handling", color: "text-accent" },
    { icon: ShoppingCart, title: "E-commerce Integration", description: "Product catalog, orders, and payment links in conversations", color: "text-success" },
    { icon: Workflow, title: "Workflow Automation", description: "Build automated workflows for lead nurturing and follow-ups", color: "text-warning" },
    { icon: BarChart3, title: "Analytics & Insights", description: "Track conversations, sales, and team performance in real-time", color: "text-primary" },
    { icon: Users, title: "Team Collaboration", description: "Assign conversations, track tasks, and collaborate seamlessly", color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">OmniChat OS</h1>
                <p className="text-xs text-muted-foreground">Business Assistant</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate("/auth")}>Login</Button>
              <Button onClick={() => navigate("/auth")}>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20 text-center">
        <Badge variant="secondary" className="mb-4"><Zap className="h-3 w-3 mr-1" />WhatsApp-First AI Platform</Badge>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Your All-in-One<br />Customer Engagement Hub
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Turn conversations into conversions with AI-powered automation, unified messaging, and intelligent workflows.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/auth")}>Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>Watch Demo</Button>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-3">Everything You Need</h3>
          <p className="text-muted-foreground">Powerful features to transform your customer communication</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="hover-lift border-border/50">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-semibold">OmniChat OS</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 OmniChat OS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
