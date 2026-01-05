import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { GalleryPreview } from "@/components/GalleryPreview";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <GalleryPreview />
        <ServicesSection />
        <ProcessSection />
        <ShowcaseGrid />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
