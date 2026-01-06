import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import heroBathroom from "@/assets/hero-bathroom.jpg";
import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";
import showcase4 from "@/assets/showcase-4.jpg";
import showcase5 from "@/assets/showcase-5.jpg";
import serviceBathroom from "@/assets/service-bathroom.jpg";
import serviceTile from "@/assets/service-tile.jpg";

const images = [
  { src: gallery1, alt: "Modern bathroom renovation with white tile and contemporary fixtures in Houston" },
  { src: gallery2, alt: "Luxury dark tile bathroom remodel with premium finishes" },
  { src: heroBathroom, alt: "Elegant bathroom transformation with natural lighting" },
  { src: showcase1, alt: "Dual shower head installation in Kingwood, Texas" },
  { src: showcase2, alt: "Custom bathroom tile work with intricate patterns" },
  { src: showcase3, alt: "Contemporary bathroom design featuring modern vanity" },
  { src: showcase4, alt: "Kitchen tile installation with premium materials in Kingwood" },
  { src: showcase5, alt: "Premium tile and flooring craftsmanship" },
  { src: serviceBathroom, alt: "Full bathroom remodeling service showcase" },
  { src: serviceTile, alt: "Professional tile installation expertise" },
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
