import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Component that syncs Clerk authentication with Supabase
 * This ensures Supabase knows about the authenticated user
 */
export function SupabaseAuthSync({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const syncAuth = async () => {
      if (userId) {
        try {
          // Get Clerk's JWT token for Supabase
          const token = await getToken({ template: 'supabase' });
          
          if (token) {
            // Set the auth token for Supabase
            await supabase.auth.setSession({
              access_token: token,
              refresh_token: '', // Clerk handles refresh
            });
          }
        } catch (error) {
          console.error('Error syncing Clerk auth with Supabase:', error);
        }
      } else {
        // User is signed out, clear Supabase session
        await supabase.auth.signOut();
      }
    };

    syncAuth();
  }, [getToken, isLoaded, userId]);

  return <>{children}</>;
}
