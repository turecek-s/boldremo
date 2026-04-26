import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HandCoins,
  Camera,
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const benefits = [
  {
    icon: HandCoins,
    title: "Generous referral fees",
    description:
      "We pay a meaningful referral fee on every closed project — paid promptly after project completion.",
  },
  {
    icon: Calendar,
    title: "Trade-priority scheduling",
    description:
      "Your clients move to the front of the consult queue. Initial designs within 5 business days.",
  },
  {
    icon: Camera,
    title: "Professional after photos",
    description:
      "Use our project photography in your own listings, portfolio, and social — fully credited.",
  },
  {
    icon: Users,
    title: "White-glove client experience",
    description:
      "Your reputation is on the line when you refer us. Transparent pricing, clean job sites, on-time delivery.",
  },
];

const steps = [
  {
    n: "1",
    title: "Apply below",
    desc: "Fill out the partnership form. Stan personally reviews every application within 2 business days.",
  },
  {
    n: "2",
    title: "Quick intro call",
    desc: "15-minute video or coffee — we cover referral terms, communication, and what makes a great fit.",
  },
  {
    n: "3",
    title: "Start referring",
    desc: "We give you a one-pager + referral link to share with clients. You earn on every closed project.",
  },
];

const RealtorsDesigners = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const businessName = (formData.get("businessName") as string) || "";
    const userMessage = (formData.get("message") as string) || "";

    // Compose a partnership-flavored message body that the existing
    // contact email function already handles.
    const composedMessage = [
      `--- PARTNERSHIP INQUIRY ---`,
      `Business: ${businessName}`,
      `Role: ${role || "(not specified)"}`,
      ``,
      userMessage,
    ].join("\n");

    try {
      const { data: responseData, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: composedMessage,
            website: formData.get("website"), // honeypot
            formType: "partnership",
          },
        }
      );

      if (error) throw error;

      if (responseData?.error) {
        const errorMessage =
          responseData.details?.join(", ") || responseData.error;
        toast({
          title: "Please check your form",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application received",
        description:
          "Thanks! Stan will personally review and reach out within 2 business days.",
      });
      (e.target as HTMLFormElement).reset();
      setRole("");
    } catch (err) {
      console.error("Error submitting partnership form:", err);
      toast({
        title: "Error",
        description: "Failed to send. Please try again or call (832) 513-5737.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead path="/realtors-designers" />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground mb-6">
              <Users className="h-3.5 w-3.5" />
              For Realtors, Interior Designers &amp; Architects
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              Partner with Houston's Luxury Bathroom Remodeler
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Refer your clients to BoldREMO with confidence. Earn referral fees, give
              clients trade-priority scheduling, and work with a team that protects your
              reputation on every project.
            </p>
            <Button asChild size="lg">
              <a href="#apply">
                Apply to partner <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-3">
                Why partner with BoldREMO
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for top realtors and designers serving Houston, Heights, Bellaire,
                River Oaks, and Kingwood.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-card border border-border rounded-lg p-6 flex gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1.5">
                      {b.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-3">
                How partnership works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Three simple steps. No long contracts. No exclusivity required.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="bg-background border border-border rounded-lg p-6 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl font-semibold">
                    {s.n}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get / co-marketing */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-8 text-center">
              Co-marketing benefits
            </h2>
            <ul className="space-y-4">
              {[
                "Featured logo and link on our public Press & Partners page",
                "Trade pricing on the $75 in-home design consult for your clients",
                "Joint social media features when projects complete",
                "First access to project photography and case studies",
                "Quarterly partner email with Houston market trends and project highlights",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Apply form */}
        <section
          id="apply"
          className="section-padding bg-muted"
        >
          <div className="container-custom max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-3">
                Apply to partner
              </h2>
              <p className="text-muted-foreground">
                Stan personally reviews every application. Expect a response within 2
                business days.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business / brokerage name</Label>
                  <Input id="businessName" name="businessName" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your role</Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="role" name="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Realtor">Realtor</SelectItem>
                      <SelectItem value="Interior Designer">Interior Designer</SelectItem>
                      <SelectItem value="Architect">Architect</SelectItem>
                      <SelectItem value="Builder">Builder / GC</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Tell us about your business and clients
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Neighborhoods you serve, typical client price points, what you're looking for in a remodeling partner..."
                    required
                    minLength={10}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !role}
                >
                  {isSubmitting ? "Sending..." : "Submit application"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Or email{" "}
                  <a
                    href="mailto:info@boldremo.com"
                    className="underline hover:text-primary"
                  >
                    info@boldremo.com
                  </a>{" "}
                  / call{" "}
                  <a
                    href="tel:+18325135737"
                    className="underline hover:text-primary"
                  >
                    (832) 513-5737
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RealtorsDesigners;
