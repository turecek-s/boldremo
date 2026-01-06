import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
  },
}));
