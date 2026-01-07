import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import boldremo1 from "@/assets/boldremo-1.jpg";
import boldremo2 from "@/assets/boldremo-2.jpg";
import boldremo3 from "@/assets/boldremo-3.jpg";

const images = [
  { src: boldremo1, alt: "Glass walk-in shower with marble tile and freestanding tub in Houston TX" },
  { src: boldremo2, alt: "Luxury master bathroom with chandelier and glass shower in Bellaire Houston" },
  { src: boldremo3, alt: "Modern bathroom with decorative tile accent wall and soaking tub in River Oaks TX" },
];

export const GalleryPreview = () => {
  return (
    <section className="section-padding bg-background" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="gallery-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            "Experience the Benefits of a Bathroom Remodel in Houston, Texas"
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/gallery" className="flex items-center gap-2">
              View Gallery
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
