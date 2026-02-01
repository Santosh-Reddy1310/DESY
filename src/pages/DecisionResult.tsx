import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { ScoresTable } from "@/components/results/ScoresTable";
import { ScoreChart } from "@/components/results/ScoreChart";
import { RadarChart } from "@/components/results/RadarChart";
import { ReasoningAccordion } from "@/components/results/ReasoningAccordion";
import { AnalysisLoader } from "@/components/results/AnalysisLoader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, RefreshCw } from "lucide-react";
import type { AnalysisResult } from "@/types/decision";

// Demo result data
const demoResult: AnalysisResult = {
  recommendation: {
    optionId: "3",
    optionLabel: "Python",
    confidence: 0.87,
    summary: "Python offers the best overall balance for your needs. It has strong job market demand, a gentle learning curve, and excellent versatility across domains from web development to data science and AI/ML.",
  },
  scores: [
    {
      optionId: "1",
      optionLabel: "Rust",
      criteriaScores: [
        { criterionId: "1", criterionName: "Job Market", score: 6 },
        { criterionId: "2", criterionName: "Learning Curve", score: 4 },
        { criterionId: "3", criterionName: "Versatility", score: 7 },
        { criterionId: "4", criterionName: "Community", score: 7 },
        { criterionId: "5", criterionName: "Future Potential", score: 9 },
      ],
      totalScore: 66,
    },
    {
      optionId: "2",
      optionLabel: "Go",
      criteriaScores: [
        { criterionId: "1", criterionName: "Job Market", score: 7 },
        { criterionId: "2", criterionName: "Learning Curve", score: 7 },
        { criterionId: "3", criterionName: "Versatility", score: 6 },
        { criterionId: "4", criterionName: "Community", score: 7 },
        { criterionId: "5", criterionName: "Future Potential", score: 8 },
      ],
      totalScore: 70,
    },
    {
      optionId: "3",
      optionLabel: "Python",
      criteriaScores: [
        { criterionId: "1", criterionName: "Job Market", score: 9 },
        { criterionId: "2", criterionName: "Learning Curve", score: 9 },
        { criterionId: "3", criterionName: "Versatility", score: 10 },
        { criterionId: "4", criterionName: "Community", score: 10 },
        { criterionId: "5", criterionName: "Future Potential", score: 9 },
      ],
      totalScore: 94,
    },
  ],
  reasoning: {
    decomposition: "The decision was analyzed across five key dimensions: current job market demand, ease of learning within your timeline, versatility across different domains, community support and resources, and future growth potential.",
    assumptions: [
      "You have approximately 3 months to achieve basic proficiency",
      "Job opportunities are a primary motivator for learning",
      "You have some prior programming experience",
      "You're open to various domains (web, data, systems)",
    ],
    tradeoffs: [
      "Python sacrifices raw performance for development speed and accessibility",
      "Rust offers memory safety but requires longer learning investment",
      "Go provides simplicity but has a smaller ecosystem than Python",
    ],
    risks: [
      "Python's popularity may lead to more competition for entry-level roles",
      "AI-generated code tools may reduce demand for scripting tasks",
      "The 3-month timeline may be tight for deep proficiency in any language",
    ],
    sensitivity: "The recommendation is stable across most weight variations. Only if 'Learning Curve' weight drops below 4 does Go become competitive. Rust only leads if 'Future Potential' weight exceeds 12.",
  },
};

export default function DecisionResult() {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setResult(demoResult);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <AnalysisLoader />
        </main>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Analysis Results</h1>
            <p className="text-muted-foreground mt-1">
              Which programming language to learn next?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Re-analyze
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommendation */}
            <RecommendationCard recommendation={result.recommendation} />

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreChart scores={result.scores} />
              <RadarChart scores={result.scores} />
            </div>

            {/* Scores table */}
            <ScoresTable scores={result.scores} />
          </div>

          {/* Sidebar - Reasoning */}
          <div className="space-y-6">
            <ReasoningAccordion reasoning={result.reasoning} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
