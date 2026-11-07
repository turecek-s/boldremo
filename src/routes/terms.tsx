import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/pages/Terms";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/terms")({
  head: () => seoHead("/terms"),
  component: Terms,
});
