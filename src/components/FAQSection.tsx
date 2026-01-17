import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What qualifies for a free rough estimate?",
    answer:
      "Free rough estimates are available by phone or email for straightforward projects where you can describe the scope of work. This gives you a ballpark range to help with budgeting before committing to an in-person consultation. Simply call us at (832) 513-5737 or email info@boldremo.com with details about your project.",
  },
  {
    question: "What happens during the $75 in-home design consult?",
    answer:
      "During the consultation, our design expert visits your home to take precise measurements, assess your existing plumbing and electrical, discuss your vision and preferences, and review material options. You'll receive detailed, realistic pricing and a preliminary project timeline. The $75 fee is credited toward your project if you choose to move forward with us.",
  },
  {
    question: "How long does a typical bathroom remodel take?",
    answer:
      "Timeline depends on the scope: Refresh Remodels (cosmetic updates) typically take 7-10 days. Signature Remodels (full renovation with custom tile) usually run 14-21 days. Luxury Spa Remodels with heated floors, frameless glass, and premium materials may take 21+ days. We provide a detailed timeline during your consultation and keep you informed throughout.",
  },
  {
    question: "Do you help with design decisions?",
    answer:
      "Absolutely! Our team guides you through every design choice—from tile patterns and color palettes to fixture styles and layout optimization. We bring material samples, share inspiration photos, and leverage our experience to help you create a bathroom that reflects your style while maximizing functionality and value.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, BoldREMO carries general liability insurance to protect our clients and their property. We work exclusively with licensed tradespeople for all plumbing and electrical work, ensuring every aspect of your project meets Texas code requirements. We're happy to provide proof of insurance upon request.",
  },
  {
    question: "How do payments work?",
    answer:
      "We require a deposit to secure your project date and order materials. Progress payments are tied to project milestones, with final payment due upon completion. We provide a detailed payment schedule in your proposal so there are no surprises. We accept checks, credit cards, and financing options for qualified buyers.",
  },
  {
    question: "What areas of Houston do you serve?",
    answer:
      "BoldREMO proudly serves Houston, Heights, Bellaire, River Oaks, Kingwood, and surrounding communities. Our team of experienced contractors brings quality bathroom remodeling and tile installation services to homeowners throughout these areas.",
  },
  {
    question: "Can you work with my existing layout or do I need a complete redesign?",
    answer:
      "We can do both! Many clients prefer to refresh their bathroom while keeping the existing layout to minimize costs and construction time. Others want a complete transformation with relocated fixtures and expanded space. During your consultation, we'll discuss all options and help you determine the best approach for your goals, timeline, and budget.",
  },
];

export const FAQSection = () => {
  return (
    <section
      className="section-padding bg-muted"
      aria-labelledby="faq-heading"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Get answers to common questions about our bathroom remodeling and
            tile installation services in Houston. Can't find what you're
            looking for? Give us a call at (832) 513-5737.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
