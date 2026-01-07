import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { CheckCircle } from "lucide-react";
import boldremo9 from "@/assets/boldremo-9.jpg";

const values = [
  "Quality craftsmanship on every project",
  "Transparent pricing with no hidden costs",
  "Licensed and insured professionals",
  "Personalized designs for your unique space",
  "Timely project completion",
  "Customer satisfaction guarantee",
];

const About = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              About BoldREMO
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Houston's trusted partner for luxury bathroom remodeling and home renovation.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-6">
                  Your Vision, Our Expertise
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At BoldREMO, we believe that your bathroom should be more than just a functional space—it should be a sanctuary that reflects your personal style and meets your unique needs.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Serving Houston's finest neighborhoods including Heights, Bellaire, River Oaks, and Kingwood, our team of skilled craftsmen brings years of experience in bathroom remodeling, tile installation, and home renovation. We're committed to transforming your vision into reality with precision, care, and attention to detail.
                </p>
                <ul className="space-y-3">
                  {values.map((value) => (
                    <li key={value} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src={boldremo9}
                  alt="BoldREMO bathroom remodeling craftsmanship"
                  className="w-full rounded-lg shadow-xl"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                  <div className="text-center">
                    <span className="block text-3xl font-bold">10+</span>
                    <span className="text-sm">Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default About;
