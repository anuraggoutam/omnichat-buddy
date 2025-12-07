import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  Sparkles, 
  ShoppingCart, 
  Workflow, 
  BarChart3, 
  Users, 
  Shield, 
  Zap,
  Globe,
  Bell,
  Clock,
  Headphones
} from "lucide-react";

const features = [
  { 
    icon: MessageSquare, 
    title: "Unified Inbox", 
    description: "Manage WhatsApp, Instagram, Facebook & Web Chat in one place. Never miss a conversation.",
    color: "text-primary bg-primary/10"
  },
  { 
    icon: Sparkles, 
    title: "AI-Powered Assistant", 
    description: "Intelligent responses and automatic conversation handling with custom AI personas.",
    color: "text-accent bg-accent/10"
  },
  { 
    icon: ShoppingCart, 
    title: "E-commerce Integration", 
    description: "Product catalog, orders, and payment links directly in conversations.",
    color: "text-success bg-success/10"
  },
  { 
    icon: Workflow, 
    title: "Workflow Automation", 
    description: "Build automated workflows for lead nurturing and follow-ups.",
    color: "text-warning bg-warning/10"
  },
  { 
    icon: BarChart3, 
    title: "Analytics & Insights", 
    description: "Track conversations, sales, and team performance in real-time.",
    color: "text-primary bg-primary/10"
  },
  { 
    icon: Users, 
    title: "Team Collaboration", 
    description: "Assign conversations, track tasks, and collaborate seamlessly.",
    color: "text-accent bg-accent/10"
  },
  { 
    icon: Globe, 
    title: "Multi-Channel Support", 
    description: "Connect all your messaging channels and manage them from one dashboard.",
    color: "text-success bg-success/10"
  },
  { 
    icon: Shield, 
    title: "Enterprise Security", 
    description: "End-to-end encryption, GDPR compliance, and role-based access control.",
    color: "text-warning bg-warning/10"
  },
  { 
    icon: Bell, 
    title: "Smart Notifications", 
    description: "Get notified about important conversations and never miss a lead.",
    color: "text-primary bg-primary/10"
  },
  { 
    icon: Clock, 
    title: "24/7 Availability", 
    description: "AI handles conversations round the clock, even when you're offline.",
    color: "text-accent bg-accent/10"
  },
  { 
    icon: Headphones, 
    title: "Premium Support", 
    description: "Dedicated support team to help you get the most out of the platform.",
    color: "text-success bg-success/10"
  },
  { 
    icon: Zap, 
    title: "Lightning Fast", 
    description: "Optimized for speed with instant message delivery and real-time updates.",
    color: "text-warning bg-warning/10"
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Scale Your Business</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features to transform your customer communication and drive growth
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card 
              key={i} 
              className="group hover-lift border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
