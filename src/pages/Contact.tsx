import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      timestamp: new Date().toISOString(),
    };

    try {
      const { data: responseData, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          website: formData.get("website"), // honeypot field
        },
      });

      if (error) throw error;
      
      // Check for validation errors from the edge function
      if (responseData?.error) {
        const errorMessage = responseData.details?.join(", ") || responseData.error;
        toast({
          title: "Please check your form",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead path="/contact" />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-muted">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
              Book Your Bathroom Consult
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get a free rough estimate by phone or email, or book a $75 in-person design consultation (credited toward your project).
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-serif font-semibold text-foreground mb-6">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Free Rough Estimates:</strong> Call or email us for a quick estimate on straightforward projects.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  <strong>$75 Design Consultation:</strong> Book an in-person visit where we assess your space, discuss your vision, and create a personalized plan. This fee is credited toward your project if you move forward with us.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a
                        href="tel:+18325135737"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        (832) 513-5737
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:info@boldremo.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@boldremo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Service Areas</h3>
                      <p className="text-muted-foreground">
                        Houston, Heights, Bellaire, River Oaks & Kingwood
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                  Book Design Consultation
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
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
                    <Label htmlFor="message">Tell us about your project</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe your bathroom remodeling needs..."
                      required
                      minLength={10}
                    />
                    <p className="text-xs text-muted-foreground">Minimum 10 characters</p>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
