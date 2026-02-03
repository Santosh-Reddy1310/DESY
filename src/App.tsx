import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import { AuthProvider } from "@/contexts/ClerkAuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NewDecision from "./pages/NewDecision";
import DecisionResult from "./pages/DecisionResult";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkProvider 
          publishableKey={CLERK_PUBLISHABLE_KEY}
          signInUrl="/login"
          signUpUrl="/signup"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route
                path="/login/*"
                element={
                  <div className="min-h-screen flex items-center justify-center bg-background">
                    <SignIn 
                      routing="path" 
                      path="/login" 
                      signUpUrl="/signup"
                      afterSignInUrl="/dashboard"
                    />
                  </div>
                }
              />
              <Route
                path="/signup/*"
                element={
                  <div className="min-h-screen flex items-center justify-center bg-background">
                    <SignUp 
                      routing="path" 
                      path="/signup" 
                      signInUrl="/login"
                      afterSignUpUrl="/dashboard"
                    />
                  </div>
                }
              />
              <Route path="/forgot-password" element={<Navigate to="/login" replace />} />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/decisions/new"
                element={
                  <ProtectedRoute>
                    <NewDecision />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/decisions/:id"
                element={
                  <ProtectedRoute>
                    <NewDecision />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/decisions/:id/result"
                element={
                  <ProtectedRoute>
                    <DecisionResult />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </ClerkProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
