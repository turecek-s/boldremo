import { createFileRoute } from "@tanstack/react-router";
import RiverOaks from "@/pages/service-areas/RiverOaks";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/service-areas/river-oaks")({
  head: () => seoHead("/service-areas/river-oaks", { title: "Bathroom Remodeling in River Oaks TX | BoldREMO" }),
  component: RiverOaks,
});
