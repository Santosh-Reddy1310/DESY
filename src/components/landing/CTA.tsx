import { Link } from "react-router-dom";
import { ArrowRight, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container relative">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-violet-600 p-1">
          {/* Inner gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />

          <div className="relative bg-gradient-to-br from-primary via-primary/95 to-violet-600 rounded-[22px] p-10 md:p-16 text-center">
            {/* Animated background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-[100px] animate-pulse-slow [animation-delay:2s]" />

            {/* Pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 rounded-[22px]" />

            <div className="relative">
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4 animate-bounce-subtle" />
                Start for free — no credit card required
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Ready to make<br className="hidden sm:block" /> better decisions?
              </h2>

              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Join thousands of people using .DI to navigate complex choices with confidence and clarity.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Free forever plan
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  No signup required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  AI-powered insights
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/decisions/new">
                  <Button
                    size="xl"
                    className="bg-white text-primary hover:bg-white/95 shadow-2xl shadow-black/25 gap-2 font-semibold group"
                  >
                    <Zap className="h-5 w-5 group-hover:animate-bounce-subtle" />
                    Create Your First Decision
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  >
                    Explore Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
