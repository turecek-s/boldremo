import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Star, Hammer, BadgeCheck } from "lucide-react";
import beforeVanity from "@/assets/before-vanity.webp";
import afterVanity from "@/assets/after-vanity.webp";
import { useGoogleReviews } from "@/hooks/use-google-reviews";

export const HeroSection = () => {
  const reviews = useGoogleReviews();
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-20 md:pt-28 md:pb-12">
      <div className="container-custom text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-primary mb-4 text-balance">
            Houston Bathroom Remodeling
            <br />
            <span className="text-foreground">Built Right, Start to Finish</span>
          </h1>
          
          <p className="text-base sm:text-lg text-foreground font-medium mb-6 max-w-2xl mx-auto">
            Get realistic project price ranges instantly, or book a $75 in-home design consult credited toward your project.
          </p>

          <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-6" role="group" aria-label="The same BoldREMO bathroom before and after remodeling">
            <figure className="relative min-w-0 aspect-[3/4] sm:aspect-auto sm:h-[360px] overflow-hidden">
              <img
                src={beforeVanity}
                alt="Before remodeling: white vanity with a dark countertop, rectangular framed mirror, and worn terrazzo-style floor beside the toilet"
                className="h-full w-full object-cover object-[center_65%]"
                width={1512}
                height={2016}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <figcaption className="absolute left-3 top-3 bg-background px-3 py-1 text-xs sm:text-sm font-semibold text-foreground shadow-sm">Before</figcaption>
            </figure>
            <figure className="relative min-w-0 aspect-[3/4] sm:aspect-auto sm:h-[360px] overflow-hidden">
              <img
                src={afterVanity}
                alt="After remodeling: dark wood vanity with a white quartz countertop, arched gold-framed mirror, two vertical lights, brushed-gold fixtures, and repainted walls"
                className="h-full w-full object-cover object-[center_65%]"
                width={1512}
                height={2016}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <figcaption className="absolute left-3 top-3 bg-background px-3 py-1 text-xs sm:text-sm font-semibold text-foreground shadow-sm">After</figcaption>
            </figure>
          </div>

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
              10+ Years of Craftsmanship Experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Hammer className="h-4 w-4 shrink-0" aria-hidden="true" />
              200+ Houston Bathrooms Remodeled
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
