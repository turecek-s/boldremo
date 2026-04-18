import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
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
    // Optimize images during build - compress and convert to modern formats
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      // Generate WebP versions for supported browsers
      cache: true,
      cacheLocation: "node_modules/.cache/image-optimizer",
    }),
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
