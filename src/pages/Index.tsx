import { lazy, Suspense, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import ImageGallerySchema from "@/components/ImageGallerySchema";

// Lazy load below-the-fold sections to reduce initial JS
const PricingSection = lazy(() => import("@/components/PricingSection").then((m) => ({ default: m.PricingSection })));
const GalleryPreview = lazy(() => import("@/components/GalleryPreview").then((m) => ({ default: m.GalleryPreview })));
const ServicesSection = lazy(() =>
  import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })),
);
const ProcessSection = lazy(() => import("@/components/ProcessSection").then((m) => ({ default: m.ProcessSection })));
const ShowcaseGrid = lazy(() => import("@/components/ShowcaseGrid").then((m) => ({ default: m.ShowcaseGrid })));
const TestimonialsSection = lazy(() =>
  import("@/components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
);
const TrustStrip = lazy(() => import("@/components/TrustStrip").then((m) => ({ default: m.TrustStrip })));
const LeadCaptureSection = lazy(() =>
  import("@/components/LeadCaptureSection").then((m) => ({ default: m.LeadCaptureSection })),
);
const FAQSection = lazy(() => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/CTASection").then((m) => ({ default: m.CTASection })));

const SectionFallback = () => <div className="section-padding bg-background" aria-hidden="true" />;

// Wrapper for below-fold sections with content-visibility optimization
const LazySection = ({ children }: { children: React.ReactNode }) => (
  <div className="content-visibility-auto">{children}</div>
);

const Index = () => {
  return (
    <>
      <LocalBusinessSchema />
      <ImageGallerySchema />
      <Header />
      <main>
        <HeroSection />
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <PricingSection />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <GalleryPreview />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <ProcessSection />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <ShowcaseGrid />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <TrustStrip />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <LeadCaptureSection />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <FAQSection />
          </Suspense>
        </LazySection>
        <LazySection>
          <Suspense fallback={<SectionFallback />}>
            <CTASection />
          </Suspense>
        </LazySection>
      </main>
      <Footer />
    </>
  );
};

export default Index;
