import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";

// Lazy load below-the-fold sections to reduce initial JS
const GalleryPreview = lazy(() => import("@/components/GalleryPreview").then(m => ({ default: m.GalleryPreview })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then(m => ({ default: m.ServicesSection })));
const ProcessSection = lazy(() => import("@/components/ProcessSection").then(m => ({ default: m.ProcessSection })));
const ShowcaseGrid = lazy(() => import("@/components/ShowcaseGrid").then(m => ({ default: m.ShowcaseGrid })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));

const SectionFallback = () => <div className="section-padding bg-background" />;

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <GalleryPreview />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ShowcaseGrid />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Index;
