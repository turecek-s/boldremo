import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SeoHead } from "@/components/SeoHead";
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
              Luxury bathroom remodeling in Houston, Heights, Bellaire, River Oaks & Kingwood.
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

        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Services;
