import { ResponsiveImage } from "@/components/ResponsiveImage";
import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";
import showcase4 from "@/assets/showcase-4.jpg";
import showcase5 from "@/assets/showcase-5.jpg";

const images = [
  { src: showcase1, alt: "Custom shower remodel with dual shower heads in Kingwood Houston TX" },
  { src: showcase2, alt: "Professional bathroom tile installation contractor in Houston Heights" },
  { src: showcase3, alt: "Contemporary bathroom renovation with modern vanity in Bellaire TX" },
  { src: showcase4, alt: "Expert tile and flooring installation in River Oaks Houston" },
  { src: showcase5, alt: "Luxury bathroom remodeling services in Kingwood Texas by BoldREMO" },
];

export const ShowcaseGrid = () => {
  return (
    <section className="section-padding bg-muted" aria-labelledby="showcase-heading">
      <div className="container-custom">
        <h2 id="showcase-heading" className="sr-only">Our Recent Work</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
