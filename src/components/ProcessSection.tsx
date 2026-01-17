import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Home, FileText } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Free Rough Estimate",
    description:
      "Get a quick estimate by phone or email. No home visit required. Perfect for understanding ballpark costs before committing to a consultation.",
    number: "01",
  },
  {
    icon: Home,
    title: "$75 In-Home Design Consult",
    description:
      "Our expert visits your home for detailed measurements, scope discussion, and realistic pricing. This fee is credited toward your project if you move forward.",
    number: "02",
  },
  {
    icon: FileText,
    title: "Written Proposal & Timeline",
    description:
      "Receive a comprehensive proposal with itemized costs, material selections, and a clear project timeline. No surprises—just transparent planning.",
    number: "03",
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-background" aria-labelledby="process-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="process-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6">
            How Our Estimates & Consults Work
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A simple, transparent process designed to give you confidence and clarity before any work begins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
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
            <Link to="/contact">Start With a Free Estimate</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
