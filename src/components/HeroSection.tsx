import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Star, Hammer, BadgeCheck } from "lucide-react";
import { TubComparison } from "@/components/TubComparison";
import { useGoogleReviews } from "@/hooks/use-google-reviews";

export const HeroSection = () => {
  const reviews = useGoogleReviews();
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-20 md:pt-28 md:pb-12">
      <div className="container-custom grid items-center gap-8 text-center px-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10 lg:text-left xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="min-w-0 max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-primary mb-4 text-balance">
            Houston Bathroom Remodeling
            <br />
            <span className="text-foreground">Built Right, Start to Finish</span>
          </h1>
          
          <p className="text-base sm:text-lg text-foreground font-medium mb-6 max-w-2xl mx-auto">
            Get realistic project price ranges instantly, or book a $75 in-home design consult credited toward your project.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button onClick={scrollToPricing} size="lg" className="min-w-[220px]">
              <ArrowRight className="h-5 w-5" />
              See Typical Project Prices
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[220px] bg-background/80 md:backdrop-blur-sm">
              <Link to="/contact" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Book $75 Design Consult
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-foreground sm:text-sm lg:justify-start">
            {reviews && (
              <a
                href="https://share.google/TqWHKU1gwjtyFIbLV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-wrap items-center justify-center gap-2 underline-offset-4 hover:underline"
                aria-label={`${reviews.rating.toFixed(1)} out of 5, ${reviews.totalReviews} Google reviews`}
              >
                <span className="flex gap-0.5 text-primary" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <span>{reviews.rating.toFixed(1)} ({reviews.totalReviews} Google reviews)</span>
              </a>
            )}
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              10+ Years of Craftsmanship Experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Hammer className="h-4 w-4 shrink-0" aria-hidden="true" />
              200+ Houston Bathrooms Remodeled
            </span>
          </div>
        </div>
        <TubComparison />
      </div>
    </section>
  );
};
