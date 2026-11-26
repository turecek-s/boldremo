import { ResponsiveImage } from "@/components/ResponsiveImage";
import boldremo4 from "@/assets/boldremo-4.webp";
import boldremo5 from "@/assets/boldremo-5.webp";
import boldremo9 from "@/assets/boldremo-9.webp";
import boldremo10 from "@/assets/boldremo-10.webp";
import boldremo6 from "@/assets/boldremo-6.webp";

const images = [
  { src: boldremo4, width: 1080, height: 1440, alt: "Walk-in tub with LED lighting and porcelain tile in Houston Heights TX" },
  { src: boldremo9, width: 659, height: 879, alt: "Spa-style master bathroom with porcelain floors and glass shower in Kingwood TX" },
  { src: boldremo5, width: 1080, height: 1440, alt: "Freestanding soaking tub with modern fixtures in Kingwood Houston" },
  { src: boldremo10, width: 1080, height: 1080, alt: "Modern bathroom with patterned tile floor and green vanity in Houston Heights" },
  { src: boldremo6, width: 1080, height: 1440, alt: "Custom walk-in shower with porcelain tile walls and bench in Bellaire TX" },
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
                width={image.width}
                height={image.height}
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
