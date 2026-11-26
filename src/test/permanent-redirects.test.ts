import { describe, expect, it } from "vitest";
import { permanentPageRedirect } from "../lib/permanent-redirects";

describe("Permanent page redirects", () => {
  it.each(["/custom-shower-installation-houston", "/custom-shower-installation-houston/"])(
    "redirects %s directly to /services/ with 301",
    (path) => {
      const result = permanentPageRedirect(new Request(`https://boldremo.lovable.app${path}`));
      expect(result?.status).toBe(301);
      expect(result?.headers.get("location")).toBe("/services/");
    },
  );

  it("makes /about to /about/ a 301", () => {
    const result = permanentPageRedirect(
      new Request("https://boldremo.lovable.app/about"),
      new Response(null, { status: 307, headers: { location: "/about/" } }),
    );
    expect(result?.status).toBe(301);
    expect(result?.headers.get("location")).toBe("/about/");
  });

  it("preserves query parameters", () => {
    const request = new Request("https://boldremo.lovable.app/about?source=google");
    const result = permanentPageRedirect(request, new Response(null, {
      status: 307, headers: { location: "/about/?source=google" },
    }));
    expect(result?.headers.get("location")).toBe("/about/?source=google");
    expect(permanentPageRedirect(new Request(
      "https://boldremo.lovable.app/custom-shower-installation-houston?source=google",
    ))?.headers.get("location")).toBe("/services/?source=google");
  });

  it("leaves unrelated redirects and POST requests unchanged", () => {
    const response = new Response(null, { status: 307, headers: { location: "/services/" } });
    expect(permanentPageRedirect(new Request("https://boldremo.lovable.app/about"), response)).toBeUndefined();
    expect(permanentPageRedirect(new Request("https://boldremo.lovable.app/about", { method: "POST" }),
      new Response(null, { status: 307, headers: { location: "/about/" } }))).toBeUndefined();
  });
});
describe("Old site URL redirects", () => {
  const cases: [string, string][] = [
    ["/post/eco-friendly-luxury-bathroom-remodeling-in-houston", "/services/"],
    ["/post/the-best-storage-solutions-for-modern-houston-master-bathrooms", "/blog/"],
    ["/post/luxury-bathroom-remodeling-mistakes-houston-homeowners-should-avoid", "/resources/"],
    ["/post/how-to-blend-modern-and-classic-styles-in-houston-bathroom-remodeling", "/gallery/"],
    ["/blog/categories/luxury-bathroom-design", "/blog/"],
    ["/post/some-other-old-post", "/blog/"],
    ["/blog/categories/anything", "/blog/"],
  ];
  it.each(cases.flatMap(([p, t]) => [[p, t], [`${p}/`, t]] as [string, string][]))(
    "redirects %s to %s with 301",
    (path, target) => {
      const result = permanentPageRedirect(new Request(`https://www.boldremo.com${path}?x=1`));
      expect(result?.status).toBe(301);
      expect(result?.headers.get("location")).toBe(`${target}?x=1`);
    },
  );

  it("does not redirect real blog posts", () => {
    expect(permanentPageRedirect(new Request("https://www.boldremo.com/blog/walk-in-tub-installation-houston/"))).toBeUndefined();
  });
});

describe("File-like paths", () => {
  it.each(["/apple-touch-icon.png", "/assets/gallery-1.jpg"])("%s gets no slash redirect", (path) => {
    const result = permanentPageRedirect(
      new Request(`https://www.boldremo.com${path}`),
      new Response(null, { status: 307, headers: { location: `${path}/` } }),
    );
    expect(result?.status).toBe(404);
    expect(result?.headers.get("location")).toBeNull();
  });
});
