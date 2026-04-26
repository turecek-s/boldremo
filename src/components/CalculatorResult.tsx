import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, RotateCcw, Calendar, CheckCircle2 } from "lucide-react";
import type { CalculatorInputs, CalculatorResult as Result } from "@/lib/calculator-pricing";

interface Props {
  inputs: CalculatorInputs;
  result: Result;
  onReset: () => void;
}

const BREAKDOWN_LABELS: Record<keyof Result["breakdown"], string> = {
  labor: "Labor & Installation",
  tile: "Tile & Stone",
  fixtures: "Fixtures & Lighting",
  vanity: "Vanity & Cabinetry",
  plumbing: "Plumbing Changes",
  contingency: "12% Contingency",
};

export const CalculatorResult = ({ inputs, result, onReset }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const total = Object.values(result.breakdown).reduce((a, b) => a + b, 0);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({ title: "Please enter your name and email", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-calculator-estimate", {
        body: { name: name.trim(), email: email.trim(), inputs, result },
      });
      if (error) throw error;
      setEmailSent(true);
      toast({
        title: "Estimate sent!",
        description: "Check your inbox for your printable estimate.",
      });
    } catch (err) {
      console.error("Calculator estimate error:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at (832) 513-5737.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Headline price */}
      <div className="text-center bg-secondary rounded-lg p-8 md:p-12 border border-border">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Estimated Project Range
        </p>
        <p className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">
          ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Breakdown bar */}
      <div className="bg-background rounded-lg p-6 md:p-8 border border-border">
        <h3 className="text-xl font-serif font-semibold text-foreground mb-6">
          Estimated Cost Breakdown
        </h3>

        {/* Visual bar */}
        <div className="flex h-4 rounded-full overflow-hidden mb-6 bg-muted">
          {(Object.keys(result.breakdown) as Array<keyof Result["breakdown"]>).map((key, idx) => {
            const value = result.breakdown[key];
            const pct = (value / total) * 100;
            const colors = [
              "bg-primary",
              "bg-primary/80",
              "bg-primary/60",
              "bg-primary/45",
              "bg-primary/30",
              "bg-muted-foreground/40",
            ];
            return (
              <div
                key={key}
                className={colors[idx]}
                style={{ width: `${pct}%` }}
                title={`${BREAKDOWN_LABELS[key]}: $${value.toLocaleString()}`}
              />
            );
          })}
        </div>

        {/* Itemized list */}
        <div className="grid sm:grid-cols-2 gap-3">
          {(Object.keys(result.breakdown) as Array<keyof Result["breakdown"]>).map((key, idx) => {
            const value = result.breakdown[key];
            const colors = [
              "bg-primary",
              "bg-primary/80",
              "bg-primary/60",
              "bg-primary/45",
              "bg-primary/30",
              "bg-muted-foreground/40",
            ];
            return (
              <div key={key} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-sm ${colors[idx]}`} />
                  <span className="text-foreground">{BREAKDOWN_LABELS[key]}</span>
                </div>
                <span className="font-medium text-foreground">
                  ${value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          Breakdown shows the mid-point of your estimated range. Actual costs vary based on
          specific selections, site conditions, and any scope changes.
        </p>
      </div>

      {/* CTAs */}
      <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-10 text-center">
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Ready for an exact quote?
        </h3>
        <p className="text-primary-foreground/85 mb-6 max-w-xl mx-auto">
          Book a $75 in-home design consult — we'll measure, discuss your selections, and
          deliver a written proposal. The $75 is credited toward your project.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/contact">
            <Calendar className="h-4 w-4" />
            Book Bathroom Consult
          </Link>
        </Button>
      </div>

      {/* Email capture */}
      <div className="bg-secondary rounded-lg p-6 md:p-8 border border-border">
        {emailSent ? (
          <div className="text-center py-4">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
              Check your inbox
            </h3>
            <p className="text-muted-foreground">
              We've sent your printable estimate to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-1">
                  Email me a printable estimate
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get this estimate as a branded PDF — useful for budgeting or comparing quotes.
                </p>
              </div>
            </div>
            <form onSubmit={handleEmailSubmit} className="grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <Label htmlFor="calc-name" className="sr-only">Your name</Label>
                <Input
                  id="calc-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="calc-email" className="sr-only">Email</Label>
                <Input
                  id="calc-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={submitting} className="sm:col-span-1">
                {submitting ? "Sending..." : "Send Estimate"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              No spam — just your estimate and occasional remodeling tips. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>

      {/* Reset */}
      <div className="text-center">
        <Button variant="ghost" onClick={onReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Start over with different inputs
        </Button>
      </div>
    </div>
  );
};
