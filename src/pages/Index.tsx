import { LandingHeader } from "@/components/layout/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <section id="details" className="py-16 md:py-24 bg-accent/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Why Choose .DI?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 px-4 sm:px-0">
                Our AI-powered platform transforms complex decisions into clear, actionable insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
                <div className="p-4 sm:p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Multi-Step Reasoning</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Advanced AI analyzes your decisions from multiple angles for comprehensive insights.
                  </p>
                </div>
                <div className="p-4 sm:p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Full Transparency</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Understand exactly why each recommendation is made with detailed explanations.
                  </p>
                </div>
                <div className="p-4 sm:p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Lightning Fast</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Get results in seconds with our optimized AI processing pipeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="py-16 md:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Get in Touch
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8 px-4 sm:px-0">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <a
                  href="mailto:contact@desy.ai"
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-center"
                >
                  Email Us
                </a>
                <a
                  href="#"
                  className="px-6 py-3 rounded-lg border border-border font-medium hover:bg-accent transition-colors text-center"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
