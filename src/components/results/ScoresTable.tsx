import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AnalysisResult } from "@/types/decision";

interface ScoresTableProps {
  scores: AnalysisResult["scores"];
}

export function ScoresTable({ scores }: ScoresTableProps) {
  const criteria = scores[0]?.criteriaScores.map((cs) => cs.criterionName) || [];
  const maxTotal = Math.max(...scores.map((s) => s.totalScore));

  return (
    <div className="rounded-2xl border bg-card p-6 overflow-x-auto">
      <h3 className="font-semibold mb-4">Weighted Scores</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Option</TableHead>
            {criteria.map((criterion) => (
              <TableHead key={criterion} className="text-center">
                {criterion}
              </TableHead>
            ))}
            <TableHead className="text-center font-bold">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((option) => (
            <TableRow
              key={option.optionId}
              className={cn(
                option.totalScore === maxTotal && "bg-primary/5"
              )}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {option.optionLabel}
                  {option.totalScore === maxTotal && (
                    <Badge variant="success" className="text-xs">Best</Badge>
                  )}
                </div>
              </TableCell>
              {option.criteriaScores.map((cs) => (
                <TableCell key={cs.criterionId} className="text-center">
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                      cs.score >= 8
                        ? "bg-success/10 text-success"
                        : cs.score >= 5
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {cs.score}
                  </span>
                </TableCell>
              ))}
              <TableCell className="text-center">
                <span
                  className={cn(
                    "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-sm font-bold",
                    option.totalScore === maxTotal
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {option.totalScore}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
