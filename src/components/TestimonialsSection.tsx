import { Star, Quote } from "lucide-react";
import { TESTIMONIALS as testimonials } from "@/data/testimonials";

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background" aria-labelledby="testimonials-heading">

      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-[hsl(var(--gold-accent))] text-[hsl(var(--gold-accent))]" />
            ))}
          </div>
          <p className="text-muted-foreground text-lg">
            5.0 Rating on Google • Trusted by Houston Homeowners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="bg-card p-6 lg:p-8 rounded-lg border border-border relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-muted opacity-30" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[hsl(var(--gold-accent))] text-[hsl(var(--gold-accent))]" />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed mb-4">
                "{testimonial.text}"
              </blockquote>
              <footer className="flex items-center justify-between">
                <div>
                  <cite className="font-semibold text-foreground not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://share.google/ZwzDNVLRuFMgT4i9r"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            See all reviews on Google
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
