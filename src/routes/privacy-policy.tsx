import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/privacy-policy")({
  head: () => seoHead("/privacy-policy"),
  component: PrivacyPolicy,
});
