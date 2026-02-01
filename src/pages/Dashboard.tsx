import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DecisionCard } from "@/components/dashboard/DecisionCard";
import { FilterSidebar } from "@/components/dashboard/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, LayoutGrid, List } from "lucide-react";
import type { Decision, DecisionStatus } from "@/types/decision";

// Demo data
const demoDecisions: Decision[] = [
  {
    id: "1",
    title: "Which programming language to learn next?",
    context: "Looking to expand my skill set for better job opportunities",
    status: "done",
    options: [
      { id: "1", label: "Rust", notes: "Systems programming" },
      { id: "2", label: "Go", notes: "Backend development" },
      { id: "3", label: "Python", notes: "Data science" },
    ],
    criteria: [
      { id: "1", name: "Job Market", weight: 9, description: "Demand in job market" },
      { id: "2", name: "Learning Curve", weight: 7, description: "Ease of learning" },
    ],
    constraints: [
      { id: "1", type: "timeline", value: "3 months", priority: 4 },
    ],
    result_json: {
      recommendation: {
        optionId: "3",
        optionLabel: "Python",
        confidence: 0.85,
        summary: "Python offers the best balance of job opportunities and ease of learning.",
      },
      scores: [],
      reasoning: {
        decomposition: "",
        assumptions: [],
        tradeoffs: [],
        risks: [],
        sensitivity: "",
      },
    },
    created_at: "2025-01-28T10:00:00Z",
    updated_at: "2025-01-28T12:00:00Z",
  },
  {
    id: "2",
    title: "Best cloud provider for startup",
    context: "Need scalable infrastructure for our SaaS product",
    status: "analyzing",
    options: [
      { id: "1", label: "AWS", notes: "Market leader" },
      { id: "2", label: "GCP", notes: "Google ecosystem" },
      { id: "3", label: "Azure", notes: "Enterprise focus" },
    ],
    criteria: [
      { id: "1", name: "Cost", weight: 10, description: "Monthly expenses" },
      { id: "2", name: "Scalability", weight: 8, description: "Growth potential" },
    ],
    constraints: [
      { id: "1", type: "budget", value: "$5000/month", priority: 5 },
    ],
    created_at: "2025-01-29T09:00:00Z",
    updated_at: "2025-01-29T09:30:00Z",
  },
  {
    id: "3",
    title: "Remote work vs Office return",
    context: "Company is evaluating hybrid work policies",
    status: "draft",
    options: [
      { id: "1", label: "Full Remote", notes: "Work from anywhere" },
      { id: "2", label: "Hybrid", notes: "3 days office, 2 remote" },
      { id: "3", label: "Full Office", notes: "Traditional setup" },
    ],
    criteria: [
      { id: "1", name: "Productivity", weight: 9, description: "Work output" },
      { id: "2", name: "Work-Life Balance", weight: 8, description: "Personal time" },
    ],
    constraints: [],
    created_at: "2025-01-30T14:00:00Z",
    updated_at: "2025-01-30T14:00:00Z",
  },
  {
    id: "4",
    title: "Investment strategy for 2025",
    context: "Allocating savings for long-term growth",
    status: "archived",
    options: [
      { id: "1", label: "Index Funds", notes: "Low risk" },
      { id: "2", label: "Real Estate", notes: "Property investment" },
    ],
    criteria: [
      { id: "1", name: "Risk Level", weight: 8, description: "Investment risk" },
      { id: "2", name: "Returns", weight: 9, description: "Expected returns" },
    ],
    constraints: [
      { id: "1", type: "budget", value: "$50,000", priority: 5 },
    ],
    created_at: "2024-12-15T10:00:00Z",
    updated_at: "2024-12-20T15:00:00Z",
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<DecisionStatus[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDecisions = demoDecisions.filter((decision) => {
    const matchesSearch = decision.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(decision.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Decisions</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your decisions in one place
            </p>
          </div>
          <Link to="/decisions/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Decision
            </Button>
          </Link>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              statusFilters={statusFilters}
              onStatusChange={setStatusFilters}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search and view toggle */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search decisions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Decision cards grid */}
            {filteredDecisions.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed">
                <p className="text-muted-foreground mb-4">No decisions found</p>
                <Link to="/decisions/new">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create your first decision
                  </Button>
                </Link>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filteredDecisions.map((decision, index) => (
                  <DecisionCard
                    key={decision.id}
                    decision={decision}
                    viewMode={viewMode}
                    style={{ animationDelay: `${index * 50}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
