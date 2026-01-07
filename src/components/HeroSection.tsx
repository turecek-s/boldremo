import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import heroBathroom from "@/assets/hero-bathroom.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - LCP element, priority loaded with native img for fastest paint */}
      <div className="absolute inset-0">
        <img
          src={heroBathroom}
          alt="Professional bathroom remodeling contractor in Houston TX - BoldREMO serves Heights, Bellaire, River Oaks and Kingwood"
          className="w-full h-full object-cover"
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
            Transform your bathroom.
            <br />
            <span className="text-foreground">Enjoy renovation.</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-foreground font-medium mb-10 drop-shadow-md">
            Houston's Premier Remodeling Company
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link to="/contact" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px] bg-background/80 backdrop-blur-sm">
              <Link to="/gallery" className="flex items-center gap-2">
                View Gallery
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-foreground/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
