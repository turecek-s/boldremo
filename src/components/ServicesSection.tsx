import { Link } from "react-router-dom";
import serviceBathroom from "@/assets/service-bathroom.jpg";
import serviceTile from "@/assets/service-tile.jpg";

const services = [
  {
    title: "Bathroom",
    description: "Complete bathroom remodeling services tailored to your style and needs.",
    image: serviceBathroom,
    alt: "Bathroom remodeling service in Houston TX",
  },
  {
    title: "Tile & Flooring",
    description: "Expert tile and flooring installation for a stunning foundation.",
    image: serviceTile,
    alt: "Professional tile and flooring installation Houston",
  },
];

export const ServicesSection = () => {
  return (
    <section className="section-padding bg-muted" aria-labelledby="services-heading">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6">
            Services
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Are you tired of living with a bathroom that doesn't meet your needs or reflect your personal style? A remodel can not only improve the functionality and aesthetic of your space but also significantly increase your home's value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <Link
              key={service.title}
              to="/gallery"
              className="group block bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Gallery
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
