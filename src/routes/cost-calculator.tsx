import { createFileRoute } from "@tanstack/react-router";
import CostCalculator from "@/pages/CostCalculator";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/cost-calculator")({
  head: () => seoHead("/cost-calculator"),
  component: CostCalculator,
});
