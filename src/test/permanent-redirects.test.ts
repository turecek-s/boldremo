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