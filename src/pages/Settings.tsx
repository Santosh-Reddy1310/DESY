import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Key,
  Trash2,
  Save,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser, useClerk } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const { toast } = useToast();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // Profile
    name: "",
    email: "",

    // Notifications
    emailNotifications: true,
    analysisComplete: true,
    weeklyDigest: false,

    // AI Preferences
    aiProvider: "groq",
    aiModel: "llama-3.1-70b-versatile",
  });

  // Load user data from Clerk
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const name = user.fullName || "";
        const email = user.primaryEmailAddress?.emailAddress || "";

        setSettings(prev => ({
          ...prev,
          name: name,
          email: email,
        }));

        // Load user preferences from a settings table if you have one
        // For now, we'll use localStorage as a fallback
        const savedPreferences = localStorage.getItem(`user_preferences_${user.id}`);
        if (savedPreferences) {
          const preferences = JSON.parse(savedPreferences);
          setSettings(prev => ({
            ...prev,
            ...preferences,
            name: name || prev.name,
            email: email || prev.email,
          }));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        toast({
          title: "Error",
          description: "Failed to load user settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [user, toast]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      // Update user metadata in Clerk
      const [firstName, ...lastNameParts] = settings.name.trim().split(" ");
      const lastName = lastNameParts.join(" ");

      await user.update({
        firstName: firstName || "",
        lastName: lastName || "",
      });

      // Save preferences to localStorage (or your settings table)
      const preferences = {
        emailNotifications: settings.emailNotifications,
        analysisComplete: settings.analysisComplete,
        weeklyDigest: settings.weeklyDigest,
        aiProvider: settings.aiProvider,
        aiModel: settings.aiModel,
      };
      localStorage.setItem(`user_preferences_${user.id}`, JSON.stringify(preferences));

      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      // Step 1: Try to call the RPC function to delete everything including auth account
      try {
        const { data, error: rpcError } = await supabase.rpc('delete_my_account');

        if (!rpcError && data?.success) {
          // Success! Account and data deleted
          console.log("Account deleted via RPC function");

          // Clear localStorage
          localStorage.removeItem(`user_preferences_${user.id}`);

          // Sign out
          await signOut();

          toast({
            title: "Account deleted",
            description: "Your account and all data have been permanently deleted.",
          });
          return;
        } else if (rpcError) {
          console.log("RPC function error:", rpcError);
          throw new Error("RPC function not available, using fallback");
        }
      } catch (rpcError) {
        console.log("RPC function not found, using fallback method");
      }

      // Fallback: If RPC function doesn't exist, just delete data
      // Step 2: Delete all user's decisions and related data
      const { error: decisionsError } = await supabase
        .from('decisions')
        .delete()
        .eq('user_id', user.id);

      if (decisionsError) throw decisionsError;

      // Step 3: Delete user preferences from localStorage
      localStorage.removeItem(`user_preferences_${user.id}`);

      // Step 4: Sign out the user
      await signOut();

      toast({
        title: "Data deleted",
        description: "Your data has been deleted. Note: You may need to contact support to fully delete your account.",
        duration: 5000,
      });
    } catch (error: any) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete account. Please try again.",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

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
                  <SettingsIcon className="h-8 w-8 text-primary" />
                  Settings
                </h1>
                <p className="text-muted-foreground max-w-lg">
                  Manage your account preferences and application settings
                </p>
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                size="lg"
                className="gap-2 shadow-lg shadow-primary/25"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 container py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>Profile Information</CardTitle>
                </div>
                <CardDescription>
                  Update your personal information and email address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={user?.id || ""}
                    disabled
                    className="bg-muted font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed. Contact support if you need to update it.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>Notifications</CardTitle>
                </div>
                <CardDescription>
                  Configure how you receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analysis Complete</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when AI analysis is complete
                    </p>
                  </div>
                  <Switch
                    checked={settings.analysisComplete}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, analysisComplete: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your decisions
                    </p>
                  </div>
                  <Switch
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, weeklyDigest: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Preferences */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  <CardTitle>AI Configuration</CardTitle>
                </div>
                <CardDescription>
                  Configure your AI provider and model preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-provider">AI Provider</Label>
                  <Select
                    value={settings.aiProvider}
                    onValueChange={(value) => setSettings({ ...settings, aiProvider: value })}
                  >
                    <SelectTrigger id="ai-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groq">Groq (Fast)</SelectItem>
                      <SelectItem value="openrouter">OpenRouter (Reliable)</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select
                    value={settings.aiModel}
                    onValueChange={(value) => setSettings({ ...settings, aiModel: value })}
                  >
                    <SelectTrigger id="ai-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llama-3.1-70b-versatile">LLaMA 3.1 70B</SelectItem>
                      <SelectItem value="llama-3.1-8b-instant">LLaMA 3.1 8B</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-destructive" />
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                </div>
                <CardDescription>
                  Irreversible actions that affect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                  <div className="space-y-0.5">
                    <Label className="text-destructive">Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="gap-2" disabled={isDeleting}>
                        {isDeleting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove all your data including decisions, options,
                          criteria, and constraints from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
