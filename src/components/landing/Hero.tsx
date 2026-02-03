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

      <div className="container relative pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-36 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge with shine effect */}
          <div className="mb-6 md:mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-primary animate-fade-in backdrop-blur-sm">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 animate-bounce-subtle" />
            <span className="hidden sm:inline">AI-Powered Decision Intelligence Platform</span>
            <span className="sm:hidden">AI Decision Platform</span>
            <span className="ml-1 rounded-full bg-primary/20 px-1.5 py-0.5 md:px-2 text-xs">New</span>
          </div>

          {/* Headline with animated gradient */}
          <h1 className="mb-6 md:mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in leading-tight">
            Make{" "}
            <span className="gradient-text-animated">smarter decisions</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            with AI-powered analysis
          </h1>

          {/* Subheadline */}
          <p className="mb-8 md:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed px-4 sm:px-0">
            Transform complex choices into clear, data-driven outcomes. 
            <span className="hidden sm:inline"> DESY analyzes your options, weighs tradeoffs, and delivers actionable recommendations.</span>
            <span className="sm:hidden"> Get AI-powered insights for better decisions.</span>
          </p>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 md:mb-10 text-xs sm:text-sm text-muted-foreground animate-fade-in flex-wrap">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 flex-shrink-0" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 flex-shrink-0" />
              <span className="hidden sm:inline">AI-powered insights</span>
              <span className="sm:hidden">AI insights</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 flex-shrink-0" />
              <span className="hidden sm:inline">Data-driven results</span>
              <span className="sm:hidden">Data-driven</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 md:mb-20 animate-fade-in px-4 sm:px-0">
            <Link to="/decisions/new" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all hover:scale-105 group text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
                <Zap className="h-4 w-4 md:h-5 md:w-5 group-hover:animate-bounce-subtle" />
                <span className="hidden sm:inline">Start Your First Decision</span>
                <span className="sm:hidden">Get Started</span>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Features grid with glass cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto animate-fade-in px-4 sm:px-0">
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
    <div className="group relative rounded-xl sm:rounded-2xl border border-border/50 bg-card/50 p-4 sm:p-6 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 backdrop-blur-sm hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className={`mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-primary/10 transition-transform group-hover:scale-110`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <h3 className="mb-2 font-semibold text-base sm:text-lg">{title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
