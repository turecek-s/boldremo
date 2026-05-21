import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { SeoHead } from "@/components/SeoHead";
import { 
  FileText, 
  CheckSquare, 
  Lightbulb, 
  DollarSign, 
  Clock, 
  Ruler, 
  Droplets,
  Shield,
  Leaf,
  Download,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const guides = [
  {
    icon: Ruler,
    title: "Complete Bathroom Remodel Planning Guide",
    description: "Everything you need to know before starting your bathroom renovation, from budgeting to timeline expectations.",
    tips: [
      "Measure your space accurately before shopping for fixtures",
      "Consider traffic flow and door swing directions",
      "Plan for adequate ventilation to prevent mold",
      "Account for plumbing locations when redesigning layout"
    ]
  },
  {
    icon: DollarSign,
    title: "Bathroom Remodeling Cost Breakdown",
    description: "Understand where your money goes in a bathroom remodel and how to budget effectively for your project.",
    tips: [
      "Labor typically accounts for 40-50% of total cost",
      "Tile installation: $10-$50 per square foot installed",
      "Vanity and fixtures: $500-$5,000+ depending on quality",
      "Always add 15-20% contingency for unexpected issues"
    ]
  },
  {
    icon: Droplets,
    title: "Choosing the Right Tile for Your Bathroom",
    description: "A comprehensive guide to bathroom tile options, from porcelain to natural stone, with pros and cons of each.",
    tips: [
      "Porcelain tile is most durable for high-moisture areas",
      "Natural stone requires sealing every 1-2 years",
      "Larger tiles make small bathrooms appear bigger",
      "Non-slip ratings matter for floor tiles"
    ]
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Bathroom Upgrades",
    description: "Sustainable choices that save water, energy, and money while creating a beautiful bathroom space.",
    tips: [
      "Low-flow toilets save 13,000+ gallons per year",
      "LED lighting uses 75% less energy than incandescent",
      "WaterSense fixtures reduce water use by 20-30%",
      "Recycled glass tiles are beautiful and sustainable"
    ]
  }
];

const checklist = [
  {
    category: "Before You Start",
    items: [
      "Set a realistic budget with 15-20% contingency",
      "Research and select a licensed, insured contractor",
      "Obtain necessary permits from your local municipality",
      "Create a detailed design plan with measurements",
      "Select all materials, fixtures, and finishes in advance"
    ]
  },
  {
    category: "Design Decisions",
    items: [
      "Choose layout (keep plumbing or relocate?)",
      "Select vanity style, size, and countertop material",
      "Pick tile for floors, walls, and shower/tub area",
      "Decide on lighting fixtures and placement",
      "Choose hardware finishes (brushed nickel, chrome, etc.)"
    ]
  },
  {
    category: "During Construction",
    items: [
      "Verify rough plumbing before walls are closed",
      "Inspect waterproofing in shower/tub areas",
      "Check electrical work meets code requirements",
      "Confirm tile layout before installation begins",
      "Document progress with photos for your records"
    ]
  },
  {
    category: "Final Walkthrough",
    items: [
      "Test all fixtures for proper operation and leaks",
      "Verify grout lines are even and properly sealed",
      "Check caulking around tub, shower, and sink",
      "Ensure all outlets and switches work correctly",
      "Confirm exhaust fan vents to exterior properly"
    ]
  }
];

const quickTips = [
  {
    icon: Clock,
    title: "Timeline Expectations",
    tip: "A standard bathroom remodel takes 2-3 weeks. Add 1-2 weeks for layout changes or custom work."
  },
  {
    icon: Shield,
    title: "Protect Your Investment",
    tip: "Always verify your contractor carries liability insurance and workers' compensation coverage."
  },
  {
    icon: Lightbulb,
    title: "Lighting Layers",
    tip: "Use 3 types of lighting: ambient (overhead), task (vanity), and accent for a functional, inviting space."
  },
  {
    icon: FileText,
    title: "Get It In Writing",
    tip: "Detailed contracts should include scope, timeline, payment schedule, and change order process."
  }
];

const resourcesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Bathroom Remodeling Resources & Planning Guides",
  "description": "Free bathroom remodeling guides, cost breakdowns, planning checklists, and tips from Houston's BoldREMO team. Plan your renovation with confidence.",
  "url": "https://www.boldremo.com/resources",
  "author": {
    "@type": "Organization",
    "name": "BoldREMO",
    "url": "https://www.boldremo.com",
  },
  "publisher": {
    "@type": "Organization",
    "name": "BoldREMO",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.boldremo.com/og-image.jpg",
    },
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.boldremo.com/resources",
  },
};

