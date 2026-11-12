import { Link } from "@/lib/router-compat";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalculatorResult } from "@/components/CalculatorResult";
import { Calculator, ChevronLeft, ChevronRight } from "lucide-react";
import {
  calculateEstimate,
  type CalculatorInputs,
  type BathroomSize,
  type ScopeLevel,
  type Neighborhood,
  type ShowerType,
  type VanityCount,
  type TileGrade,
  type PlumbingChanges,
  type CalculatorResult as Result,
} from "@/lib/calculator-pricing";

interface Step {
  key: keyof CalculatorInputs;
  label: string;
  helper: string;
  options: { value: string; label: string; description?: string }[];
}

const STEPS: Step[] = [
  {
    key: "size",
    label: "How big is your bathroom?",
    helper: "Approximate square footage of the room.",
    options: [
      { value: "half", label: "Half bath", description: "~25 sq ft, toilet & sink only" },
      { value: "small", label: "Small full bath", description: "~40 sq ft" },
      { value: "standard", label: "Standard bathroom", description: "~60 sq ft" },
      { value: "large", label: "Large master bath", description: "~100+ sq ft" },
    ],
  },
  {
    key: "scope",
    label: "What scope are you planning?",
    helper: "This sets material quality and project complexity.",
    options: [
      { value: "refresh", label: "Refresh", description: "New paint, fixtures, vanity, light updates" },
      { value: "midrange", label: "Mid-range remodel", description: "New tile, vanity, shower, lighting" },
      { value: "luxury", label: "Full luxury renovation", description: "Premium finishes, custom features, spa-level" },
    ],
  },
  {
    key: "neighborhood",
    label: "Where is your home?",
    helper: "Helps us route your request. Your area does not change the estimate.",
    options: [
      { value: "houston", label: "Houston" },
      { value: "heights", label: "The Heights" },
      { value: "bellaire", label: "Bellaire" },
      { value: "river-oaks", label: "River Oaks" },
      { value: "kingwood", label: "Kingwood" },
      { value: "memorial", label: "Memorial" },
      { value: "other", label: "Other / Greater Houston" },
    ],
  },
  {
    key: "shower",
    label: "What about the shower?",
    helper: "Shower work is one of the biggest cost drivers.",
    options: [
      { value: "keep", label: "Keep existing shower", description: "No changes to current shower" },
      { value: "standard", label: "New standard shower", description: "Replace tub/shower combo" },
      { value: "walk-in", label: "Walk-in glass shower", description: "Frameless glass, standard tile" },
      { value: "walk-in-custom", label: "Walk-in with custom tile", description: "Frameless glass, premium tile work" },
    ],
  },
  {
    key: "vanityCount",
    label: "Single or double vanity?",
    helper: "Double vanities require more cabinetry, plumbing, and counter space.",
    options: [
      { value: "single", label: "Single vanity" },
      { value: "double", label: "Double vanity" },
    ],
  },
  {
    key: "tileGrade",
    label: "What kind of tile?",
    helper: "Material grade significantly affects total cost.",
    options: [
      { value: "ceramic", label: "Standard ceramic", description: "$12–$20/sq ft installed" },
      { value: "porcelain", label: "Porcelain", description: "$18–$32/sq ft installed" },
      { value: "stone", label: "Large-format premium porcelain", description: "$35–$70/sq ft installed" },
    ],
  },
  {
    key: "plumbing",
    label: "Any plumbing changes?",
    helper: "Moving fixtures requires opening walls and re-routing pipes.",
    options: [
      { value: "none", label: "None", description: "Keep existing plumbing locations" },
      { value: "minor", label: "Minor", description: "Replace fixtures in same locations" },
      { value: "major", label: "Major", description: "Move toilet, shower, or sink locations" },
    ],
  },
];

const CostCalculator = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<CalculatorInputs>>({});
  const [result, setResult] = useState<Result | null>(null);

  const currentStep = STEPS[step] ?? STEPS[0]!;
  const isLastStep = step === STEPS.length - 1;
  const currentAnswer = answers[currentStep.key];

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [currentStep.key]: value });
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (isLastStep) {
      const final = calculateEstimate(answers as CalculatorInputs);
      setResult(final);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setAnswers({});
    setStep(0);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <>
      <SeoHead path="/cost-calculator" />
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                <Calculator className="h-7 w-7" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Houston Bathroom Remodel Cost Calculator
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Get a realistic price range for your Houston bathroom remodel in under 60 seconds.
                Built on real Houston-area labor and material rates from our completed projects.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator or Result */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              {result ? (
                <CalculatorResult
                  inputs={answers as CalculatorInputs}
                  result={result}
                  onReset={handleReset}
                />
              ) : (
                <div className="bg-secondary rounded-lg p-6 md:p-10 border border-border">
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Step {step + 1} of {STEPS.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
                      {currentStep.label}
                    </h2>
                    <p className="text-muted-foreground">{currentStep.helper}</p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {currentStep.options.map((opt) => {
                      const selected = currentAnswer === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelect(opt.value)}
                          className={`w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                selected ? "border-primary" : "border-muted-foreground/40"
                              }`}
                            >
                              {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{opt.label}</div>
                              {opt.description && (
                                <div className="text-sm text-muted-foreground mt-0.5">
                                  {opt.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={step === 0}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!currentAnswer}
                      className="gap-2"
                    >
                      {isLastStep ? "See My Estimate" : "Next"}
                      {!isLastStep && <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trust strip, why this calculator is accurate */}
        {!result && (
          <section className="pb-16 bg-background">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-serif font-bold text-primary mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">Houston bathrooms remodeled</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-primary mb-1">2026</div>
                  <div className="text-sm text-muted-foreground">Pricing reflects current market rates</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-primary mb-1">$75</div>
                  <div className="text-sm text-muted-foreground">In-home consult for an exact quote</div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">What Affects the Cost of a Bathroom Remodel in Houston</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Five choices drive most of the price:</p>
              <ul className="space-y-4 text-muted-foreground leading-relaxed list-disc pl-5">
                <li><strong className="text-foreground">Size.</strong> A half bath is about 25 sq ft and a large master bath is 100+ sq ft, and more floor and wall area means more tile and labor.</li>
                <li><strong className="text-foreground">Scope.</strong> A refresh updates paint, fixtures and the vanity. A mid-range remodel adds new tile and a new shower. A full luxury renovation adds premium finishes and custom features.</li>
                <li><strong className="text-foreground">Shower.</strong> Shower work is one of the biggest cost drivers, from keeping what you have to a walk-in glass shower with custom tile.</li>
                <li><strong className="text-foreground">Tile.</strong> Standard ceramic runs about $12 to $20 per sq ft installed, porcelain about $18 to $32, and large-format premium porcelain about $35 to $70.</li>
                <li><strong className="text-foreground">Plumbing changes.</strong> Keeping fixtures where they are costs less than moving the toilet, shower or sink, which means opening walls and re-routing pipes.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">How to Use Your Estimate</h2>
              <p className="text-muted-foreground leading-relaxed">The calculator gives a range, not a quote. Exact pricing is set at an in-home consultation, where we see your space and agree on the scope. For a sense of typical numbers, tub to shower conversions start at $7,000 and most full bathroom remodels come in around $10,000 to $21,000 all in. You can read more in our <Link to="/bathroom-remodel-cost-houston" className="text-primary underline underline-offset-2 hover:text-primary/80">bathroom remodel cost guide</Link>, or <Link to="/contact" className="text-primary underline underline-offset-2 hover:text-primary/80">contact us</Link> to book a consultation.</p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CostCalculator;
