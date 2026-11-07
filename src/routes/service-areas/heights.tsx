import { createFileRoute } from "@tanstack/react-router";
import Heights from "@/pages/service-areas/Heights";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/service-areas/heights")({
  head: () => seoHead("/service-areas/heights", { title: "Bathroom Remodeling in The Heights TX | BoldREMO" }),
  component: Heights,
});
