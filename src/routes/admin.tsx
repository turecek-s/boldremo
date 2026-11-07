import { createFileRoute } from "@tanstack/react-router";
import Admin from "@/pages/Admin";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/admin")({
  head: () => seoHead("/admin", { title: "Admin Dashboard | BoldREMO", description: "Private admin dashboard for BoldREMO staff. Authentication required.", noindex: true }),
  component: Admin,
});
