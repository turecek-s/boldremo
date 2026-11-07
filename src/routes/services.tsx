import { createFileRoute } from "@tanstack/react-router";
import Services from "@/pages/Services";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/services")({
  head: () => seoHead("/services"),
  component: Services,
});
