import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BrandName } from "@/components/BrandName";
import { Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import serviceBathroom from "@/assets/service-bathroom.jpg";

const Kingwood = () => {
  const services = [
    "Complete bathroom renovations",
    "Custom tile installation",
    "Shower and tub conversions",
    "Vanity and countertop installation",
    "Plumbing fixture upgrades",
    "Flooring services",
  ];

  const neighborhoods = [
    "Kingwood",
    "Kings Manor",
    "Elm Grove",
    "Forest Cove",
    "Greentree Village",
    "Hunters Ridge",
  ];

  return (
    <>
      <Helmet>
        <title>Luxury Bathroom Remodeling in Kingwood TX | BoldREMO</title>
        <meta
          name="description"
          content="Luxury bathroom remodeling in Kingwood, TX. BoldREMO transforms bathrooms with expert craftsmanship & quality materials. Book a $75 design consult — (832) 513-5737."
        />
        <meta
          name="keywords"
          content="luxury bathroom remodeling Kingwood TX, Kingwood bathroom renovation, bathroom contractor Kingwood, luxury tile installation Kingwood"
        />
        <link rel="canonical" href="https://www.boldremo.com/service-areas/kingwood" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-4">
                <MapPin className="h-5 w-5" />
                <span>Serving Kingwood, TX</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Bathroom Remodeling in Kingwood, Texas
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Transform your Kingwood home with expert bathroom renovations. From modern updates to complete transformations, <BrandName /> delivers quality craftsmanship tailored to Kingwood homeowners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <a href="tel:+18325135737" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    (832) 513-5737
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/contact">Book Bathroom Consult</Link>
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
                  Kingwood's Trusted Bathroom Remodeling Experts
                </h2>
                <p className="text-muted-foreground mb-6">
                  Kingwood homeowners deserve bathroom renovations that match the quality and character of their beautiful community. Whether you're updating a master bath in Kings Manor or renovating a guest bathroom in Forest Cove, BoldRemo brings decades of experience to every project.
                </p>
                <p className="text-muted-foreground mb-8">
                  We understand the unique needs of Kingwood homes, from addressing humidity concerns to maximizing natural light in your bathroom design.
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
                  alt="Bathroom remodeling project in Kingwood TX"
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
              Why Kingwood Homeowners Choose <BrandName />
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Local Expertise</h3>
                <p className="text-muted-foreground">
                  We know Kingwood homes inside and out. Our team understands local building codes, HOA requirements, and the specific challenges of renovating in this beautiful community.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Quality Materials</h3>
                <p className="text-muted-foreground">
                  We source premium materials that withstand Houston's humidity while delivering the luxury look Kingwood homeowners expect.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Transparent Pricing</h3>
                <p className="text-muted-foreground">
                  No surprises. We provide detailed estimates upfront and keep you informed throughout your bathroom remodeling project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
              Serving All Kingwood Neighborhoods
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
              From established neighborhoods to newer developments, we provide bathroom remodeling services throughout the Kingwood area.
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
              Ready to Remodel Your Kingwood Bathroom?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Get a free rough estimate by phone or email, or book a $75 design consultation (credited toward your project).
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Book Bathroom Consult</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
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

export default Kingwood;
