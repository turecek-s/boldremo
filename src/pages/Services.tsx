import { Link } from "@/lib/router-compat";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SeoHead } from "@/components/SeoHead";
import { AreaLinkedText } from "@/components/AreaLinkedText";
import { Button } from "@/components/ui/button";
import { Bath, Grid3X3, Paintbrush, Droplets, Wrench } from "lucide-react";

const services = [
  {
    icon: Bath,
    title: "Complete Bathroom Remodeling",
    description: "Full bathroom renovations tailored to your style and needs. From layout redesign to fixture selection, we handle every detail.",
  },
  {
    icon: Grid3X3,
    title: "Tile & Flooring Installation",
    description: "Expert tile installation including subway tiles, mosaic patterns, large format tiles, and custom flooring solutions.",
  },
  {
    icon: Droplets,
    title: "Custom Showers",
    description: "Walk-in showers, frameless glass enclosures, rain shower heads, and custom tile work for a spa-like experience.",
  },
  {
    icon: Paintbrush,
    title: "Vanity & Cabinetry",
    description: "Custom vanity installation, bathroom cabinets, and storage solutions to maximize your space and style.",
  },
  {
    icon: Wrench,
    title: "Plumbing Fixtures",
    description: "Professional installation of faucets, toilets, sinks, and all plumbing fixtures with quality craftsmanship.",
  },

];

const Services = () => {
  return (
    <>
      <SeoHead path="/services" />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              Our Services
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              <AreaLinkedText text="Bathroom remodeling in Houston, Heights, Bellaire, River Oaks, Kingwood & Memorial." />
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-background" aria-labelledby="services-list">
          <h2 id="services-list" className="sr-only">Our Remodeling Services</h2>
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Ready to start your bathroom renovation project?
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Book Bathroom Consult</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">How a Bathroom Project Works</h2>
              <ul className="space-y-4 text-muted-foreground leading-relaxed list-disc pl-5">
                <li><strong className="text-foreground">Rough estimate.</strong> Tell us about your bathroom by phone, email or with our cost calculator and we will give you a free rough price range.</li>
                <li><strong className="text-foreground">Design consultation.</strong> We visit your home, measure the space and talk through layout, tile and fixtures. The consultation fee is credited toward your project if you move forward with us.</li>
                <li><strong className="text-foreground">Final price.</strong> Exact pricing is set after the consultation, once we have seen your space and agreed on the scope.</li>
                <li><strong className="text-foreground">Build.</strong> We handle demolition, plumbing, waterproofing, tile, and the vanity and fixture installation.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">What Bathroom Remodeling Costs in Houston</h2>
              <p className="text-muted-foreground leading-relaxed">Tub to shower conversions start at $7,000. Full bathroom transformations typically run $8,000 to $15,000 in labor and installation, and most full remodels come in around $10,000 to $21,000 all in once tile, vanity and fixtures are included. Use our <Link to="/cost-calculator" className="text-primary underline underline-offset-2 hover:text-primary/80">cost calculator</Link> for a range based on your own bathroom, or read our <Link to="/bathroom-remodel-cost-houston" className="text-primary underline underline-offset-2 hover:text-primary/80">bathroom remodel cost guide</Link>.</p>

            </div>
          </div>
        </section>
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">Popular Bathroom Projects</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Tub to shower conversions are one of our most requested projects. See how the conversion works and what it costs on our <Link to="/tub-to-shower-conversion-houston" className="text-primary underline underline-offset-2 hover:text-primary/80">tub to shower conversion page</Link>.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">Walk-in tubs and aging-in-place bathrooms need extra care with floor leveling, waterproofing and door seal testing. Read <Link to="/blog/walk-in-tub-installation-houston" className="text-primary underline underline-offset-2 hover:text-primary/80">what goes into a walk-in tub installation</Link>.</p>
              <p className="text-muted-foreground leading-relaxed"><AreaLinkedText text="We serve Houston, Heights, Bellaire, River Oaks, Kingwood & Memorial." /></p>

            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Services;
