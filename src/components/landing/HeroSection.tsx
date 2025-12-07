import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Play, CheckCircle } from "lucide-react";

const heroStats = [
  { value: "10K+", label: "Active Users" },
  { value: "50M+", label: "Messages Sent" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "User Rating" },
];

const trustedLogos = [
  "Acme Corp", "TechFlow", "Innovate", "DataSync", "CloudPro"
];

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20 lg:py-28 text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <Badge 
              variant="secondary" 
              className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
            >
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              WhatsApp-First AI Platform
            </Badge>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="block">Your All-in-One</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Customer Engagement Hub
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
            Turn conversations into conversions with AI-powered automation, unified messaging, 
            and intelligent workflows. All your channels in one powerful platform.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="h-12 px-8 text-base group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-12 px-8 text-base group"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-16 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Trusted by */}
          <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Trusted by leading companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {trustedLogos.map((logo, i) => (
                <div 
                  key={i} 
                  className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
