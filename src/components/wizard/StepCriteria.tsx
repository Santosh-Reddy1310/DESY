import { Plus, Trash2, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Criterion } from "@/types/decision";

interface StepCriteriaProps {
  criteria: Criterion[];
  onChange: (criteria: Criterion[]) => void;
}

export function StepCriteria({ criteria, onChange }: StepCriteriaProps) {
  const addCriterion = () => {
    onChange([
      ...criteria,
      { id: crypto.randomUUID(), name: "", weight: 5, description: "" },
    ]);
  };

  const removeCriterion = (id: string) => {
    if (criteria.length > 1) {
      onChange(criteria.filter((c) => c.id !== id));
    }
  };

  const updateCriterion = (id: string, field: keyof Criterion, value: string | number) => {
    onChange(
      criteria.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const getWeightLabel = (weight: number): string => {
    if (weight <= 2) return "Low";
    if (weight <= 4) return "Medium-Low";
    if (weight <= 6) return "Medium";
    if (weight <= 8) return "High";
    return "Critical";
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-semibold mb-1">Define your criteria</h3>
            <p className="text-sm text-muted-foreground">
              What factors matter most in this decision? Assign weights to prioritize them.
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Higher weights mean the criterion has more influence on the final recommendation.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-4">
          {criteria.map((criterion, index) => (
            <div
              key={criterion.id}
              className="group p-4 rounded-xl border bg-muted/30 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium mt-2">
                  {index + 1}
                </span>

                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Criterion name (e.g., Cost, Quality, Speed)"
                      value={criterion.name}
                      onChange={(e) => updateCriterion(criterion.id, "name", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCriterion(criterion.id)}
                      disabled={criteria.length <= 1}
                      className="h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Input
                    placeholder="Brief description (optional)"
                    value={criterion.description || ""}
                    onChange={(e) => updateCriterion(criterion.id, "description", e.target.value)}
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium">
                        {criterion.weight}/10 · {getWeightLabel(criterion.weight)}
                      </span>
                    </div>
                    <Slider
                      value={[criterion.weight]}
                      onValueChange={(value) => updateCriterion(criterion.id, "weight", value[0])}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addCriterion}
          className="w-full mt-4 gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Another Criterion
        </Button>
      </div>
    </div>
  );
}
