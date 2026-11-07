import { createFileRoute } from "@tanstack/react-router";
import RealtorsDesigners from "@/pages/RealtorsDesigners";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/realtors-designers")({
  head: () => seoHead("/realtors-designers"),
  component: RealtorsDesigners,
});
