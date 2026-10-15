import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Star, Hammer, BadgeCheck } from "lucide-react";
import heroBathroom from "@/assets/boldremo-2.jpg";
import { useGoogleReviews } from "@/hooks/use-google-reviews";

export const HeroSection = () => {
  const reviews = useGoogleReviews();
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[540px] h-[calc(100svh-160px)] md:h-[calc(100svh-128px)] flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Background Image - LCP element, priority loaded with native img for fastest paint */}
      <div className="absolute inset-0">
        <img
          src={heroBathroom}
          alt="BoldREMO finished bathroom with a freestanding tub beneath shuttered windows, chandelier, and frameless glass walk-in shower"
          className="w-full h-full object-cover"
          width={1170}
          height={871}
          sizes="100vw"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content - H1 is visible immediately for LCP, then animates */}
      <div className="relative z-10 container-custom text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-primary mb-6 text-balance drop-shadow-lg">
            Houston Bathroom Remodeling
            <br />
            <span className="text-foreground">Built Right, Start to Finish</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-foreground font-medium mb-10 drop-shadow-md max-w-2xl mx-auto">
            Get realistic project price ranges instantly, or book a $75 in-home design consult credited toward your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-foreground sm:text-sm">
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
              10+ Years in Business
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Hammer className="h-4 w-4 shrink-0" aria-hidden="true" />
              200+ Houston Bathrooms Remodeled
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center motion-safe:md:animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-foreground/60 rounded-full motion-safe:md:animate-pulse" />
        </div>
      </div>
    </section>
  );
};
