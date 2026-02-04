import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DecisionCard } from "@/components/dashboard/DecisionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Archive, TrendingUp, Clock, Filter as FilterIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getUserDecisions } from "@/lib/supabase-service";
import type { Decision } from "@/types/decision";
import { cn } from "@/lib/utils";

export default function History() {
  const { toast } = useToast();
  const { user, isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<"all" | "week" | "month" | "year">("all");

  useEffect(() => {
    if (isLoaded && user) {
      loadDecisions();
    }
  }, [isLoaded, user]);

  async function loadDecisions() {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getUserDecisions(user.id, {});
      // Sort by date, newest first
      const sorted = data.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setDecisions(sorted);
    } catch (error) {
      console.error("Error loading decisions:", error);
      toast({
        title: "Error",
        description: "Failed to load decision history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const filterByTime = (decision: Decision) => {
    if (timeFilter === "all") return true;

    const decisionDate = new Date(decision.created_at);
    const now = new Date();
    const diffTime = now.getTime() - decisionDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    switch (timeFilter) {
      case "week":
        return diffDays <= 7;
      case "month":
        return diffDays <= 30;
      case "year":
        return diffDays <= 365;
      default:
        return true;
    }
  };

  const filteredDecisions = decisions
    .filter(filterByTime)
    .filter((decision) => {
      if (!searchQuery) return true;
      return decision.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // Group by date
  const groupedDecisions = filteredDecisions.reduce((groups, decision) => {
    const date = new Date(decision.created_at);
    const key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(decision);
    return groups;
  }, {} as Record<string, Decision[]>);

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className="relative border-b bg-gradient-to-b from-muted/30 to-background">
          <div className="absolute inset-0 bg-mesh opacity-20" />
          <div className="container relative py-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                  <Archive className="h-8 w-8 text-primary" />
                  Decision History
                </h1>
                <p className="text-muted-foreground max-w-lg">
                  Review all your past decisions and their outcomes over time
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <StatsCard
                icon={Archive}
                label="Total Decisions"
                value={decisions.length}
                gradient="from-blue-500 to-cyan-500"
              />
              <StatsCard
                icon={TrendingUp}
                label="This Month"
                value={decisions.filter(d => {
                  const diffDays = (new Date().getTime() - new Date(d.created_at).getTime()) / (1000 * 60 * 60 * 24);
                  return diffDays <= 30;
                }).length}
                gradient="from-emerald-500 to-green-500"
              />
              <StatsCard
                icon={Clock}
                label="This Week"
                value={decisions.filter(d => {
                  const diffDays = (new Date().getTime() - new Date(d.created_at).getTime()) / (1000 * 60 * 60 * 24);
                  return diffDays <= 7;
                }).length}
                gradient="from-amber-500 to-orange-500"
              />
            </div>
          </div>
        </div>

        <main className="flex-1 container py-8">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search decisions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/50 border-border/60 focus:bg-background transition-colors"
              />
            </div>

            {/* Time filter buttons */}
            <div className="flex items-center gap-2 border border-border/60 rounded-lg p-1 bg-muted/30">
              {[
                { label: "All", value: "all" as const },
                { label: "Week", value: "week" as const },
                { label: "Month", value: "month" as const },
                { label: "Year", value: "year" as const },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTimeFilter(filter.value)}
                  className={cn(
                    "h-9 transition-all",
                    timeFilter === filter.value && "bg-background shadow-sm"
                  )}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {!isLoading && filteredDecisions.length > 0 && (
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredDecisions.length} of {decisions.length} decisions
            </p>
          )}

          {/* Decision history grouped by date */}
          {!isLoaded || isLoading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-4">
                <div className="h-8 w-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
              <p className="text-muted-foreground font-medium">Loading history...</p>
            </div>
          ) : filteredDecisions.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/60">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-muted mb-4">
                <Archive className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {searchQuery || timeFilter !== "all"
                  ? "No matching decisions"
                  : "No decision history"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                {searchQuery || timeFilter !== "all"
                  ? "Try adjusting your search or time filter"
                  : "Your decision history will appear here once you create decisions"}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedDecisions).map(([month, monthDecisions]) => (
                <div key={month}>
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">{month}</h2>
                    <span className="text-sm text-muted-foreground">
                      ({monthDecisions.length} {monthDecisions.length === 1 ? 'decision' : 'decisions'})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {monthDecisions.map((decision, index) => (
                      <DecisionCard
                        key={decision.id}
                        decision={decision}
                        viewMode="grid"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onDelete={loadDecisions}
                        onUpdate={loadDecisions}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function StatsCard({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  gradient: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
