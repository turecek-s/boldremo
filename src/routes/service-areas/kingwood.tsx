import { createFileRoute } from "@tanstack/react-router";
import Kingwood from "@/pages/service-areas/Kingwood";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/service-areas/kingwood")({
  head: () => seoHead("/service-areas/kingwood", { title: "Bathroom Remodeling in Kingwood TX | BoldREMO" }),
  component: Kingwood,
});
