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

const Houston = () => {
  const services = [
    "Complete bathroom renovations",
    "Custom tile installation",
    "Shower and tub conversions",
    "Vanity and countertop installation",
    "Plumbing fixture upgrades",
    "Flooring services",
  ];

  const serviceAreas = [
    { name: "Houston Heights", link: "/service-areas/heights" },
    { name: "Bellaire", link: "/service-areas/bellaire" },
    { name: "River Oaks", link: "/service-areas/river-oaks" },
    { name: "Kingwood", link: "/service-areas/kingwood" },
  ];

  return (
    <>
      <Helmet>
        <title>Bathroom Remodeling Houston TX | BoldRemo</title>
        <meta
          name="description"
          content="Houston's premier bathroom remodeling company. BoldRemo transforms outdated bathrooms into stunning spaces. Serving Heights, Bellaire, River Oaks & Kingwood. Call (832) 513-5737."
        />
        <meta
          name="keywords"
          content="bathroom remodeling Houston, Houston bathroom renovation, bathroom contractor Houston TX, bathroom remodel Houston Texas"
        />
        <link rel="canonical" href="https://www.boldremo.com/service-areas/houston" />
      </Helmet>

      <SeoFallback path="/service-areas/houston" />
      <LocalBusinessSchema />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-4">
                <MapPin className="h-5 w-5" />
                <span>Serving Greater Houston, TX</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Bathroom Remodeling in Houston, Texas
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Houston's trusted bathroom renovation experts. From luxurious master suites to efficient guest baths, <BrandName /> delivers exceptional craftsmanship throughout the Greater Houston area.
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
                  Houston's Premier Bathroom Remodeling Company
                </h2>
                <p className="text-muted-foreground mb-6">
                  For years, Houston homeowners have trusted <BrandName /> to transform their bathrooms into beautiful, functional spaces. We understand the unique needs of Houston homes, from addressing humidity challenges to creating designs that complement the diverse architectural styles found throughout the city.
                </p>
                <p className="text-muted-foreground mb-8">
                  Whether you're in a historic Heights bungalow, a Bellaire family home, or a River Oaks estate, our team delivers quality bathroom renovations tailored to your home and lifestyle.
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
                  alt="Bathroom remodeling project in Houston TX"
                  className="rounded-lg shadow-lg w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
              Bathroom Remodeling Throughout Houston
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              We proudly serve homeowners across the Greater Houston area. Click on your neighborhood to learn more about our local services.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceAreas.map((area) => (
                <Link
                  key={area.name}
                  to={area.link}
                  className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
                >
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                    {area.name}
                  </h3>
                  <span className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
              Why Houston Homeowners Choose <BrandName />
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">Local Expertise</h3>
                <p className="text-muted-foreground">
                  Deep knowledge of Houston homes, building codes, and the specific challenges of renovating in our climate.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">Quality Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Skilled craftsmen who take pride in delivering beautiful, lasting bathroom renovations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">Transparent Process</h3>
                <p className="text-muted-foreground">
                  Clear communication, detailed estimates, and no surprises from start to finish.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Transform Your Houston Bathroom?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Get a free rough estimate by phone or email, or book a $75 design consultation (credited toward your project).
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Book Bathroom Consult</Link>
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

export default Houston;
