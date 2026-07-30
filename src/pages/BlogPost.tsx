import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
    },
    author: {
      "@type": "Organization",
      name: "BoldREMO LLC",
      url: "https://www.boldremo.com",
    },
    publisher: {
      "@type": "Organization",
      name: "BoldREMO LLC",
      url: "https://www.boldremo.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.boldremo.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <SeoHead
        path={`/blog/${post.slug}`}
        title={post.title}
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
