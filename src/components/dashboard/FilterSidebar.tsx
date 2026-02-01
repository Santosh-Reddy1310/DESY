import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { DecisionStatus } from "@/types/decision";

interface FilterSidebarProps {
  statusFilters: DecisionStatus[];
  onStatusChange: (statuses: DecisionStatus[]) => void;
}

const statusOptions: { value: DecisionStatus; label: string; count?: number }[] = [
  { value: "draft", label: "Draft", count: 1 },
  { value: "analyzing", label: "Analyzing", count: 1 },
  { value: "done", label: "Complete", count: 1 },
  { value: "archived", label: "Archived", count: 1 },
];

export function FilterSidebar({ statusFilters, onStatusChange }: FilterSidebarProps) {
  const toggleStatus = (status: DecisionStatus) => {
    if (statusFilters.includes(status)) {
      onStatusChange(statusFilters.filter((s) => s !== status));
    } else {
      onStatusChange([...statusFilters, status]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status filter */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold mb-4">Status</h3>
        <div className="space-y-3">
          {statusOptions.map((option) => (
            <div key={option.value} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`status-${option.value}`}
                  checked={statusFilters.includes(option.value)}
                  onCheckedChange={() => toggleStatus(option.value)}
                />
                <Label
                  htmlFor={`status-${option.value}`}
                  className="text-sm cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
              {option.count !== undefined && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {option.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Decisions</span>
            <span className="font-medium">4</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This Month</span>
            <span className="font-medium">3</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Analyzed</span>
            <span className="font-medium">1</span>
          </div>
        </div>
      </div>

      {/* Activity graph placeholder */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="font-semibold mb-4">Activity</h3>
        <div className="h-20 flex items-end gap-1">
          {[40, 60, 30, 80, 50, 70, 45].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/20 rounded-t transition-all hover:bg-primary/40"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Mon</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
