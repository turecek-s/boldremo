import { createFileRoute } from "@tanstack/react-router";
import Press from "@/pages/Press";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/press")({
  head: () => seoHead("/press"),
  component: Press,
});
