import { Helmet } from "react-helmet-async";
import { ROUTE_SEO } from "@/lib/seo-content";

interface SeoHeadProps {
  /** Route path, e.g. "/services". Used to look up default SEO content. */
  path?: string;
  /** Override title (otherwise uses ROUTE_SEO[path].title). */
  title?: string;
  /** Override description. */
  description?: string;
  /** Add <meta name="robots" content="noindex,nofollow"> for private pages. */
  noindex?: boolean;
}

/**
 * Per-route SEO head: sets <title>, meta description, and a hidden
 * fallback HTML block so non-JS crawlers (Bing, DuckDuckGo, AI bots)
 * can index unique content for this route.
 */
export const SeoHead = ({ path, title, description, noindex }: SeoHeadProps) => {
  const seo = path ? ROUTE_SEO[path] : undefined;
  const finalTitle = title ?? seo?.title;
  const finalDescription = description ?? seo?.description;
  const finalUrl = path ? `https://www.boldremo.com${path}` : "https://www.boldremo.com/";

  // NOTE: <link rel="canonical"> is intentionally NOT set here because
  // link tags don't dedupe by rel in react-helmet-async, which can create
  // duplicate canonicals. Canonical is baked into the prerendered HTML at
  // build time (vite-plugin-prerender). og:url and twitter:url are safe to
  // set here because meta tags with the same property/name are replaced.

  return (
    <>
      <Helmet>
        {finalTitle && <title>{finalTitle}</title>}
        {finalTitle && <meta property="og:title" content={finalTitle} />}
        {finalTitle && <meta name="twitter:title" content={finalTitle} />}
        {finalDescription && <meta name="description" content={finalDescription} />}
        {finalDescription && <meta property="og:description" content={finalDescription} />}
        {finalDescription && <meta name="twitter:description" content={finalDescription} />}
        <meta property="og:url" content={finalUrl} />
        <meta property="twitter:url" content={finalUrl} />
        {noindex && <meta name="robots" content="noindex,nofollow" />}
      </Helmet>
      {seo && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
          dangerouslySetInnerHTML={{ __html: seo.bodyHtml }}
        />
      )}
    </>
  );
};
