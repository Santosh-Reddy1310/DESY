import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StepIndicator } from "@/components/wizard/StepIndicator";
import { StepContext } from "@/components/wizard/StepContext";
import { StepOptions } from "@/components/wizard/StepOptions";
import { StepCriteria } from "@/components/wizard/StepCriteria";
import { StepConstraints } from "@/components/wizard/StepConstraints";
import { StepReview } from "@/components/wizard/StepReview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DecisionFormData, Option, Criterion, Constraint } from "@/types/decision";

type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTEXT"; payload: string }
  | { type: "SET_OPTIONS"; payload: Option[] }
  | { type: "SET_CRITERIA"; payload: Criterion[] }
  | { type: "SET_CONSTRAINTS"; payload: Constraint[] };

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate("/decisions/demo/result");
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Decision</h1>
            <p className="text-muted-foreground">
              Walk through each step to structure your decision for AI analysis
            </p>
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
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze with AI
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
