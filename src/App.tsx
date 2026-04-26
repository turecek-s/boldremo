import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { CanonicalUrl } from "@/components/CanonicalUrl";
import { ScrollToTop } from "@/components/ScrollToTop";

// Eager load Index page to eliminate chain - it's always needed on homepage
import Index from "./pages/Index";

// Lazy load secondary pages to reduce initial bundle
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Resources = lazy(() => import("./pages/Resources"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const Press = lazy(() => import("./pages/Press"));
const RealtorsDesigners = lazy(() => import("./pages/RealtorsDesigners"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Service Area Pages
const Houston = lazy(() => import("./pages/service-areas/Houston"));
const Heights = lazy(() => import("./pages/service-areas/Heights"));
const Bellaire = lazy(() => import("./pages/service-areas/Bellaire"));
const RiverOaks = lazy(() => import("./pages/service-areas/RiverOaks"));
const Kingwood = lazy(() => import("./pages/service-areas/Kingwood"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CanonicalUrl />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/press" element={<Press />} />
              <Route path="/realtors-designers" element={<RealtorsDesigners />} />
              {/* Service Area Routes */}
              <Route path="/service-areas/houston" element={<Houston />} />
              <Route path="/service-areas/heights" element={<Heights />} />
              <Route path="/service-areas/bellaire" element={<Bellaire />} />
              <Route path="/service-areas/river-oaks" element={<RiverOaks />} />
              <Route path="/service-areas/kingwood" element={<Kingwood />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <FloatingContactButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
