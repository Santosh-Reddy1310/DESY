import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
            <Sparkles className="h-4 w-4" />
            AI-Powered Decision Intelligence
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
            Turn messy decisions into{" "}
            <span className="gradient-text">structured outcomes</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto animate-fade-in">
            DESY helps you break down complex decisions, weigh your options objectively, 
            and get AI-powered analysis with clear recommendations.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
            <Link to="/decisions/new">
              <Button variant="hero" size="xl" className="gap-2">
                Start Making Better Decisions
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero-outline" size="xl">
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in">
            <FeatureCard
              icon={Target}
              title="Structured Framework"
              description="Break down decisions into options, criteria, and constraints"
            />
            <FeatureCard
              icon={BarChart3}
              title="Weighted Analysis"
              description="Score options objectively with customizable weights"
            />
            <FeatureCard
              icon={Shield}
              title="Risk Assessment"
              description="Identify tradeoffs and potential risks before deciding"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border/50 bg-card p-6 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-soft card-hover">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
