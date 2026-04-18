import { ROUTE_SEO } from "@/lib/seo-content";

interface SeoFallbackProps {
  path: string;
}

/**
 * Renders a visually-hidden HTML block with route-specific content
 * so non-JS crawlers (Bing, DuckDuckGo, AI bots) can index the page.
 * Does NOT set <title> or meta tags — use SeoHead for that, or rely
 * on an existing Helmet block on the page.
 */
export const SeoFallback = ({ path }: SeoFallbackProps) => {
  const seo = ROUTE_SEO[path];
  if (!seo) return null;
  return (
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
  );
};
