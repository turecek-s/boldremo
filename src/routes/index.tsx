import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/")({
  head: () => seoHead("/"),
  component: Index,
});
