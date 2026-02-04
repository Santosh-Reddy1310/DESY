import { FileText, ListChecks, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Define Your Decision",
    description: "Describe what you're deciding and provide context about your situation and goals.",
    gradient: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/25",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Add Options & Criteria",
    description: "List your alternatives and define what matters most with weighted importance.",
    gradient: "from-violet-500 to-purple-500",
    shadowColor: "shadow-violet-500/25",
  },
  {
    icon: Cpu,
    step: "03",
    title: "AI Analysis",
    description: "Our AI evaluates each option against your criteria, constraints, and tradeoffs.",
    gradient: "from-emerald-500 to-green-500",
    shadowColor: "shadow-emerald-500/25",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Get Recommendations",
    description: "Receive clear recommendations with detailed reasoning and confidence scores.",
    gradient: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/25",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How .DI Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Four simple steps to transform uncertainty into clarity and confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative group"
              >
                {/* Connector line - desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-14 left-[55%] w-full items-center">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-border via-primary/30 to-border" />
                    <ArrowRight className="h-4 w-4 text-primary/50 -ml-2" />
                  </div>
                )}

                <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/60 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full">
                  {/* Step number badge */}
                  <div className={cn(
                    "absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg bg-gradient-to-br",
                    item.gradient,
                    item.shadowColor
                  )}>
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className={cn(
                    "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110",
                    item.gradient,
                    item.shadowColor
                  )}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
