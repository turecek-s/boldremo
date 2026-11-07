import { ROUTE_SEO } from "@/lib/seo-content";

export const SITE_URL = "https://www.boldremo.com";

export const HOME_TITLE = "BoldREMO | Bathroom Remodeling & Tile Installation Houston";
export const HOME_DESCRIPTION =
  "Houston bathroom remodeling experts. Custom renovations & tile installation in Heights, Bellaire, River Oaks, Kingwood & Memorial. Call (832) 513-5737";

/** Canonical URL for a route path. Public URLs always use the trailing-slash form. */
export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/+$/, "")}/`;
}

interface SeoOptions {
  title?: string;
  description?: string;
  noindex?: boolean;
}

/**
 * Per-route <head> tags, rendered on the server so crawlers see them in the first HTML response.
 * Defaults come from ROUTE_SEO (src/lib/seo-content.ts), the single source of per-route SEO copy.
 */
export function seoHead(path: string, opts: SeoOptions = {}) {
  const seo = ROUTE_SEO[path];
  const title = opts.title ?? seo?.title ?? HOME_TITLE;
  const description = opts.description ?? seo?.description ?? HOME_DESCRIPTION;
  const url = canonicalUrl(path);

  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:url", content: url },
    ...(opts.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];

  return {
    meta,
    links: opts.noindex ? [] : [{ rel: "canonical", href: url }],
  };
}
