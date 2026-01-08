import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BrandName } from "@/components/BrandName";
import { MessageSquare, Paintbrush, Home } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description:
      "Share your vision with our remodeling experts during a free in-home consultation. We'll discuss your goals, preferences, and budget to create a personalized plan for your bathroom transformation.",
    number: "01",
  },
  {
    icon: Paintbrush,
    title: "Design & Planning",
    description:
      "Our team creates detailed designs and material selections tailored to your style. We handle permits, coordinate with suppliers, and prepare everything for a smooth renovation process.",
    number: "02",
  },
  {
    icon: Home,
    title: "Expert Installation",
    description:
      "Our skilled craftsmen bring your vision to life with precision and care. From demolition to final touches, we ensure quality workmanship and minimal disruption to your daily routine.",
    number: "03",
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-background" aria-labelledby="process-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="process-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6">
            <BrandName /> Process
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            "Transform your living space into a reflection of your style and needs with our easy and personalized home remodeling process, tailored to suit the unique vision you have for your home"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-300"
            >
              <span className="absolute top-4 right-4 text-4xl font-serif font-bold text-muted-foreground/20">
                {step.number}
              </span>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/about">About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
