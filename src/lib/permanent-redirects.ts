const LEGACY_EXACT: Record<string, string> = {
  "/custom-shower-installation-houston": "/services/",
  "/post/eco-friendly-luxury-bathroom-remodeling-in-houston": "/services/",
  "/post/the-best-storage-solutions-for-modern-houston-master-bathrooms": "/blog/",
  "/post/luxury-bathroom-remodeling-mistakes-houston-homeowners-should-avoid": "/resources/",
  "/post/how-to-blend-modern-and-classic-styles-in-houston-bathroom-remodeling": "/gallery/",
  "/blog/categories/luxury-bathroom-design": "/blog/",
};

export function legacyRedirectTarget(pathname: string): string | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const exact = LEGACY_EXACT[path];
  if (exact) return exact;
  if (path.startsWith("/post/") || path.startsWith("/blog/categories/")) return "/blog/";
  return undefined;
}

export function isFileLikePath(pathname: string): boolean {
  const last = pathname.split("/").pop() ?? "";
  return last.includes(".");
}

// Preserve retired-page visits and make only the router's slash redirects permanent.
export function permanentPageRedirect(request: Request, response?: Response): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return;

  const url = new URL(request.url);
  const legacyTarget = legacyRedirectTarget(url.pathname);
  if (legacyTarget) {
    return new Response(null, {
      status: 301,
      headers: { location: `${legacyTarget}${url.search}` },
    });
  }

  const location = response?.headers.get("location");
  if (response?.status !== 307 || !location || url.pathname.endsWith("/")) return;
  // File-like paths (last segment has a dot) never get a slash redirect; let them 404.
  if (isFileLikePath(url.pathname)) return new Response(null, { status: 404 });
  const target = new URL(location, url);
  if (
    target.origin !== url.origin ||
    target.pathname !== `${url.pathname}/` ||
    target.search !== url.search
  ) return;

  return new Response(null, { status: 301, headers: response.headers });
}