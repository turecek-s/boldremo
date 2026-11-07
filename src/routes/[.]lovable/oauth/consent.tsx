import { createFileRoute } from "@tanstack/react-router";
import OAuthConsent from "@/pages/OAuthConsent";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/.lovable/oauth/consent")({
  // Reads the signed-in session and query string in the browser only.
  ssr: false,
  head: () =>
    seoHead("/.lovable/oauth/consent", {
      title: "Authorize access | BoldREMO",
      description: "Approve or deny access to your BoldREMO account.",
      noindex: true,
    }),
  component: OAuthConsent,
});