const Resources = () => {
  const location = useLocation();
  const handlePrintChecklist = () => {
    window.print();
  };

  // Scroll to hash anchor on mount and whenever the hash changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location.hash, location.key]);

  return (
    <>
      <SeoHead path="/resources" jsonLd={resourcesJsonLd} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Bathroom Remodeling Resources
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Free guides, checklists, and expert tips to help you plan your perfect bathroom renovation. 
                Whether you&apos;re a first-time remodeler or experienced homeowner, these resources will help you make informed decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Cost Calculator Highlight */}
        <section id="cost-calculator" className="section-padding bg-background scroll-mt-28">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/85 text-primary-foreground rounded-lg p-8 md:p-12 text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-foreground/15 mb-5">
                <Calculator className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                Houston Bathroom Cost Calculator
              </h2>
              <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto mb-7">
                Get a realistic price range for your bathroom remodel in under 60 seconds —
                tailored to your size, scope, neighborhood, and finishes.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/cost-calculator">Try the Free Calculator</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section id="guides" className="section-padding bg-background scroll-mt-28">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                In-Depth Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive resources to help you understand every aspect of bathroom remodeling
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {guides.map((guide, index) => (
                <article 
                  key={index} 
                  className="bg-secondary rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <guide.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-6">
                    {guide.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckSquare className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <Button
                variant="outline"
                onClick={handlePrintChecklist}
                className="gap-2 mb-4"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Print Checklist
              </Button>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Bathroom Remodel Checklist
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your step-by-step guide to a successful bathroom renovation project
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {checklist.map((section, index) => (
                <div key={index} className="bg-background rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <h3 className="font-serif font-semibold text-foreground">
                      {section.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-4 h-4 border-2 border-muted-foreground/30 rounded shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section id="tips" className="section-padding bg-background scroll-mt-28">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Quick Tips from the Pros
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Expert advice from our years of bathroom remodeling experience in Houston
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickTips.map((tip, index) => (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <tip.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tip.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Houston-Specific Section */}
        <section id="houston-guide" className="section-padding bg-secondary scroll-mt-28">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-center">
                Bathroom Remodeling in Houston: What You Need to Know
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Houston&apos;s unique climate and building requirements mean your bathroom remodel needs special consideration. 
                  Our humid subtropical climate makes proper ventilation and moisture-resistant materials essential.
                </p>
                <h3 className="text-xl font-serif font-semibold text-foreground mt-8 mb-4">
                  Houston-Specific Considerations
                </h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Humidity Control:</strong> Install high-CFM exhaust fans rated for Houston&apos;s humidity levels (minimum 50 CFM for standard bathrooms)
                  </li>
                  <li>
                    <strong>Mold Prevention:</strong> Use mold-resistant drywall (green board or purple board) in all wet areas
                  </li>
                  <li>
                    <strong>Foundation Considerations:</strong> Houston&apos;s clay soil can cause shifting; ensure proper waterproofing around all plumbing penetrations
                  </li>
                  <li>
                    <strong>Energy Efficiency:</strong> Low-flow fixtures help manage Houston&apos;s water costs while remaining eco-friendly
                  </li>
                  <li>
                    <strong>Permit Requirements:</strong> City of Houston requires permits for plumbing changes and electrical work
                  </li>
                </ul>
                <h3 className="text-xl font-serif font-semibold text-foreground mt-8 mb-4">
                  Popular Styles in Houston Homes
                </h3>
                <p>
                  Houston homeowners are embracing spa-inspired designs with large-format tiles, frameless glass showers, 
                  and floating vanities. Neutral palettes with warm wood accents remain popular in Heights bungalows, 
                  while River Oaks homes often feature luxury marble and statement lighting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="resources-cta" className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Start Your Bathroom Remodel?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Put these resources to work with Houston&apos;s trusted bathroom remodeling experts. 
              Get a free rough estimate by phone or email, or book a $75 design consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Book Bathroom Consult</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="!bg-transparent !border-primary-foreground !text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/gallery">View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Resources;
