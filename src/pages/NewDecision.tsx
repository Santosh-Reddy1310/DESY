import { useState, useReducer, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { TemplateSelector } from "@/components/wizard/TemplateSelector";
import { StepIndicator } from "@/components/wizard/StepIndicator";
import { StepContext } from "@/components/wizard/StepContext";
import { StepOptions } from "@/components/wizard/StepOptions";
import { StepCriteria } from "@/components/wizard/StepCriteria";
import { StepConstraints } from "@/components/wizard/StepConstraints";
import { StepReview } from "@/components/wizard/StepReview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, ChevronRight, Sparkles, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeDecision, validateDecisionForAnalysis } from "@/lib/analysis-service";
import { createDecision, updateDecisionStatus, saveAnalysisResult, getDecision, updateDecisionFull } from "@/lib/supabase-service";
import { getTemplateById } from "@/lib/decision-templates";
import { sendDecisionCompleteNotification } from "@/lib/notification-service";
import type { DecisionFormData, Option, Criterion, Constraint, Decision } from "@/types/decision";

type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTEXT"; payload: string }
  | { type: "SET_OPTIONS"; payload: Option[] }
  | { type: "SET_CRITERIA"; payload: Criterion[] }
  | { type: "SET_CONSTRAINTS"; payload: Constraint[] }
  | { type: "LOAD_TEMPLATE"; payload: DecisionFormData };

const initialState: DecisionFormData = {
  title: "",
  context: "",
  options: [
    { id: crypto.randomUUID(), label: "", notes: "" },
    { id: crypto.randomUUID(), label: "", notes: "" },
  ],
  criteria: [
    { id: crypto.randomUUID(), name: "", weight: 5, description: "" },
  ],
  constraints: [],
};

function formReducer(state: DecisionFormData, action: FormAction): DecisionFormData {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTEXT":
      return { ...state, context: action.payload };
    case "SET_OPTIONS":
      return { ...state, options: action.payload };
    case "SET_CRITERIA":
      return { ...state, criteria: action.payload };
    case "SET_CONSTRAINTS":
      return { ...state, constraints: action.payload };
    case "LOAD_TEMPLATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const steps = [
  { id: 1, label: "Context", description: "What are you deciding?" },
  { id: 2, label: "Options", description: "What are your choices?" },
  { id: 3, label: "Criteria", description: "What matters most?" },
  { id: 4, label: "Constraints", description: "Any limitations?" },
  { id: 5, label: "Review", description: "Ready to analyze" },
];

export default function NewDecision() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [currentDecisionId, setCurrentDecisionId] = useState<string | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingDecision, setExistingDecision] = useState<Decision | null>(null);

  // Load existing decision if editing
  useEffect(() => {
    if (id && id !== 'new') {
      loadExistingDecision(id);
    }
  }, [id]);

  const loadExistingDecision = async (decisionId: string) => {
    try {
      setIsLoading(true);
      const decision = await getDecision(decisionId);
      
      // Check if this is a sample decision
      if (decisionId.startsWith('sample-')) {
        toast({
          title: "Cannot Edit Sample",
          description: "Sample decisions cannot be edited. Create a new decision instead.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      setExistingDecision(decision);
      setCurrentDecisionId(decisionId);
      setIsEditMode(true);

      // Load decision data into form
      dispatch({
        type: "LOAD_TEMPLATE",
        payload: {
          title: decision.title,
          context: decision.context || "",
          options: decision.options || [],
          criteria: decision.criteria || [],
          constraints: decision.constraints || [],
        },
      });
    } catch (error) {
      console.error("Error loading decision:", error);
      toast({
        title: "Error",
        description: "Failed to load decision. Please try again.",
        variant: "destructive",
      });
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      dispatch({ type: "LOAD_TEMPLATE", payload: template.template as DecisionFormData });
      setShowTemplateSelector(false);
      toast({
        title: "Template loaded",
        description: `${template.name} template has been applied. Customize as needed.`,
      });
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.title.trim().length >= 3;
      case 2:
        return formData.options.filter((o) => o.label.trim()).length >= 2;
      case 3:
        return formData.criteria.filter((c) => c.name.trim()).length >= 1;
      case 4:
        return true; // Constraints are optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnalyze = async () => {
    // Validate decision data
    const validation = validateDecisionForAnalysis(formData);
    if (!validation.valid) {
      toast({
        title: "Invalid Decision",
        description: validation.errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgressMessage(isEditMode ? "Updating decision..." : "Creating decision...");

    try {
      // Create or update decision in Supabase
      let decisionId = currentDecisionId;
      if (!decisionId) {
        if (!user?.id) {
          throw new Error('User not authenticated');
        }
        const decision = await createDecision(user.id, formData);
        decisionId = decision.id;
        setCurrentDecisionId(decisionId);
      } else {
        // Update existing decision
        await updateDecisionFull(decisionId, formData);
      }

      // Update status to analyzing
      await updateDecisionStatus(decisionId, "analyzing");

      // Run AI analysis
      const result = await analyzeDecision(formData, (message) => {
        setProgressMessage(message);
      });

      // Save result to database
      await saveAnalysisResult(decisionId, result);

      // Send email notification
      if (user?.id && !isEditMode) {
        await sendDecisionCompleteNotification(user.id, formData.title, decisionId);
      }

      // Navigate to result page
      toast({
        title: "Analysis Complete!",
        description: isEditMode ? "Your decision has been updated and re-analyzed." : "Your decision has been analyzed.",
      });
      navigate(`/decisions/${decisionId}/result`);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });

      // Reset status if we have a decision ID
      if (currentDecisionId) {
        await updateDecisionStatus(currentDecisionId, "draft").catch(console.error);
      }
    } finally {
      setIsAnalyzing(false);
      setProgressMessage("");
    }
  };

  const handleSaveDraft = async () => {
    if (!currentDecisionId) {
      toast({
        title: "Error",
        description: "No decision to save.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      setProgressMessage("Saving changes...");
      await updateDecisionFull(currentDecisionId, formData);
      toast({
        title: "Saved",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setProgressMessage("");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContext
            title={formData.title}
            context={formData.context}
            onTitleChange={(title) => dispatch({ type: "SET_TITLE", payload: title })}
            onContextChange={(context) => dispatch({ type: "SET_CONTEXT", payload: context })}
          />
        );
      case 2:
        return (
          <StepOptions
            options={formData.options}
            onChange={(options) => dispatch({ type: "SET_OPTIONS", payload: options })}
          />
        );
      case 3:
        return (
          <StepCriteria
            criteria={formData.criteria}
            onChange={(criteria) => dispatch({ type: "SET_CRITERIA", payload: criteria })}
          />
        );
      case 4:
        return (
          <StepConstraints
            constraints={formData.constraints}
            onChange={(constraints) => dispatch({ type: "SET_CONSTRAINTS", payload: constraints })}
          />
        );
      case 5:
        return (
          <StepReview
            formData={formData}
            onEditStep={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 container py-8">
          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading decision...</p>
              </div>
            ) : (
              <>
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground font-medium flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    {isEditMode ? "Edit Decision" : "New Decision"}
                  </span>
                </nav>

                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{isEditMode ? "Edit Decision" : "Create New Decision"}</h1>
                      <p className="text-muted-foreground">
                        {isEditMode 
                          ? "Update your decision details and re-analyze with AI"
                          : "Walk through each step to structure your decision for AI analysis"
                        }
                      </p>
                    </div>
                    {!isEditMode && (
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setShowTemplateSelector(true)}
                      >
                        <FileText className="h-4 w-4" />
                        Use Template
                      </Button>
                    )}
                  </div>
                </div>

                {/* Step indicator */}
                <StepIndicator steps={steps} currentStep={currentStep} />

                {/* Step content */}
                <div className="mt-8 mb-8 animate-fade-in" key={currentStep}>
                  {renderStep()}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>

                  <div className="flex items-center gap-3">
                    {isEditMode && currentStep === steps.length && (
                      <Button
                        variant="outline"
                        onClick={handleSaveDraft}
                        disabled={isAnalyzing}
                        className="gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            {progressMessage || "Saving..."}
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    )}
                    {currentStep < steps.length ? (
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="gap-2"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !canProceed()}
                        className="gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            {progressMessage || "Analyzing..."}
                          </>
                        ) : (
                          <>
                            {isEditMode ? "Update & Analyze" : "Analyze with AI"}
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          onSelectTemplate={handleSelectTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
    </div>
  );
}
