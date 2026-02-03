import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Target, BarChart3, Shield, Zap, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-gradient-hero absolute inset-0" />
        <div className="bg-mesh absolute inset-0 opacity-30" />
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="container relative pt-32 pb-24 md:pt-40 md:pb-36">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge with shine effect */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in backdrop-blur-sm">
            <Sparkles className="h-4 w-4 animate-bounce-subtle" />
            <span>AI-Powered Decision Intelligence Platform</span>
            <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs">New</span>
          </div>

          {/* Headline with animated gradient */}
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
            Make{" "}
            <span className="gradient-text-animated">smarter decisions</span>
            <br className="hidden sm:block" />
            with AI-powered analysis
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Transform complex choices into clear, data-driven outcomes. 
            DESY analyzes your options, weighs tradeoffs, and delivers actionable recommendations.
          </p>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mb-10 text-sm text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>AI-powered insights</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Data-driven results</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in">
            <Link to="/decisions/new">
              <Button size="xl" className="gap-2 shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all hover:scale-105 group">
                <Zap className="h-5 w-5 group-hover:animate-bounce-subtle" />
                Start Your First Decision
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="xl" className="gap-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all">
                <TrendingUp className="h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Features grid with glass cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
            <FeatureCard
              icon={Target}
              title="Structured Framework"
              description="Break down decisions into options, criteria, and constraints for clarity"
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={BarChart3}
              title="Weighted Analysis"
              description="Score options objectively with AI-calculated weights and rankings"
              gradient="from-violet-500 to-purple-500"
            />
            <FeatureCard
              icon={Shield}
              title="Risk Assessment"
              description="Identify tradeoffs and potential risks before making your final choice"
              gradient="from-amber-500 to-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 backdrop-blur-sm hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-primary/10 transition-transform group-hover:scale-110`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
