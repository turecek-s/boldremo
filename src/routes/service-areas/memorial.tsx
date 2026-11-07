import { createFileRoute } from "@tanstack/react-router";
import Memorial from "@/pages/service-areas/Memorial";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/service-areas/memorial")({
  head: () => seoHead("/service-areas/memorial", { title: "Bathroom Remodeling in Memorial Houston | BoldREMO" }),
  component: Memorial,
});
