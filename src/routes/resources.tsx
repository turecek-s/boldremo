import { createFileRoute } from "@tanstack/react-router";
import Resources from "@/pages/Resources";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/resources")({
  head: () => seoHead("/resources"),
  component: Resources,
});
