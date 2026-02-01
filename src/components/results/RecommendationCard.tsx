import { Trophy, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AnalysisResult } from "@/types/decision";

interface RecommendationCardProps {
  recommendation: AnalysisResult["recommendation"];
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const confidencePercent = Math.round(recommendation.confidence * 100);
  
  return (
    <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Recommendation</p>
              <h2 className="text-2xl font-bold">{recommendation.optionLabel}</h2>
            </div>
          </div>
          
          <Badge variant="success" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            {confidencePercent}% Confidence
          </Badge>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {recommendation.summary}
        </p>

        {/* Confidence meter */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Confidence Level</span>
            <span className="font-medium">{confidencePercent}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
