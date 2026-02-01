import { FileText, ListChecks, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Define Your Decision",
    description: "Describe what you're deciding and the context around it.",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Add Options & Criteria",
    description: "List your options and what matters most to you with weighted criteria.",
  },
  {
    icon: Cpu,
    step: "03",
    title: "AI Analysis",
    description: "Our AI evaluates each option against your criteria and constraints.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Get Recommendations",
    description: "Receive clear recommendations with reasoning and confidence scores.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How DESY Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform uncertainty into clarity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                
                <div className="relative bg-card rounded-2xl p-6 border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-soft">
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-glow">
                    {item.step}
                  </div>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
