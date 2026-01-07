import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import serviceBathroom from "@/assets/service-bathroom.jpg";

const Bellaire = () => {
  const services = [
    "Luxury bathroom renovations",
    "Custom tile installation",
    "Spa-inspired bathroom designs",
    "Vanity and countertop installation",
    "Plumbing fixture upgrades",
    "Flooring services",
  ];

  const neighborhoods = [
    "Bellaire",
    "Meyerland",
    "West University Place",
    "Braeswood Place",
    "Southside Place",
    "Medical Center Area",
  ];

  return (
    <>
      <Helmet>
        <title>Bathroom Remodeling Bellaire TX | BoldRemo</title>
        <meta
          name="description"
          content="Luxury bathroom remodeling in Bellaire, TX. BoldRemo creates stunning spa-inspired bathrooms for discerning homeowners. Free estimates. Call (832) 513-5737."
        />
        <meta
          name="keywords"
          content="bathroom remodeling Bellaire, Bellaire bathroom renovation, luxury bathroom contractor Bellaire TX, bathroom remodel Bellaire"
        />
        <link rel="canonical" href="https://www.boldremo.com/service-areas/bellaire" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-4">
                <MapPin className="h-5 w-5" />
                <span>Serving Bellaire, TX</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Bathroom Remodeling in Bellaire, Texas
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Create the luxury bathroom you deserve in your Bellaire home. BoldRemo delivers sophisticated bathroom renovations with the quality and attention to detail that Bellaire homeowners expect.
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
                  Bellaire's Premier Bathroom Renovation Team
                </h2>
                <p className="text-muted-foreground mb-6">
                  Bellaire homes deserve exceptional craftsmanship. Our team specializes in creating spa-inspired bathrooms that add both luxury and value to your property. From elegant master suites to sophisticated powder rooms, we bring your vision to life.
                </p>
                <p className="text-muted-foreground mb-8">
                  We work closely with Bellaire homeowners to design bathrooms that reflect their lifestyle, using premium materials and expert installation techniques.
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
                  alt="Luxury bathroom remodeling in Bellaire TX"
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
              Why Bellaire Homeowners Choose BoldRemo
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Luxury Focus</h3>
                <p className="text-muted-foreground">
                  We specialize in high-end bathroom renovations that meet the elevated standards of Bellaire homeowners.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Premium Materials</h3>
                <p className="text-muted-foreground">
                  From imported tiles to designer fixtures, we source the finest materials to create your dream bathroom.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Value Enhancement</h3>
                <p className="text-muted-foreground">
                  Our renovations are designed to maximize both your enjoyment and your home's resale value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
              Serving Bellaire & Surrounding Areas
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
              We provide luxury bathroom remodeling services throughout Bellaire and the surrounding Southwest Houston communities.
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
              Ready for Your Bellaire Bathroom Transformation?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Schedule your free consultation and discover how we can create the luxury bathroom you've always wanted.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Get Your Free Quote</Link>
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

export default Bellaire;
