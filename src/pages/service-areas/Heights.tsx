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

const Heights = () => {
  const services = [
    "Historic home bathroom renovations",
    "Custom tile installation",
    "Vintage-modern bathroom designs",
    "Vanity and countertop installation",
    "Plumbing fixture upgrades",
    "Flooring services",
  ];

  const neighborhoods = [
    "Houston Heights",
    "Woodland Heights",
    "Norhill",
    "Sunset Heights",
    "Shady Acres",
    "Timbergrove",
  ];

  return (
    <>
      <Helmet>
        <title>Luxury Bathroom Remodeling in The Heights TX | BoldREMO</title>
        <meta
          name="description"
          content="Luxury bathroom remodeling in Houston Heights, TX. Historic home renovations, custom tile & spa-inspired designs. Book a $75 consult — (832) 513-5737."
        />
        <meta
          name="keywords"
          content="luxury bathroom remodeling Heights TX, bathroom renovation Houston Heights, bathroom contractor Heights, historic home bathroom remodel Heights"
        />
        <meta property="og:title" content="Luxury Bathroom Remodeling in The Heights TX | BoldREMO" />
        <meta property="og:description" content="Luxury bathroom remodeling in Houston Heights, TX. Historic home renovations, custom tile & spa-inspired designs. Book a $75 consult — (832) 513-5737." />
        <meta property="og:url" content="https://www.boldremo.com/service-areas/heights" />
        <meta name="twitter:title" content="Luxury Bathroom Remodeling in The Heights TX | BoldREMO" />
        <meta name="twitter:description" content="Luxury bathroom remodeling in Houston Heights, TX. Historic home renovations, custom tile & spa-inspired designs. Book a $75 consult — (832) 513-5737." />
        <meta name="twitter:url" content="https://www.boldremo.com/service-areas/heights" />
        <link rel="canonical" href="https://www.boldremo.com/service-areas/heights" />
      </Helmet>

      <SeoFallback path="/service-areas/heights" />
      <LocalBusinessSchema />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-4">
                <MapPin className="h-5 w-5" />
                <span>Serving Houston Heights, TX</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Bathroom Remodeling in Houston Heights
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Preserve the charm of your Heights home while upgrading to modern comfort. <BrandName /> specializes in bathroom renovations that honor the character of Houston's most beloved historic neighborhood.
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
                  Historic Heights Bathroom Renovation Specialists
                </h2>
                <p className="text-muted-foreground mb-6">
                  The Houston Heights is known for its beautiful historic homes and unique architectural character. Our team understands how to update bathrooms in these treasured properties while preserving the elements that make them special.
                </p>
                <p className="text-muted-foreground mb-8">
                  Whether you own a classic Victorian bungalow or a newly built home in the Heights, we deliver bathroom renovations that blend seamlessly with your home's style.
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
                  alt="Bathroom remodeling in Houston Heights"
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
              Why Heights Homeowners Choose <BrandName />
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Historic Home Expertise</h3>
                <p className="text-muted-foreground">
                  We understand the unique challenges of renovating historic Heights homes, from working with original plumbing to matching period-appropriate design elements.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Design Flexibility</h3>
                <p className="text-muted-foreground">
                  From vintage clawfoot tubs to sleek modern fixtures, we help you create a bathroom that reflects your personal style while complementing your home.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-4">Respectful Process</h3>
                <p className="text-muted-foreground">
                  We treat your Heights home with the care it deserves, maintaining clean work areas and communicating clearly throughout your project.
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
                What Heights Bathroom Remodels Usually Look Like
              </h2>
              <p>
                The Heights is a mix of 1920s bungalows, mid-century cottages, and new construction squeezed onto old lots — no two bathrooms we work on look alike. In original Heights homes the recurring job is opening up a tight hall bath, dealing with cast iron drains and galvanized supply lines, and fitting a usable shower into a footprint built when people bathed in tubs. In renovated or new-build Heights homes the work shifts toward design-driven master baths: zero-entry showers, freestanding tubs, large-format porcelain, and custom vanities.
              </p>
              <h3 className="text-2xl font-serif font-bold text-foreground pt-4">
                What <BrandName /> Brings to the Heights
              </h3>
              <p>
                We have experience working in old houses that aren't square, plumb, or level — and the patience to make the finished bathroom look like it is. We know which inspectors handle this part of the city, we plan demo around tight street parking and narrow side yards, and we coordinate the plumbers and electricians needed when you open a 1925 wall and find surprises.
              </p>
              <h3 className="text-2xl font-serif font-bold text-foreground pt-4">
                How Our Pricing Works
              </h3>
              <p>
                <BrandName /> charges for labor and installation materials separately from the finish materials you supply. You pick the tile, fixtures, vanity, and lighting at your budget; we install them. Nothing hidden, nothing marked up that we didn't actually buy.
              </p>
              <h3 className="text-2xl font-serif font-bold text-foreground pt-4">
                How to Get Started
              </h3>
              <p>
                Text or email us photos of the existing bathroom along with rough dimensions and what you want changed. Most projects we can ballpark on the phone in about ten minutes. If you want exact pricing, we schedule a $75 in-person consultation, walk the space, talk through materials, and send you a written proposal.
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
              Serving All Heights Neighborhoods
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
              We provide bathroom remodeling services throughout the greater Heights area and surrounding neighborhoods.
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
              Ready to Remodel Your Heights Bathroom?
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

export default Heights;
