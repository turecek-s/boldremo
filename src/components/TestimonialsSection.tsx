import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Neil Segel",
    location: "Heights, Houston",
    rating: 5,
    text: "BoldREMO just finished remodeling our kitchen and guest bathroom - they did an AWESOME job!! Stan is very friendly and incredibly helpful with suggestions. Their price was VERY affordable, and they completed the project right on time. Zero complaints! We now have the dream kitchen we wanted in ONE WEEK! I highly recommend Stan and BoldREMO for any remodeling project - Stan has an incredible attention to detail and craftsmanship!",
    date: "2024-12-15",
  },
  {
    name: "Bob Daimler",
    location: "Houston, TX",
    rating: 5,
    text: "Stan does more than just professional work. He takes such pride in what he does and leaves you with an outstanding product! He has remodeled my master shower and kitchen and now he has just torn out a bathtub and installed a new walk-in shower and installed a hidden trash bin in the kitchen. He comes with my highest recommendation from someone who has worked in construction his whole life.",
    date: "2024-11-20",
  },
  {
    name: "Jennifer L.",
    location: "Kingwood, TX",
    rating: 5,
    text: "We've used BoldRemo twice now - first for our guest bath and then the master. Both times they delivered beautiful results. Fair pricing and excellent communication throughout.",
    date: "2024-09-08",
  },
  {
    name: "David & Lisa K.",
    location: "Bellaire, TX",
    rating: 5,
    text: "After getting multiple quotes, we chose BoldRemo and couldn't be happier. They turned our outdated bathroom into a modern spa-like retreat. Worth every penny!",
    date: "2024-08-14",
  },
];

const TestimonialsSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BoldRemo",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": testimonials.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "datePublished": t.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": t.text
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background" aria-labelledby="testimonials-heading">
      <TestimonialsSchema />
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
            href="https://maps.app.goo.gl/4agW9uZYD79ZkKvk8"
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
