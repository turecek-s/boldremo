import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import { LegalTabs } from "@/components/LegalTabs";

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body:
      'By using this website, requesting an estimate, booking a consultation, or communicating with BoldREMO LLC ("BoldREMO," "we," "us," or "our") by phone, email, or text message, you agree to these Terms & Conditions.',
  },
  {
    heading: "2. Our Services",
    body:
      "BoldREMO provides bathroom remodeling services, including tub-to-shower conversions and full bathroom renovations, to homeowners in the Houston area, including Heights, Bellaire, River Oaks, Kingwood, and Memorial. We offer free rough estimates by phone or email, and in-person design consultations for a fee, which is credited toward your project if you move forward with us.",
  },
  {
    heading: "3. SMS Messaging Program Terms",
    body:
      "By opting in through our website form or by sending us an inbound text message, you agree to receive customer service updates, scheduling notifications, and project estimate communications from BoldREMO by SMS text message. Message frequency varies based on your project and scheduling activity. Message and data rates may apply. Carriers are not liable for delayed or undelivered messages.",
  },
  {
    heading: "4. Opt-Out Instructions",
    body:
      "You can opt out of receiving text messages from us at any time by texting STOP to our number. After you text STOP, we will send one final message confirming that you have been unsubscribed, and you will not receive further text messages from us unless you opt in again.",
  },
  {
    heading: "5. Help Instructions",
    body:
      "For help at any time, text HELP to our number, or contact us directly at info@boldremo.com or (832) 513-5737.",
  },
  {
    heading: "6. Estimates and Pricing",
    body:
      "Rough estimates provided by phone or email are preliminary and based on limited information. Final pricing is determined after an in-person design consultation, where we assess your space and specific project requirements. Actual project costs may differ from any preliminary or rough estimate.",
  },
  {
    heading: "7. Limitation of Liability",
    body:
      "Preliminary and rough estimates are provided for general planning purposes only and do not constitute a guarantee of final project cost. BoldREMO is not liable for any decisions made in reliance on a preliminary estimate prior to a formal, in-person consultation. To the fullest extent permitted by law, our liability for any services provided is limited to the amount paid for those services.",
  },
  {
    heading: "8. Scheduling",
    body:
      "We schedule consultations and project work in good faith based on availability. Scheduling changes may occur due to weather, material availability, or other factors outside our control, and we will communicate any changes as soon as possible.",
  },
  {
    heading: "9. Governing Law",
    body:
      "These Terms & Conditions are governed by the laws of the State of Texas.",
  },
  {
    heading: "10. Changes to These Terms",
    body:
      "We may update these Terms & Conditions from time to time. Changes will be posted on this page with an updated effective date.",
  },
  {
    heading: "11. Contact Us",
    body:
      "Questions about these terms can be directed to info@boldremo.com or (832) 513-5737.",
  },
];

const Terms = () => {
  return (
    <>
      <SeoHead
        path="/terms"
        title="Terms & Conditions | BoldREMO"
        description="Terms of service for BoldREMO, including our SMS messaging program terms, opt-out instructions, and general service terms."
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The terms that apply to our services and SMS messaging program.
            </p>
          </div>
        </section>

        <LegalTabs />

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary mb-10">
                Effective Date: August 23, 2026
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">
                      {section.heading}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
