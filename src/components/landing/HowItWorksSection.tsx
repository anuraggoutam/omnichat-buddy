import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles, TrendingUp, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Connect Your Channels",
    description: "Integrate WhatsApp, Instagram, Facebook, and web chat in minutes. No coding required.",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Configure Your AI",
    description: "Train your AI assistant with your brand voice, FAQs, and business rules.",
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    number: "03",
    icon: Zap,
    title: "Automate Workflows",
    description: "Set up automated responses, lead qualification, and follow-up sequences.",
    color: "bg-success/10 text-success border-success/20",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Watch Conversions Grow",
    description: "Track performance, optimize conversations, and scale your customer engagement.",
    color: "bg-warning/10 text-warning border-warning/20",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get Started in <span className="text-primary">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From setup to success in less than 30 minutes
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-success -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${i > 0 ? "md:mt-24" : ""}`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div
                    className={`inline-flex items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-shadow ${
                      i % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    <div className={`h-14 w-14 rounded-xl ${step.color} border flex items-center justify-center shrink-0`}>
                      <step.icon className="h-7 w-7" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-muted-foreground mb-1">
                        STEP {step.number}
                      </p>
                      <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="hidden md:flex h-12 w-12 rounded-full bg-background border-4 border-primary items-center justify-center font-bold text-primary z-10">
                  {step.number}
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
