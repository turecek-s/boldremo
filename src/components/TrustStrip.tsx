import { Shield, Star, Clock, MapPin } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full liability coverage",
  },
  {
    icon: Star,
    title: "Quality Materials",
    description: "Premium products only",
  },
  {
    icon: Clock,
    title: "Clear Timelines",
    description: "On-time completion",
  },
  {
    icon: MapPin,
    title: "Houston-Based",
    description: "Local contractor",
  },
];

export const TrustStrip = () => {
  return (
    <section className="py-12 bg-primary/5" aria-label="Trust indicators">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-semibold text-foreground text-sm sm:text-base">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
