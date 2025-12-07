import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer: "You get full access to all features during the trial period. No credit card required to start. At the end of the trial, you can choose a plan that fits your needs or continue with a limited free tier."
  },
  {
    question: "Can I connect multiple WhatsApp numbers?",
    answer: "Yes! With the Professional and Enterprise plans, you can connect multiple WhatsApp Business accounts. Each number can be assigned to different teams or departments."
  },
  {
    question: "How does the AI assistant work?",
    answer: "Our AI is trained on your business data and can handle common customer inquiries automatically. You can create custom personas, set up response templates, and define when to escalate to human agents."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use end-to-end encryption for all messages, are GDPR compliant, and offer role-based access control. Enterprise customers can also opt for on-premise deployment."
  },
  {
    question: "Can I integrate with my existing tools?",
    answer: "Yes, we offer integrations with popular CRM, e-commerce, and helpdesk platforms. Our API also allows for custom integrations with any tool you use."
  },
  {
    question: "What kind of support do you offer?",
    answer: "Starter plans include email support. Professional plans get priority support with faster response times. Enterprise customers receive dedicated account management and 24/7 phone support."
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. If you upgrade mid-cycle, you'll be charged a prorated amount."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 30 days of purchase for a full refund."
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about OmniChat OS
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="border border-border/50 rounded-lg px-6 data-[state=open]:bg-muted/30"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
