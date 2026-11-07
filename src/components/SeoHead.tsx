interface SeoHeadProps {
  /** Kept for call-site compatibility; titles, descriptions and canonicals live in each route's head(). */
  path?: string;
  title?: string;
  description?: string;
  noindex?: boolean;
  /** Optional JSON-LD structured data object for this page. */
  jsonLd?: Record<string, unknown>;
}

/** Renders page-level JSON-LD. Head tags are set server-side by the route's head() via seoHead(). */
export const SeoHead = ({ jsonLd }: SeoHeadProps) => {
  if (!jsonLd) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
