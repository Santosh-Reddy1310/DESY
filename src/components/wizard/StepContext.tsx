import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";

interface StepContextProps {
  title: string;
  context: string;
  onTitleChange: (title: string) => void;
  onContextChange: (context: string) => void;
}

export function StepContext({ title, context, onTitleChange, onContextChange }: StepContextProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              What decision are you trying to make?
            </Label>
            <Input
              id="title"
              placeholder="e.g., Which programming language should I learn next?"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-lg h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context" className="text-base font-medium">
              Add some context (optional)
            </Label>
            <Textarea
              id="context"
              placeholder="Describe the situation, goals, or any relevant background information..."
              value={context}
              onChange={(e) => onContextChange(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium mb-1">Tips for a good decision title</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific about what you're choosing between</li>
              <li>• Frame it as a question when possible</li>
              <li>• Include the timeframe if relevant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
