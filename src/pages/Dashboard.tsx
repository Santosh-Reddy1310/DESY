import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DecisionCard } from "@/components/dashboard/DecisionCard";
import { FilterSidebar } from "@/components/dashboard/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, LayoutGrid, List, Sparkles, FolderOpen, TrendingUp, Clock, Filter, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getUserDecisions } from "@/lib/supabase-service";
import { getSampleDecisions } from "@/lib/sample-decisions";
import type { Decision, DecisionStatus } from "@/types/decision";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { toast } = useToast();
  const { user, isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<DecisionStatus[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSamples, setShowSamples] = useState(true);

  // Get sample decisions
  const sampleDecisions = getSampleDecisions().map((sample, index) => ({
    ...sample,
    id: `sample-${index}`,
    user_id: 'sample',
    created_at: new Date(Date.now() - (index + 1) * 86400000).toISOString(), // Days ago
    updated_at: new Date(Date.now() - (index + 1) * 86400000).toISOString(),
  })) as Decision[];

  useEffect(() => {
    if (isLoaded && user) {
      loadDecisions();
    }
  }, [statusFilters, isLoaded, user]);

  async function loadDecisions() {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getUserDecisions(user.id, {
        status: statusFilters.length > 0 ? statusFilters : undefined,
      });
      setDecisions(data);
    } catch (error) {
      console.error("Error loading decisions:", error);
      toast({
        title: "Error",
        description: "Failed to load decisions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const filteredDecisions = decisions.filter((decision) => {
    if (!searchQuery) return true;
    return decision.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredSamples = sampleDecisions.filter((decision) => {
    if (!searchQuery) return true;
    return decision.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Always show samples if toggle is enabled
  const shouldShowSamples = showSamples;

  // Stats
  const totalDecisions = decisions.length;
  const completedDecisions = decisions.filter(d => d.status === "done").length;
  const inProgressDecisions = decisions.filter(d => d.status === "analyzing" || d.status === "draft").length;

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="relative border-b bg-gradient-to-b from-muted/30 to-background">
          <div className="absolute inset-0 bg-mesh opacity-20" />
          <div className="container relative py-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Your Decisions</h1>
                <p className="text-muted-foreground max-w-lg">
                  Track, manage, and analyze all your decisions in one place. Get AI-powered insights for better outcomes.
                </p>
              </div>
              <Link to="/decisions/new">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all hover:scale-105">
                  <Plus className="h-5 w-5" />
                  New Decision
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <StatsCard
                icon={FolderOpen}
                label="Total Decisions"
                value={totalDecisions}
                gradient="from-blue-500 to-cyan-500"
              />
              <StatsCard
                icon={TrendingUp}
                label="Completed"
                value={completedDecisions}
                gradient="from-emerald-500 to-green-500"
              />
              <StatsCard
                icon={Clock}
                label="In Progress"
                value={inProgressDecisions}
                gradient="from-amber-500 to-orange-500"
              />
            </div>
          </div>
        </div>

        <main className="flex-1 container py-8">
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-6">
                <FilterSidebar
                  statusFilters={statusFilters}
                  onStatusChange={setStatusFilters}
                  decisions={decisions}
                />
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Search and view toggle */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search decisions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-border/60 focus:bg-background transition-colors"
                  />
                </div>

                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden h-11 w-11">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <div className="mt-6">
                      <FilterSidebar
                        statusFilters={statusFilters}
                        onStatusChange={setStatusFilters}
                        decisions={decisions}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-1 border border-border/60 rounded-lg p-1 bg-muted/30">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "h-9 w-9 transition-all",
                      viewMode === "grid" && "bg-background shadow-sm"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "h-9 w-9 transition-all",
                      viewMode === "list" && "bg-background shadow-sm"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results count */}
              {!isLoading && filteredDecisions.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  Showing {filteredDecisions.length} of {decisions.length} decisions
                </p>
              )}

              {/* Decision cards grid */}
              {!isLoaded || isLoading ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-4">
                    <div className="h-8 w-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                  <p className="text-muted-foreground font-medium">Loading your decisions...</p>
                </div>
              ) : (
                <>
                  {/* User's decisions */}
                  {filteredDecisions.length > 0 && (
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                          : "flex flex-col gap-3"
                      }
                    >
                      {filteredDecisions.map((decision, index) => (
                        <DecisionCard
                          key={decision.id}
                          decision={decision}
                          viewMode={viewMode}
                          style={{ animationDelay: `${index * 50}ms` }}
                          onDelete={loadDecisions}
                          onUpdate={loadDecisions}
                        />
                      ))}
                    </div>
                  )}

                  {/* Sample decisions section */}
                  {shouldShowSamples && filteredSamples.length > 0 && (
                    <div className={filteredDecisions.length > 0 ? "mt-12" : ""}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg">
                            <Lightbulb className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">Example Decisions</h2>
                            <p className="text-sm text-muted-foreground">
                              Explore these sample decisions to see how .DI works
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSamples(false)}
                        >
                          Hide Examples
                        </Button>
                      </div>

                      <div
                        className={
                          viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                            : "flex flex-col gap-3"
                        }
                      >
                        {filteredSamples.map((decision, index) => (
                          <div key={decision.id} className="relative">
                            <Badge
                              className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg"
                            >
                              Example
                            </Badge>
                            <DecisionCard
                              decision={decision}
                              viewMode={viewMode}
                              style={{ animationDelay: `${index * 50}ms` }}
                              onDelete={() => { }} // No delete for samples
                              onUpdate={() => { }} // No update for samples
                              isSample={true}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show Examples button when hidden */}
                  {!shouldShowSamples && filteredDecisions.length > 0 && (
                    <div className="mt-12 text-center">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowSamples(true)}
                        className="gap-2"
                      >
                        <Lightbulb className="h-5 w-5" />
                        Show Example Decisions
                      </Button>
                    </div>
                  )}

                  {/* Empty state */}
                  {filteredDecisions.length === 0 && !shouldShowSamples && (
                    <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/60">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-muted mb-4">
                        <Sparkles className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {searchQuery || statusFilters.length > 0
                          ? "No matching decisions"
                          : "No decisions yet"}
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        {searchQuery || statusFilters.length > 0
                          ? "Try adjusting your search or filters"
                          : "Create your first decision and let AI help you make better choices"}
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <Link to="/decisions/new">
                          <Button className="gap-2 shadow-lg shadow-primary/20">
                            <Plus className="h-4 w-4" />
                            Create your first decision
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={() => setShowSamples(true)}
                        >
                          <Lightbulb className="h-4 w-4" />
                          View Examples
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
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
