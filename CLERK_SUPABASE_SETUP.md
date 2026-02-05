# Clerk + Supabase Integration Setup

## Problem
Clerk authentication is not being recognized by Supabase, causing 404 errors when querying the database.

## Solution
Configure Clerk to generate Supabase-compatible JWT tokens.

## Steps:

### 1. Configure Clerk JWT Template

1. Go to your Clerk Dashboard: https://dashboard.clerk.com
2. Select your application
3. Navigate to **JWT Templates** in the left sidebar
4. Click **New template**
5. Select **Supabase** from the templates
6. Name it: `supabase`
7. Set the following claims:

```json
{
  "aud": "authenticated",
  "exp": "{{user.created_at}}",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "role": "authenticated"
}
```

8. Set the **Signing Algorithm** to `HS256`
9. For **Signing Key**, use your Supabase JWT Secret:
   - Go to your Supabase Dashboard
   - Settings → API
   - Copy the **JWT Secret** (under "Project API keys")
   - Paste it in Clerk's JWT Template signing key field

10. Click **Save**

### 2. Update Environment Variables

Add to your `.env.local`:

```env
# Your existing Clerk key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Add your Supabase JWT Secret (from Supabase Dashboard → Settings → API)
VITE_SUPABASE_JWT_SECRET=your-jwt-secret-here
```

### 3. Test the Integration

1. Save all changes
2. Restart your development server
3. Sign out and sign back in to your application
4. The dashboard should now load without errors

## How It Works

1. User signs in with Clerk
2. `SupabaseAuthSync` component gets Clerk's JWT token using the 'supabase' template
3. Token is passed to Supabase client
4. Supabase recognizes the user as authenticated
5. RLS policies allow access to tables

## Troubleshooting

If you still get errors:

1. **Check JWT Template Name**: Must be exactly `supabase`
2. **Verify JWT Secret**: Must match between Clerk and Supabase
3. **Clear Browser Cache**: Hard refresh with Ctrl+Shift+R
4. **Check Console**: Look for "Error syncing Clerk auth with Supabase"
