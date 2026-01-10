import { ResponsiveImage } from "@/components/ResponsiveImage";
import boldremo4 from "@/assets/boldremo-4.jpg";
import boldremo5 from "@/assets/boldremo-5.jpg";
import boldremo9 from "@/assets/boldremo-9.jpg";
import boldremo10 from "@/assets/boldremo-10.jpg";
import boldremo6 from "@/assets/boldremo-6.jpg";

const images = [
  { src: boldremo4, alt: "Walk-in tub with LED lighting and marble tile in Houston Heights TX" },
  { src: boldremo9, alt: "Luxury master bathroom with marble floors and glass shower in Kingwood TX" },
  { src: boldremo5, alt: "Freestanding soaking tub with modern fixtures in Kingwood Houston" },
  { src: boldremo10, alt: "Modern bathroom with patterned tile floor and green vanity in Houston Heights" },
  { src: boldremo6, alt: "Custom walk-in shower with marble walls and bench in Bellaire TX" },
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
