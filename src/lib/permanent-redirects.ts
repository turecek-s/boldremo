// Preserve retired-page visits and make only the router's slash redirects permanent.
export function permanentPageRedirect(request: Request, response?: Response): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return;

  const url = new URL(request.url);
  if (
    url.pathname === "/custom-shower-installation-houston" ||
    url.pathname === "/custom-shower-installation-houston/"
  ) {
    return new Response(null, {
      status: 301,
      headers: { location: `/services/${url.search}` },
    });
  }

  const location = response?.headers.get("location");
  if (response?.status !== 307 || !location || url.pathname.endsWith("/")) return;
  const target = new URL(location, url);
  if (
    target.origin !== url.origin ||
    target.pathname !== `${url.pathname}/` ||
    target.search !== url.search
  ) return;

  return new Response(null, { status: 301, headers: response.headers });
}