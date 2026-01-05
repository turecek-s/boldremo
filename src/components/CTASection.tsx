import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="section-padding bg-secondary" aria-labelledby="cta-heading">
      <div className="container-custom text-center">
        <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-8 text-balance">
          Discover Your Vision,<br className="hidden sm:block" /> Connect with Us
        </h2>
        <Button asChild size="lg" className="min-w-[200px]">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
};
