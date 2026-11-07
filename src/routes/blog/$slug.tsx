import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { getBlogPost } from "@/data/blog-posts";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { title: post.title, description: post.metaDescription };
  },
  head: ({ params, loaderData }) =>
    seoHead(`/blog/${params.slug}`, {
      ...(loaderData ? { title: loaderData.title, description: loaderData.description } : {}),
    }),
  component: BlogPost,
});
