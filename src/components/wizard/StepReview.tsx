import { Edit2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DecisionFormData } from "@/types/decision";

interface StepReviewProps {
  formData: DecisionFormData;
  onEditStep: (step: number) => void;
}

export function StepReview({ formData, onEditStep }: StepReviewProps) {
  const validOptions = formData.options.filter((o) => o.label.trim());
  const validCriteria = formData.criteria.filter((c) => c.name.trim());

  return (
    <div className="space-y-4">
      {/* Decision Title */}
      <ReviewSection
        title="Decision"
        step={1}
        onEdit={() => onEditStep(1)}
      >
        <h3 className="text-xl font-semibold">{formData.title}</h3>
        {formData.context && (
          <p className="text-muted-foreground mt-2">{formData.context}</p>
        )}
      </ReviewSection>

      {/* Options */}
      <ReviewSection
        title="Options"
        step={2}
        onEdit={() => onEditStep(2)}
        badge={`${validOptions.length} options`}
      >
        <div className="space-y-2">
          {validOptions.map((option, index) => (
            <div key={option.id} className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">{option.label}</p>
                {option.notes && (
                  <p className="text-sm text-muted-foreground">{option.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Criteria */}
      <ReviewSection
        title="Criteria"
        step={3}
        onEdit={() => onEditStep(3)}
        badge={`${validCriteria.length} criteria`}
      >
        <div className="space-y-3">
          {validCriteria.map((criterion) => (
            <div key={criterion.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{criterion.name}</p>
                {criterion.description && (
                  <p className="text-sm text-muted-foreground">{criterion.description}</p>
                )}
              </div>
              <Badge variant="secondary">Weight: {criterion.weight}/10</Badge>
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Constraints */}
      <ReviewSection
        title="Constraints"
        step={4}
        onEdit={() => onEditStep(4)}
        badge={formData.constraints.length > 0 ? `${formData.constraints.length} constraints` : "None"}
      >
        {formData.constraints.length === 0 ? (
          <p className="text-muted-foreground italic">No constraints specified</p>
        ) : (
          <div className="space-y-2">
            {formData.constraints.map((constraint) => (
              <div key={constraint.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {constraint.type}
                  </Badge>
                  <span>{constraint.value}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Priority: {constraint.priority}/5
                </span>
              </div>
            ))}
          </div>
        )}
      </ReviewSection>

      {/* Ready message */}
      <div className="rounded-xl bg-success/10 border border-success/20 p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-success mb-1">Ready for Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Your decision is ready to be analyzed. Our AI will evaluate each option against 
              your criteria and constraints to provide a recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  step,
  onEdit,
  badge,
  children,
}: {
  title: string;
  step: number;
  onEdit: () => void;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">{title}</h3>
          {badge && <Badge variant="secondary">{badge}</Badge>}
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit} className="gap-1">
          <Edit2 className="h-3.5 w-3.5" />
          Edit
        </Button>
      </div>
      {children}
    </div>
  );
}
