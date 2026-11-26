import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Link, useParams } from "@/lib/router-compat";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SeoHead } from "@/components/SeoHead";
import NotFound from "@/pages/NotFound";
import { getBlogPost, getTikTokVideoId } from "@/data/blog-posts";

const formatDate = (value: string) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const TikTokEmbed = ({ url }: { url: string }) => {
  const videoId = getTikTokVideoId(url);

  // Load the TikTok embed script once, only on this page.
  useEffect(() => {
    if (!videoId) return;
    const src = "https://www.tiktok.com/embed.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, [videoId]);

  if (!videoId) return null;

  return (
    <blockquote
      className="tiktok-embed mx-auto"
      cite={url}
      data-video-id={videoId}
    >
      <section>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Watch this project on TikTok
        </a>
      </section>
    </blockquote>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);

  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null);

  if (!post) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    keywords: post.focusKeyword,
    articleSection: post.category,
    image: {
      "@type": "ImageObject",
      caption: post.imageAlt,
      ...(post.heroImage ? { url: `https://www.boldremo.com${post.heroImage}` } : {}),
    },
    author: {
      "@type": "Organization",
      name: "BoldREMO LLC",
      url: "https://www.boldremo.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "BoldREMO LLC",
      url: "https://www.boldremo.com/",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.boldremo.com/blog/${post.slug}/`,
    },
  };

  return (
    <>
      <SeoHead
        path={`/blog/${post.slug}`}
        title={post.seoTitle ?? post.title}
        description={post.metaDescription}
        jsonLd={jsonLd}
      />
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-muted">
          <div className="container-custom max-w-3xl">
            <Link
              to="/blog"
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              Back to blog
            </Link>
            <p className="mt-6 text-xs uppercase tracking-widest text-secondary">
              {post.category}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-foreground mt-3 mb-4">
              {post.title}
            </h1>
            <time
              dateTime={post.publishDate}
              className="text-sm text-muted-foreground"
            >
              {formatDate(post.publishDate)}
            </time>
          </div>
          {post.heroImage && (
            <div className="container-custom max-w-4xl mt-10">
              <img
                src={post.heroImage}
                alt={post.imageAlt}
                width={1200}
                height={1600}
                loading="eager"
                fetchPriority="high"
                className="mx-auto w-full max-h-[640px] object-cover rounded-xl"
              />
            </div>
          )}
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom max-w-3xl space-y-10">
            {post.body.map((section, index) => (
              <article key={index}>
                {section.heading && (
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-4">
                    {section.heading}
                  </h2>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  {section.paragraph}
                </p>
                {section.bullets && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet.label}
                        className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-secondary"
                      >
                        <span className="font-semibold text-foreground">
                          {bullet.label}:
                        </span>{" "}
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            {post.gallery && post.gallery.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-6">
                  Before and After Photos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {post.gallery.map((photo) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setOpenImage(photo)}
                      className="relative block overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`View larger: ${photo.alt}`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={1200}
                        height={1600}
                        loading="lazy"
                        className="w-full aspect-[3/4] object-cover transition-transform hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                        {photo.label}
                      </span>
                    </button>
                  ))}
                </div>
                <Dialog open={!!openImage} onOpenChange={(open) => !open && setOpenImage(null)}>
                  <DialogContent className="max-w-3xl p-2">
                    <DialogTitle className="sr-only">{openImage?.alt ?? "Photo"}</DialogTitle>
                    {openImage && (
                      <img
                        src={openImage.src}
                        alt={openImage.alt}
                        className="w-full max-h-[85vh] object-contain rounded-md"
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {post.tiktokUrl && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-4">
                  See It in Action
                </h2>
                <TikTokEmbed url={post.tiktokUrl} />
              </div>
            )}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
