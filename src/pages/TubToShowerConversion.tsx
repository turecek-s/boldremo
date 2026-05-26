import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const TubToShowerConversion = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I just do the shower and skip the rest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, shower-only conversions start at $7,000 for labor and installation materials.",
        },
      },
      {
        "@type": "Question",
        name: "Will removing the tub hurt my home value?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not if you have a second tub in the house.",
        },
      },
      {
        "@type": "Question",
        name: "Can you work with tile I already purchased?",
        acceptedAnswer: { "@type": "Answer", text: "Yes." },
      },
      {
        "@type": "Question",
        name: "Do you install frameless glass?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we work with a local Houston glass supplier.",
        },
      },
    ],
  };

  return (
    <>
      <SeoHead path="/tub-to-shower-conversion-houston" jsonLd={faqJsonLd} />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 text-center">
              Tub to Shower Conversion in Houston, TX
            </h1>
            <p className="text-lg text-foreground/85 leading-relaxed">
              Most bathtubs in Houston stop being used long before anyone does
              something about them. When you're ready, BoldREMO turns that
              unused tub into a custom walk-in shower — and while we're there,
              we transform the whole bathroom. New floor tile, vanity, toilet,
              fixtures, mirror, and paint. When the project is done, you have a
              completely different bathroom — not just a new shower.
            </p>
          </div>
        </section>

        {/* Content sections */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl space-y-14">
            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                What's Included in This Project
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This is a full bathroom transformation centered around replacing
                your tub with a custom walk-in shower. A typical BoldREMO
                tub-to-shower project includes: custom shower build with proper
                waterproofing using Schluter system and GoBoard backer, tile
                walls, center drain, and frameless glass. New floor tile. Vanity
                and sink installation. Toilet replacement. Light fixtures and
                mirror. Paint. Optional linen cabinet. We do all the labor and
                supply all installation materials — waterproofing, thinset,
                grout, shower glass, GoBoard, and everything needed to do the
                job right.
              </p>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                What You Supply
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You choose and purchase your finish materials — the pieces you
                actually see every day. That includes: tile (floor and shower
                walls), toilet, vanity and sink, faucet and hardware, light
                fixtures, mirror, and paint color. We can help you think through
                selections and pick up materials for you. This keeps your
                project personal — you pick what goes in your home.
              </p>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                What It Costs
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                BoldREMO's labor and installation materials for a full
                tub-to-shower bathroom transformation run $8,000 to $15,000
                depending on bathroom size and scope. Your finish materials —
                tile, toilet, vanity, fixtures, mirror — are on top of that. A
                realistic budget for finish materials on a smaller bathroom runs
                $2,000 to $6,000 depending on what you choose. So your total
                all-in investment is typically $10,000 to $21,000. You get a
                written proposal with exact numbers before any work begins.
              </p>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                How Long It Takes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most full bathroom transformations take 7 to 12 days. We give
                you a clear timeline before we start and we stick to it.
              </p>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                A Few Things People Ask
              </h2>
              <div className="space-y-5">
                <div>
                  <p className="font-medium text-foreground">
                    Can I just do the shower and skip the rest?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, shower-only conversions start at $7,000 for labor and
                    installation materials.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Will removing the tub hurt my home value?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Not if you have a second tub in the house.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Can you work with tile I already purchased?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">Yes.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Do you install frameless glass?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, we work with a local Houston glass supplier.
                  </p>
                </div>
              </div>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                How to Get Started
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Call (832) 513-5737 for a free rough estimate by phone — most
                projects take about 10 minutes to ballpark. If you want exact
                pricing, we come to you for a $75 in-person consultation and
                give you a written proposal. The $75 is credited to your
                project.
              </p>
            </article>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-lg text-foreground mb-6">
                We serve Heights, Bellaire, River Oaks, Kingwood, and all of
                Houston.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="tel:+18325135737">
                    <Phone className="mr-2 h-4 w-4" />
                    Call (832) 513-5737
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="mailto:info@boldremo.com">
                    <Mail className="mr-2 h-4 w-4" />
                    info@boldremo.com
                  </a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Or <Link to="/contact" className="text-primary underline">book your bathroom consult online</Link>.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default TubToShowerConversion;
