import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LeadCaptureSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission - in production, this would connect to an email service
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Guide on the way!",
      description: "Check your email for the Bathroom Remodel Planning Guide.",
    });
    
    setName("");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="section-padding bg-primary/5" aria-labelledby="lead-capture-heading">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <FileText className="h-8 w-8" />
          </div>
          
          <h2 id="lead-capture-heading" className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-4">
            Bathroom Remodel Cost & Planning Guide
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8">
            Get realistic pricing ranges and a step-by-step bathroom remodeling planning checklist delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1"
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isSubmitting} className="sm:w-auto">
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Me the Guide
                </>
              )}
            </Button>
          </form>
          
          <p className="text-muted-foreground text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
