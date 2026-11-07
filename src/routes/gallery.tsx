import { createFileRoute } from "@tanstack/react-router";
import Gallery from "@/pages/Gallery";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/gallery")({
  head: () => seoHead("/gallery"),
  component: Gallery,
});
