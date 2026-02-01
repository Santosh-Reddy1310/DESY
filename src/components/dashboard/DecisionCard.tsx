import { Link } from "react-router-dom";
import { Archive, Calendar, ChevronRight, Edit2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Decision } from "@/types/decision";

interface DecisionCardProps {
  decision: Decision;
  viewMode?: "grid" | "list";
  className?: string;
  style?: React.CSSProperties;
}

export function DecisionCard({ decision, viewMode = "grid", className, style }: DecisionCardProps) {
  const formattedDate = new Date(decision.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const statusLabels: Record<string, string> = {
    draft: "Draft",
    analyzing: "Analyzing",
    done: "Complete",
    archived: "Archived",
  };

  if (viewMode === "list") {
    return (
      <div
        className={cn(
          "group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-soft animate-fade-in",
          className
        )}
        style={style}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold truncate">{decision.title}</h3>
            <Badge variant={decision.status}>{statusLabels[decision.status]}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span>{decision.options.length} options</span>
            <span>{decision.criteria.length} criteria</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/decisions/${decision.id}`}>
            <Button variant="ghost" size="sm" className="gap-1">
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          {decision.status === "done" && (
            <Link to={`/decisions/${decision.id}/result`}>
              <Button size="sm" className="gap-1">
                Results
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-2xl border bg-card p-6 transition-all hover:border-primary/30 card-hover animate-fade-in",
        decision.status === "archived" && "opacity-60",
        className
      )}
      style={style}
    >
      {/* Archive button */}
      <button
        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        title="Archive"
      >
        <Archive className="h-4 w-4" />
      </button>

      {/* Status badge */}
      <div className="mb-4 flex items-center gap-2">
        <Badge variant={decision.status}>{statusLabels[decision.status]}</Badge>
        {decision.result_json?.recommendation.confidence && decision.result_json.recommendation.confidence > 0.8 && (
          <Badge variant="success" className="gap-1">
            <Sparkles className="h-3 w-3" />
            High Confidence
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {decision.title}
      </h3>

      {/* Context preview */}
      {decision.context && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {decision.context}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span>{decision.options.length} options</span>
        <span>•</span>
        <span>{decision.criteria.length} criteria</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Calendar className="h-3.5 w-3.5" />
        Updated {formattedDate}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t">
        <Link to={`/decisions/${decision.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-1">
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </Link>
        {decision.status === "done" ? (
          <Link to={`/decisions/${decision.id}/result`} className="flex-1">
            <Button size="sm" className="w-full gap-1">
              View Results
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : decision.status === "draft" ? (
          <Button size="sm" className="flex-1 gap-1">
            <Sparkles className="h-4 w-4" />
            Analyze
          </Button>
        ) : null}
      </div>
    </div>
  );
}
