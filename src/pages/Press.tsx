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
              <Newspaper className="h-3.5 w-3.5" />
              Press, Partners & Recognition
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              In the Press &amp; Trusted by Houston
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              BoldREMO partners with Houston's leading suppliers, designers, and realtors
              to deliver luxury bathroom remodels across Heights, Bellaire, River Oaks,
              Kingwood, and beyond. Below: media coverage, partners, and certifications.
            </p>
          </div>
        </section>

        {/* Press / "As featured in" */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-3">
                As Featured In
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Recent media coverage of BoldREMO's work across Houston's most prestigious neighborhoods.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRESS_MENTIONS.map((mention) => {
                const isPlaceholder = !mention.url;
                const Wrapper: React.ElementType = isPlaceholder ? "div" : "a";
                const wrapperProps = isPlaceholder
                  ? {}
                  : { href: mention.url, target: "_blank", rel: "noopener noreferrer" };
                return (
                  <Wrapper
                    key={mention.outlet}
                    {...wrapperProps}
                    className={`group bg-card border border-border rounded-lg p-6 transition-all ${
                      isPlaceholder
                        ? "opacity-70"
                        : "hover:border-primary hover:shadow-md cursor-pointer"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-semibold text-foreground leading-snug">
                        {mention.outlet}
                      </h3>
                      {!isPlaceholder && (
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    {mention.quote && (
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        &ldquo;{mention.quote}&rdquo;
                      </p>
                    )}
                    {mention.date && (
                      <p className="text-xs text-muted-foreground mt-3">{mention.date}</p>
                    )}
                  </Wrapper>
                );
              })}
            </div>
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
                BoldREMO sources premium materials and works alongside Houston's best
                designers and realtors to deliver every project.
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
