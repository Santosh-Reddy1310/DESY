import { Plus, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Option } from "@/types/decision";

interface StepOptionsProps {
  options: Option[];
  onChange: (options: Option[]) => void;
}

export function StepOptions({ options, onChange }: StepOptionsProps) {
  const addOption = () => {
    onChange([...options, { id: crypto.randomUUID(), label: "", notes: "" }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      onChange(options.filter((o) => o.id !== id));
    }
  };

  const updateOption = (id: string, field: keyof Option, value: string) => {
    onChange(
      options.map((o) => (o.id === id ? { ...o, [field]: value } : o))
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-semibold mb-1">List your options</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add at least 2 options you're considering. You can add notes to help distinguish them.
        </p>

        <div className="space-y-4">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="group flex gap-3 p-4 rounded-xl border bg-muted/30 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center text-muted-foreground cursor-move">
                <GripVertical className="h-5 w-5" />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {index + 1}
                  </span>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option.label}
                    onChange={(e) => updateOption(option.id, "label", e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Textarea
                  placeholder="Add notes about this option (optional)"
                  value={option.notes || ""}
                  onChange={(e) => updateOption(option.id, "notes", e.target.value)}
                  rows={2}
                  className="resize-none"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeOption(option.id)}
                disabled={options.length <= 2}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addOption}
          className="w-full mt-4 gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Another Option
        </Button>
      </div>
    </div>
  );
}
