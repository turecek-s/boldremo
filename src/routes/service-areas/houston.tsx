import { createFileRoute } from "@tanstack/react-router";
import Houston from "@/pages/service-areas/Houston";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/service-areas/houston")({
  head: () => seoHead("/service-areas/houston", { title: "Bathroom Remodeling Houston TX | BoldREMO" }),
  component: Houston,
});
