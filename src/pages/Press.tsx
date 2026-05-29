import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Handshake, ShieldCheck } from "lucide-react";
import { PARTNERS, CERTIFICATIONS } from "@/data/partners";

const Press = () => {
  return (
    <>
      <SeoHead path="/press" />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground mb-6">
              <Handshake className="h-3.5 w-3.5" />
              Partners & Recognition
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              Trusted by Houston
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              BoldREMO partners with Houston's leading suppliers
              to deliver luxury bathroom remodels across Heights, Bellaire, River Oaks,
              Kingwood, and beyond.
            </p>
          </div>
        </section>

        {/* Trusted Partners */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground mb-4">
                <Handshake className="h-3.5 w-3.5" />
                Industry Partnerships
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-3">
                Our Trusted Partners
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                BoldREMO sources premium materials to deliver every project.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-background border border-border rounded-lg p-5 text-center"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">
                    {partner.name}
                  </h3>
                  {partner.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {partner.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline">
                <Link to="/realtors-designers">
                  Become a partner →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-4">
                <ShieldCheck className="h-3.5 w-3.5" />
                Credentials
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-3">
                Certifications &amp; Memberships
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Licensed, insured, and accountable. We hold credentials that protect you
                and back our craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-card border border-border rounded-lg p-6 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">
                    {cert.name}
                  </h3>
                  {cert.description && (
                    <p className="text-xs text-muted-foreground">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Press;
