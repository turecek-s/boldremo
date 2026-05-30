import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { prerenderRoutes } from "./vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Rewrite the hardcoded hero image preload href in index.html to match
    // the actually emitted hashed asset filename (prevents stale LCP preloads).
    {
      name: "rewrite-hero-preload",
      apply: "build" as const,
      enforce: "post" as const,
      generateBundle(_options: unknown, bundle: Record<string, { type: string; source?: string | Uint8Array }>) {
        let heroFile: string | undefined;
        for (const fileName of Object.keys(bundle)) {
          if (/assets\/hero-bathroom-[^/]+\.(jpg|jpeg|webp)$/i.test(fileName)) {
            heroFile = fileName;
            break;
          }
        }
        const html = bundle["index.html"];
        if (heroFile && html && html.type === "asset" && typeof html.source === "string") {
          html.source = html.source.replace(
            /href="\/assets\/hero-bathroom-[^"]+\.(?:jpg|jpeg|webp)"/i,
            `href="/${heroFile}"`,
          );
        }
      },
    },
    // Generate per-route static HTML files for SEO (must run after build)
    prerenderRoutes(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunking to reduce dependency chains
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React core together - loaded first
          "react-vendor": ["react", "react-dom"],
          // Group router separately
          "router": ["react-router-dom"],
          // Group UI framework
          "ui-vendor": ["@radix-ui/react-slot", "@radix-ui/react-tooltip", "class-variance-authority", "clsx", "tailwind-merge"],
        },
      },
    },
    // Enable minification optimizations
    minify: "esbuild",
    // Target modern browsers for smaller bundles
    target: "es2020",
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096,
  },
}));
