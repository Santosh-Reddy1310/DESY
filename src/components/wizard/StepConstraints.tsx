import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Constraint } from "@/types/decision";

interface StepConstraintsProps {
  constraints: Constraint[];
  onChange: (constraints: Constraint[]) => void;
}

const constraintTypes = [
  { value: "budget", label: "Budget" },
  { value: "timeline", label: "Timeline" },
  { value: "risk", label: "Risk Tolerance" },
  { value: "other", label: "Other" },
];

export function StepConstraints({ constraints, onChange }: StepConstraintsProps) {
  const addConstraint = () => {
    onChange([
      ...constraints,
      { id: crypto.randomUUID(), type: "budget", value: "", priority: 3 },
    ]);
  };

  const removeConstraint = (id: string) => {
    onChange(constraints.filter((c) => c.id !== id));
  };

  const updateConstraint = (id: string, field: keyof Constraint, value: string | number) => {
    onChange(
      constraints.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ) as Constraint[]
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-semibold mb-1">Add constraints (optional)</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Define any limitations or requirements that must be considered in the analysis.
        </p>

        {constraints.length === 0 ? (
          <div className="text-center py-8 bg-muted/30 rounded-xl border border-dashed">
            <p className="text-muted-foreground mb-4">No constraints added yet</p>
            <Button variant="outline" onClick={addConstraint} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Constraint
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {constraints.map((constraint, index) => (
                <div
                  key={constraint.id}
                  className="group p-4 rounded-xl border bg-muted/30 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium mt-2">
                      {index + 1}
                    </span>

                    <div className="flex-1 space-y-4">
                      <div className="flex gap-3">
                        <Select
                          value={constraint.type}
                          onValueChange={(value) =>
                            updateConstraint(constraint.id, "type", value as Constraint["type"])
                          }
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {constraintTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          placeholder={
                            constraint.type === "budget"
                              ? "e.g., $10,000 maximum"
                              : constraint.type === "timeline"
                              ? "e.g., 3 months"
                              : constraint.type === "risk"
                              ? "e.g., Low risk tolerance"
                              : "Describe the constraint"
                          }
                          value={constraint.value}
                          onChange={(e) =>
                            updateConstraint(constraint.id, "value", e.target.value)
                          }
                          className="flex-1"
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeConstraint(constraint.id)}
                          className="h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Priority</span>
                          <span className="font-medium">{constraint.priority}/5</span>
                        </div>
                        <Slider
                          value={[constraint.priority]}
                          onValueChange={(value) =>
                            updateConstraint(constraint.id, "priority", value[0])
                          }
                          min={1}
                          max={5}
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
              onClick={addConstraint}
              className="w-full mt-4 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Constraint
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
