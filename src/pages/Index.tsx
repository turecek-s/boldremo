import { Suspense } from "react";
import { lazyWithReload } from "@/lib/lazy-with-reload";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FounderCredibility } from "@/components/FounderCredibility";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import ImageGallerySchema from "@/components/ImageGallerySchema";

// Lazy load below-the-fold sections to reduce initial JS
const PricingSection = lazyWithReload(() => import("@/components/PricingSection").then((m) => ({ default: m.PricingSection })));
const GalleryPreview = lazyWithReload(() => import("@/components/GalleryPreview").then((m) => ({ default: m.GalleryPreview })));
const ServicesSection = lazyWithReload(() =>
  import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })),
);
const ProcessSection = lazyWithReload(() => import("@/components/ProcessSection").then((m) => ({ default: m.ProcessSection })));
const ShowcaseGrid = lazyWithReload(() => import("@/components/ShowcaseGrid").then((m) => ({ default: m.ShowcaseGrid })));
const TestimonialsSection = lazyWithReload(() =>
  import("@/components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
);
const TrustStrip = lazyWithReload(() => import("@/components/TrustStrip").then((m) => ({ default: m.TrustStrip })));
const LeadCaptureSection = lazyWithReload(() =>
  import("@/components/LeadCaptureSection").then((m) => ({ default: m.LeadCaptureSection })),
);
const FAQSection = lazyWithReload(() => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })));
const CTASection = lazyWithReload(() => import("@/components/CTASection").then((m) => ({ default: m.CTASection })));

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
        <FounderCredibility />
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
