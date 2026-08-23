import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import { LegalTabs } from "@/components/LegalTabs";

const sections = [
  {
    heading: "1. Introduction",
    body:
      'This Privacy Policy explains how BoldREMO LLC ("BoldREMO," "we," "us," or "our") collects, uses, and protects information when you visit our website, contact us, or communicate with us by phone, email, or text message. By using our website or contacting us, you agree to the practices described in this policy.',
  },
  {
    heading: "2. Information We Collect",
    body:
      "We collect information you provide directly to us, including your name, phone number, email address, home address, and details about your remodeling project. We collect this information when you fill out a form on our website, call or email us, request an estimate, book a consultation, or send us a text message.",
  },
  {
    heading: "3. How We Use Your Information",
    body:
      "We use the information you provide strictly to deliver our services. This includes scheduling estimate visits and design consultations, providing project estimates and pricing, communicating with you about the status of your project, responding to your questions, and following up after a consultation or completed project. We do not use your contact information for unrelated marketing purposes without your consent.",
  },
  {
    heading: "4. Mobile Information and SMS Privacy",
    body:
      "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. Message and data rates may apply. Message frequency varies based on your interaction with our project and scheduling communications.",
  },
  {
    heading: "5. How We Share Information",
    body:
      "We do not sell your information. We may share information with service providers who help us operate our business, such as scheduling tools, email delivery services, and SMS messaging platforms, solely to help us deliver our services to you. We do not share your information with third parties for their own marketing purposes.",
  },
  {
    heading: "6. Data Retention and Security",
    body:
      "We retain your information for as long as needed to provide our services and maintain business records, and we use reasonable administrative and technical safeguards to protect it.",
  },
  {
    heading: "7. Your Choices",
    body:
      "You may opt out of text messages at any time by texting STOP, and you can request assistance at any time by texting HELP or contacting us directly using the information below. See our Terms & Conditions for full details on our SMS program.",
  },
  {
    heading: "8. Children's Privacy",
    body:
      "Our website and services are not directed to children under 13, and we do not knowingly collect information from children.",
  },
  {
    heading: "9. Changes to This Policy",
    body:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.",
  },
  {
    heading: "10. Contact Us",
    body:
      "If you have questions about this Privacy Policy, contact us at info@boldremo.com or (832) 513-5737.",
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <SeoHead
        path="/privacy-policy"
        title="Privacy Policy | BoldREMO"
        description="How BoldREMO collects, uses, and protects your information, including our SMS messaging privacy practices."
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              How BoldREMO collects, uses, and protects your information.
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

export default PrivacyPolicy;
