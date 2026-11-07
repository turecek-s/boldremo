import { createFileRoute } from "@tanstack/react-router";
import BathroomRemodelCost from "@/pages/BathroomRemodelCost";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/bathroom-remodel-cost-houston")({
  head: () => seoHead("/bathroom-remodel-cost-houston"),
  component: BathroomRemodelCost,
});
