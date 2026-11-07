import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/about")({
  head: () => seoHead("/about"),
  component: About,
});
