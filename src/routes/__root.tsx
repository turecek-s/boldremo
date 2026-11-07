import { useEffect, type ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo-head";
import appCss from "../styles.css?url";

const GA_ID = "G-YTP9HTWC5D";

// Google Analytics and HubSpot, deferred until window load so they never block first paint
// and HubSpot can't alter form markup before React hydrates it.
const GA_LOADER = `window.addEventListener('load',function(){var ga=document.createElement('script');ga.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';ga.async=true;document.head.appendChild(ga);ga.onload=function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');};var hs=document.createElement('script');hs.id='hs-script-loader';hs.async=true;hs.src='https://js-na2.hs-scripts.com/245024833.js';document.body.appendChild(hs);});`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      {
        name: "keywords",
        content:
          "bathroom remodeling Houston, bathroom renovation Heights TX, tile installation Bellaire, River Oaks bathroom contractor, Kingwood bathroom remodel, Memorial bathroom remodel",
      },
      { name: "author", content: "BoldREMO" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BoldREMO" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:image", content: "https://www.boldremo.com/og-image.jpg" },
      { property: "og:image:width", content: "1170" },
      { property: "og:image:height", content: "871" },
      { property: "og:image:alt", content: "BoldREMO bathroom remodeling in Houston" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESCRIPTION },
      { name: "twitter:image", content: "https://www.boldremo.com/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.png" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/cormorant-garamond-latin.woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/montserrat-latin.woff2", crossOrigin: "anonymous" },
    ],
    scripts: [{ children: GA_LOADER }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
        <FloatingContactButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RootError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="mb-3 text-3xl font-semibold">This page didn't load</h1>
        <p className="mb-6 text-muted-foreground">Something went wrong. Please try again, or call (832) 513-5737.</p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Try again
          </button>
          <Link to="/" className="rounded-md border border-border px-4 py-2">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
