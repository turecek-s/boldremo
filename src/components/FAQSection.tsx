import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does a typical bathroom remodel take?",
    answer:
      "A standard bathroom remodel typically takes 2-4 weeks depending on the scope of work. Simple updates like new fixtures and paint may take just a week, while complete gut renovations with custom tile work, new plumbing, and electrical updates can extend to 4-6 weeks. We provide detailed timelines during your consultation and keep you informed throughout the project.",
  },
  {
    question: "What areas of Houston do you serve?",
    answer:
      "BoldREMO proudly serves the greater Houston metropolitan area including Houston Heights, Bellaire, River Oaks, Kingwood, The Woodlands, Katy, Sugar Land, and surrounding communities. Our team of experienced contractors travels throughout the region to bring quality bathroom remodeling and tile installation services to homeowners across Harris County and beyond.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes, we offer free, no-obligation estimates for all bathroom remodeling and tile installation projects. During your consultation, our experts will assess your space, discuss your vision and budget, and provide a detailed written estimate. Call us at (832) 513-5737 to schedule your free consultation today.",
  },
  {
    question: "What types of tile do you install?",
    answer:
      "Our skilled craftsmen work with all types of tile including ceramic, porcelain, natural stone (marble, granite, travertine, slate), glass mosaic, and large-format tiles. We handle everything from classic subway tile patterns to intricate custom designs. Whether you want modern minimalist aesthetics or traditional elegance, we have the expertise to bring your vision to life.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, BoldREMO carries general liability insurance to protect our clients and their property. We also work exclusively with licensed tradespeople for all plumbing and electrical work, ensuring every aspect of your project meets Texas code requirements. We're happy to provide proof of insurance upon request.",
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
