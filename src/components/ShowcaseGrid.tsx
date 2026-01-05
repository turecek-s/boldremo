import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";
import showcase4 from "@/assets/showcase-4.jpg";
import showcase5 from "@/assets/showcase-5.jpg";

const images = [
  { src: showcase1, alt: "Dual shower head installation in Kingwood Texas" },
  { src: showcase2, alt: "Custom bathroom tile work by BoldREMO" },
  { src: showcase3, alt: "Modern bathroom design in Houston" },
  { src: showcase4, alt: "Kitchen tile installation in Kingwood Texas" },
  { src: showcase5, alt: "Premium tile and flooring work by BoldREMO" },
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
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
