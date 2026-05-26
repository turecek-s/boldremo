import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why do remodel quotes vary so much?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because scope, materials, and layout changes all drive cost. A quote without seeing your bathroom is just a guess.",
      },
    },
    {
      "@type": "Question",
      name: "Can I supply all my own materials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We install customer-supplied finish materials.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a remodel take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "7 to 12 days for a smaller full bathroom, 3 to 6 weeks for a master renovation.",
      },
    },
  ],
};

const BathroomRemodelCost = () => {
  return (
    <>
      <SeoHead path="/bathroom-remodel-cost-houston" jsonLd={faqJsonLd} />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6 text-center">
              How Much Does a Bathroom Remodel Cost in Houston?
            </h1>
            <p className="text-lg text-foreground/85 leading-relaxed">
              The honest answer is it depends — but that's not helpful when you're
              trying to budget. Here's how BoldREMO breaks it down so you know
              what to expect before you call anyone.
            </p>
          </div>
        </section>

        {/* Content sections */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl space-y-14">
            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                How BoldREMO Pricing Works
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                BoldREMO charges for labor and installation materials — waterproofing,
                GoBoard, thinset, grout, shower glass, and everything needed to do the
                job right. You purchase your own finish materials — tile, toilet, vanity,
                faucets, fixtures, mirror, and hardware. This means you control the look
                and the material budget. We control the quality of the work.
              </p>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                What You Pay BoldREMO — Labor and Installation Materials
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Shower-only conversion:</strong>{" "}
                  starting at $7,000.
                </p>
                <p>
                  <strong className="text-foreground">Full bathroom transformation</strong>{" "}
                  (shower, floor tile, vanity, toilet, fixtures, mirror, paint): $8,000 to
                  $15,000 depending on size and scope.
                </p>
                <p>
                  <strong className="text-foreground">Master bathroom full renovation:</strong>{" "}
                  $15,000 to $35,000 depending on size, layout changes, and scope.
                </p>
                <p>
                  <strong className="text-foreground">Luxury spa build</strong> with premium
                  finishes, heated floors, and custom details: $35,000 and up.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                What You Budget for Finish Materials
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Smaller bathroom</strong> (guest or
                  secondary bath): $2,000 to $6,000 for tile, toilet, vanity, fixtures,
                  and mirror.
                </p>
                <p>
                  <strong className="text-foreground">Master bathroom:</strong> $5,000 to
                  $20,000+ depending on tile selection, fixture grade, and custom elements.
                </p>
                <p>
                  Material costs vary significantly based on where you shop and what you
                  choose. We are happy to point you toward Houston suppliers we trust.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                Total All-In Investment
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Smaller full bathroom transformation:</strong>{" "}
                  $10,000 to $21,000 total.
                </p>
                <p>
                  <strong className="text-foreground">Master bathroom renovation:</strong>{" "}
                  $20,000 to $55,000+ total.
                </p>
                <p>
                  <strong className="text-foreground">Luxury spa build:</strong> $50,000 and up.
                </p>
                <p>
                  These are realistic ranges based on completed BoldREMO projects in Houston.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                What Drives Cost Up
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Layout changes</strong> that require
                  moving plumbing.
                </p>
                <p>
                  <strong className="text-foreground">Larger tile formats</strong> requiring
                  more precision labor.
                </p>
                <p>
                  <strong className="text-foreground">Custom shower details</strong> —
                  multiple showerheads, built-in benches, specialty niches.
                </p>
                <p>
                  <strong className="text-foreground">Heated floors.</strong>
                </p>
                <p>
                  <strong className="text-foreground">High-end stone or imported tile.</strong>
                </p>
                <p>
                  <strong className="text-foreground">Size of the bathroom.</strong>
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                A Few Things People Ask
              </h2>
              <div className="space-y-5">
                <div>
                  <p className="font-medium text-foreground">
                    Why do remodel quotes vary so much?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Because scope, materials, and layout changes all drive cost. A quote
                    without seeing your bathroom is just a guess.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Can I supply all my own materials?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes. We install customer-supplied finish materials.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    How long does a remodel take?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    7 to 12 days for a smaller full bathroom, 3 to 6 weeks for a master
                    renovation.
                  </p>
                </div>
              </div>
            </article>

            <article>
              <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
                How to Get an Accurate Number
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Call (832) 513-5737 for a free rough estimate by phone — most scopes take
                about 10 minutes to ballpark. For exact pricing, schedule a $75 in-person
                consultation. We measure, assess, discuss materials, and give you a written
                proposal. The $75 is credited to your project.
              </p>
            </article>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-lg text-foreground mb-6">
                Want a faster estimate? Try our{" "}
                <Link
                  to="/cost-calculator"
                  className="text-primary underline font-medium"
                >
                  Cost Calculator
                </Link>{" "}
                for an instant range based on your project details.
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
                We serve Heights, Bellaire, River Oaks, Kingwood, and all of Houston.
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

export default BathroomRemodelCost;
