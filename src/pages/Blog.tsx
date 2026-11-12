import { AreaLinkedText } from "@/components/AreaLinkedText";
import { Link } from "@/lib/router-compat";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SeoHead } from "@/components/SeoHead";
import { BLOG_POSTS } from "@/data/blog-posts";

const formatDate = (value: string) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Blog = () => {
  return (
    <>
      <SeoHead
        path="/blog"
        title="Blog | BoldREMO Bathroom Remodeling Houston"
        description="Bathroom remodeling guides, project breakdowns, and honest cost information from BoldREMO, Houston's bathroom remodeling company."
      />
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6">
              BoldREMO Blog
            </h1>
            <p className="text-lg text-foreground/85 leading-relaxed">
              Project breakdowns, honest pricing, and practical guidance from
              our Houston bathroom remodeling crew.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <p className="text-xs uppercase tracking-widest text-secondary mb-3">
                    {post.category}
                  </p>
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <time
                      dateTime={post.publishDate}
                      className="text-sm text-muted-foreground"
                    >
                      {formatDate(post.publishDate)}
                    </time>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-foreground underline underline-offset-4"
                    >
                      Read post
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">Guides to Start With</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We write about real projects, honest pricing and what to ask before you hire a bathroom remodeler in Houston. If you are early in planning, these pages are a good place to start.</p>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
                <li><Link to="/bathroom-remodel-cost-houston" className="text-primary underline underline-offset-2 hover:text-primary/80">Bathroom remodel cost guide</Link>: What bathroom remodeling costs in Houston and what drives the price.</li>
                <li><Link to="/tub-to-shower-conversion-houston" className="text-primary underline underline-offset-2 hover:text-primary/80">Tub to shower conversion</Link>: How a conversion works and what it costs.</li>
                <li><Link to="/cost-calculator" className="text-primary underline underline-offset-2 hover:text-primary/80">Cost calculator</Link>: Get a price range for your own bathroom in under a minute.</li>
                <li><Link to="/resources" className="text-primary underline underline-offset-2 hover:text-primary/80">Resources</Link>: More planning help for Houston homeowners.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">Why We Publish Our Pricing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Quotes from different contractors can be hard to compare. We share our typical ranges so you know what to expect before you call. Tub to shower conversions start at $7,000, and most full bathroom remodels come in around $10,000 to $21,000 all in.</p>
              <p className="text-muted-foreground leading-relaxed"><AreaLinkedText text="BoldREMO serves Houston, Heights, Bellaire, River Oaks, Kingwood & Memorial." /></p>

            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
