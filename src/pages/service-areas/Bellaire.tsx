import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { Button } from "@/components/ui/button";
import { BrandName } from "@/components/BrandName";
import { SeoFallback } from "@/components/SeoFallback";
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
        <title>Luxury Bathroom Remodeling in Bellaire TX | BoldREMO</title>
        <meta
          name="description"
          content="Luxury bathroom remodeling in Bellaire, TX. BoldREMO crafts spa-inspired bathrooms with premium materials. Book a $75 design consult — (832) 513-5737."
        />
        <meta
          name="keywords"
          content="luxury bathroom remodeling Bellaire TX, Bellaire bathroom renovation, luxury bathroom contractor Bellaire, spa bathroom remodel Bellaire"
        />
        <meta property="og:title" content="Luxury Bathroom Remodeling in Bellaire TX | BoldREMO" />
        <meta property="og:description" content="Luxury bathroom remodeling in Bellaire, TX. BoldREMO crafts spa-inspired bathrooms with premium materials. Book a $75 design consult — (832) 513-5737." />
        <meta property="og:url" content="https://www.boldremo.com/service-areas/bellaire" />
        <meta name="twitter:title" content="Luxury Bathroom Remodeling in Bellaire TX | BoldREMO" />
        <meta name="twitter:description" content="Luxury bathroom remodeling in Bellaire, TX. BoldREMO crafts spa-inspired bathrooms with premium materials. Book a $75 design consult — (832) 513-5737." />
        <meta name="twitter:url" content="https://www.boldremo.com/service-areas/bellaire" />
        <link rel="canonical" href="https://www.boldremo.com/service-areas/bellaire" />
      </Helmet>

      <SeoFallback path="/service-areas/bellaire" />
      <LocalBusinessSchema />
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
                Create the luxury bathroom you deserve in your Bellaire home. <BrandName /> delivers sophisticated bathroom renovations with the quality and attention to detail that Bellaire homeowners expect.
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
              Why Bellaire Homeowners Choose <BrandName />
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

        {/* Neighborhood Detail */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                What Bellaire Bathroom Remodels Usually Look Like
              </h2>
              <p>
                Bellaire is largely teardowns and new-builds at this point, but plenty of the original ranch homes are still standing and getting renovated rather than replaced. In the older homes, the jobs are usually master bath gut renovations — knocking out a wall to steal closet space, adding a walk-in shower, doubling up the vanity, and modernizing the plumbing. In the newer two-story homes built in the last fifteen years, the work is more about refreshing builder-grade finishes that aged faster than the house did: tile that looks dated, hardware that's chipping, mirrors and lighting chosen for resale rather than for living.
              </p>
              <h3 className="text-2xl font-serif font-bold text-foreground pt-4">
                What <BrandName /> Brings to Bellaire
              </h3>
              <p>
                We protect floors, woodwork, and stair railings on the way to second-floor bathrooms, we keep dust contained, and we work around the school-day schedule for families who can't have a job site loud at pickup time. We're used to coordinating with the City of Bellaire's permitting process when scope requires it.
              </p>
              <h3 className="text-2xl font-serif font-bold text-foreground pt-4">
                How Our Pricing Works
              </h3>
              <p>
                <BrandName /> charges for labor and installation materials separately from the finish materials you supply. You source the tile, vanity, fixtures, and lighting at the price points you want, and we install them. You see exactly what's labor and what's materials — no markup on things we didn't buy.
              </p>
              <h3 className="text-2xl font-serif font-bold text-foreground pt-4">
                How to Get Started
              </h3>
              <p>
                Send photos, rough dimensions, and what you'd change. We'll give you a rough estimate by phone in about ten minutes. For exact numbers we schedule a $75 in-person consultation, measure the space, and write you a proposal.
              </p>
              <p className="text-foreground font-medium pt-2">
                Call (832) 513-5737 for a free rough estimate by phone, or book a $75 in-person consultation credited to your project.
              </p>
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

export default Bellaire;
