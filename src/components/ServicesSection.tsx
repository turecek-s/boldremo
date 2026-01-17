import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Clock, ArrowRight } from "lucide-react";
import boldremo7 from "@/assets/boldremo-7.jpg";
import boldremo8 from "@/assets/boldremo-8.jpg";
import serviceBathroom from "@/assets/service-bathroom.jpg";

const packages = [
  {
    title: "Refresh Remodel",
    description: "Cosmetic upgrades that transform your bathroom's look without a full renovation.",
    features: ["New tile flooring & walls", "Updated fixtures & hardware", "Modern lighting design", "Fresh paint & finishes"],
    timeline: "7–10 days",
    image: boldremo8,
    alt: "Refresh bathroom remodel with updated tile and fixtures in Houston TX",
  },
  {
    title: "Signature Remodel",
    description: "Our most popular package—a complete transformation with custom design elements.",
    features: ["Full demolition", "Custom tile work", "New vanity & storage", "Layout modifications"],
    timeline: "14–21 days",
    image: boldremo7,
    alt: "Signature bathroom remodel with custom tile and vanity in Houston Heights",
    popular: true,
  },
  {
    title: "Luxury Spa Remodel",
    description: "The ultimate bathroom experience with premium materials and spa-like features.",
    features: ["Heated flooring", "Frameless glass shower", "Premium materials", "Smart home integration"],
    timeline: "21+ days",
    image: serviceBathroom,
    alt: "Luxury spa bathroom remodel with heated floors and frameless shower in River Oaks",
  },
];

export const ServicesSection = () => {
  return (
    <section className="section-padding bg-muted" aria-labelledby="services-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6">
            Our Remodeling Packages
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choose the package that fits your vision and budget. Each includes our signature attention to detail and quality craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`relative bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${
                pkg.popular ? "ring-2 ring-primary lg:scale-105" : ""
              }`}
            >
              {pkg.popular && (
                <span className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="aspect-[4/3] overflow-hidden">
                <ResponsiveImage
                  src={pkg.image}
                  alt={pkg.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-serif font-semibold text-foreground">
                    {pkg.title}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    <Clock className="h-3.5 w-3.5" />
                    {pkg.timeline}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {pkg.description}
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={pkg.popular ? "default" : "outline"} className="w-full">
                  <Link to="/contact" className="flex items-center justify-center gap-2">
                    See If This Fits My Home
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
