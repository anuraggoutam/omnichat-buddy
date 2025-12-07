import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "OmniChat OS transformed how we handle customer inquiries. Our response time dropped from hours to minutes, and our customer satisfaction scores are through the roof!",
    author: "Sarah Chen",
    role: "Head of Customer Success",
    company: "TechFlow Inc",
    avatar: "SC",
    rating: 5,
  },
  {
    content: "The AI assistant is incredibly smart. It handles 70% of our conversations automatically, freeing up our team to focus on complex issues that really need human touch.",
    author: "Michael Rodriguez",
    role: "Operations Manager",
    company: "RetailPro",
    avatar: "MR",
    rating: 5,
  },
  {
    content: "We tried several platforms before OmniChat OS. None came close to the ease of use and powerful features. The workflow automation alone saved us 20 hours per week.",
    author: "Emily Watson",
    role: "CEO",
    company: "GrowthLab",
    avatar: "EW",
    rating: 5,
  },
  {
    content: "Integration was seamless. We connected all our channels in under an hour and were up and running the same day. The support team was incredibly helpful.",
    author: "David Park",
    role: "CTO",
    company: "InnovateTech",
    avatar: "DP",
    rating: 5,
  },
  {
    content: "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions about our customer communication strategy.",
    author: "Lisa Thompson",
    role: "Marketing Director",
    company: "BrandX",
    avatar: "LT",
    rating: 5,
  },
  {
    content: "Our sales conversions increased by 35% after implementing OmniChat OS. The ability to respond instantly to leads has been a game-changer for our business.",
    author: "James Wilson",
    role: "Sales Director",
    company: "SalesForce Pro",
    avatar: "JW",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Loved by{" "}
            <span className="text-primary">Businesses Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of companies already using OmniChat OS to transform their customer communication
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="border-border/50 hover-lift">
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
