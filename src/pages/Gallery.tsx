import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import boldremo1 from "@/assets/boldremo-1.jpg";
import boldremo2 from "@/assets/boldremo-2.jpg";
import boldremo3 from "@/assets/boldremo-3.jpg";
import boldremo4 from "@/assets/boldremo-4.jpg";
import boldremo5 from "@/assets/boldremo-5.jpg";
import boldremo6 from "@/assets/boldremo-6.jpg";
import boldremo7 from "@/assets/boldremo-7.jpg";
import boldremo8 from "@/assets/boldremo-8.jpg";
import boldremo9 from "@/assets/boldremo-9.jpg";
import boldremo10 from "@/assets/boldremo-10.jpg";
import serviceBathroom from "@/assets/service-bathroom.jpg";
import serviceTile from "@/assets/service-tile.jpg";

const images = [
  { src: boldremo1, alt: "Glass walk-in shower with marble tile and freestanding tub in Houston TX" },
  { src: boldremo2, alt: "Luxury master bathroom with chandelier and glass shower in Bellaire Houston" },
  { src: boldremo3, alt: "Modern bathroom with decorative tile accent wall and soaking tub in River Oaks TX" },
  { src: boldremo4, alt: "Walk-in tub with LED lighting and marble tile in Houston Heights TX" },
  { src: boldremo5, alt: "Freestanding soaking tub with modern fixtures in Kingwood Houston" },
  { src: boldremo6, alt: "Custom walk-in shower with marble walls and bench in Bellaire TX" },
  { src: boldremo7, alt: "Herringbone tile shower surround with mosaic niche in River Oaks Houston" },
  { src: boldremo8, alt: "Bathroom vanity with hexagon tile backsplash in Houston Heights TX" },
  { src: boldremo9, alt: "Luxury master bathroom with marble floors and glass shower in Kingwood TX" },
  { src: boldremo10, alt: "Modern bathroom with patterned tile floor and green vanity in Houston Heights" },
  { src: serviceBathroom, alt: "Bathroom remodeling contractor in Houston TX - serving Heights, Bellaire, River Oaks" },
  { src: serviceTile, alt: "Tile and flooring installation services in Houston Heights and Kingwood TX" },
];

const Gallery = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              Our Work
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our portfolio of bathroom remodeling and tile installation projects in Houston, Heights, Bellaire, River Oaks & Kingwood.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section-padding bg-background" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="sr-only">Bathroom Remodeling Gallery</h2>
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-md"
                >
                  <ResponsiveImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
