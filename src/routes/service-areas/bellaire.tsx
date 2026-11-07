import { createFileRoute } from "@tanstack/react-router";
import Bellaire from "@/pages/service-areas/Bellaire";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/service-areas/bellaire")({
  head: () => seoHead("/service-areas/bellaire", { title: "Bathroom Remodeling in Bellaire TX | BoldREMO" }),
  component: Bellaire,
});
