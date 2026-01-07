import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import serviceBathroom from "@/assets/service-bathroom.jpg";

const RiverOaks = () => {
  const services = [
    "Estate bathroom renovations",
    "Custom tile and stonework",
    "High-end fixture installation",
    "Master suite transformations",
    "Designer vanity installation",
    "Luxury flooring services",
  ];

  const neighborhoods = [
    "River Oaks",
    "Tanglewood",
    "Memorial",
    "Galleria Area",
    "Highland Village",
    "Upper Kirby",
  ];

  return (
    <>
      <Helmet>
        <title>Bathroom Remodeling River Oaks TX | BoldRemo</title>
        <meta
          name="description"
          content="Elite bathroom remodeling for River Oaks estates. BoldRemo delivers exceptional craftsmanship for Houston's most prestigious homes. Call (832) 513-5737."
        />
        <meta
          name="keywords"
          content="bathroom remodeling River Oaks, River Oaks bathroom renovation, luxury bathroom contractor River Oaks TX, high-end bathroom remodel Houston"
        />
        <link rel="canonical" href="https://www.boldremo.com/service-areas/river-oaks" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-4">
                <MapPin className="h-5 w-5" />
                <span>Serving River Oaks, TX</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Bathroom Remodeling in River Oaks
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Elevate your River Oaks estate with world-class bathroom renovations. BoldRemo brings unparalleled expertise and craftsmanship to Houston's most prestigious neighborhood.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <a href="tel:+18325135737" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    (832) 513-5737
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/contact">Get Free Estimate</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  River Oaks' Exclusive Bathroom Renovation Partner
                </h2>
                <p className="text-muted-foreground mb-6">
                  River Oaks homes represent the pinnacle of Houston luxury living. Our bathroom renovation services match that standard with meticulous attention to detail, premium materials, and designs that complement the grandeur of your estate.
                </p>
                <p className="text-muted-foreground mb-8">
                  From expansive master suites to elegant guest bathrooms, we create spaces that reflect the sophistication and quality that River Oaks homeowners demand.
                </p>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src={serviceBathroom}
                  alt="Luxury bathroom remodeling in River Oaks Houston"
                  className="rounded-lg shadow-lg w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
              Why River Oaks Estates Trust BoldRemo
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Elite Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Our master craftsmen deliver the exceptional quality that River Oaks homes require, with attention to every detail.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Exclusive Materials</h3>
                <p className="text-muted-foreground">
                  Access to rare stones, custom fixtures, and designer elements that create truly one-of-a-kind bathrooms.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Discreet Service</h3>
                <p className="text-muted-foreground">
                  We understand the privacy expectations of River Oaks residents and conduct our work with complete professionalism.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
              Serving River Oaks & Nearby Communities
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
              We provide elite bathroom remodeling services throughout River Oaks and Houston's most exclusive neighborhoods.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {neighborhoods.map((neighborhood) => (
                <span
                  key={neighborhood}
                  className="px-4 py-2 bg-muted rounded-full text-foreground"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Elevate Your River Oaks Bathroom?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Schedule a private consultation to discuss your bathroom renovation vision. We're ready to exceed your expectations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/gallery" className="flex items-center gap-2">
                  View Our Work
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RiverOaks;
