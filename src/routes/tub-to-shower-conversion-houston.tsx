import { createFileRoute } from "@tanstack/react-router";
import TubToShowerConversion from "@/pages/TubToShowerConversion";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/tub-to-shower-conversion-houston")({
  head: () => seoHead("/tub-to-shower-conversion-houston"),
  component: TubToShowerConversion,
});
