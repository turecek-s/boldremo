import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bath, Sparkles, Crown, Phone } from "lucide-react";

const pricingTiers = [
  {
    icon: Bath,
    title: "Guest / Hall Bathroom Remodel",
    priceRange: "$8,000 – $15,000",
    description: "Cosmetic updates, tile, fixtures, lighting",
    features: ["New tile flooring", "Updated fixtures", "Modern lighting", "Fresh paint & finishes"],
  },
  {
    icon: Sparkles,
    title: "Full Bathroom Renovation",
    priceRange: "$18,000 – $32,000",
    description: "Full demo, layout updates, custom tile",
    features: ["Complete demolition", "Layout modifications", "Custom tile work", "New vanity & storage"],
    popular: true,
  },
  {
    icon: Crown,
    title: "Luxury Spa Bathroom",
    priceRange: "$35,000+",
    description: "Heated floors, premium finishes, custom showers",
    features: ["Heated flooring", "Frameless glass shower", "Premium materials", "Smart home features"],
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding bg-background" aria-labelledby="pricing-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6">
            Typical Bathroom Remodel Costs in Houston
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Transparent pricing to help you plan your investment. These ranges reflect typical projects in the Houston area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative bg-card border rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg ${
                tier.popular ? "border-primary shadow-md ring-2 ring-primary/20" : "border-border"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
                <tier.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                {tier.title}
              </h3>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
                {tier.priceRange}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {tier.description}
              </p>
              <ul className="text-left space-y-2 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant={tier.popular ? "default" : "outline"} className="w-full">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm max-w-2xl mx-auto">
          <em>Every home is different. Final pricing is confirmed after an in-home consult.</em>
        </p>
      </div>
    </section>
  );
};
