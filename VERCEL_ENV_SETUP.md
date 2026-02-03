# 🚨 URGENT: Add These to Vercel Environment Variables

## The Problem
Your app is deployed but Vercel doesn't have the Clerk API keys, so authentication fails with 404 errors.

## The Solution
Add these environment variables to Vercel RIGHT NOW:

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your **desy** project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables (Copy-Paste Each One)

```
VITE_CLERK_PUBLISHABLE_KEY
pk_test_bW92ZWQtc3dpbmUtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA
```

```
CLERK_SECRET_KEY
sk_test_yCUsloRrdVeWwnkwtSSrp5KupnCBvNiTxwv88cGBcF
```

```
VITE_CLERK_SIGN_IN_URL
/login
```

```
VITE_CLERK_SIGN_UP_URL
/signup
```

```
VITE_CLERK_AFTER_SIGN_IN_URL
/dashboard
```

```
VITE_CLERK_AFTER_SIGN_UP_URL
/dashboard
```

### Step 3: Redeploy
1. After adding all variables, go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**
4. Wait 1-2 minutes for deployment to complete

### Step 4: Test
1. Go to: https://desy.vercel.app/login
2. Try logging in - should work now!

---

## Quick Copy-Paste Format for Vercel

If Vercel allows bulk import, use this format:

```
VITE_CLERK_PUBLISHABLE_KEY="pk_test_bW92ZWQtc3dpbmUtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA"
CLERK_SECRET_KEY="sk_test_yCUsloRrdVeWwnkwtSSrp5KupnCBvNiTxwv88cGBcF"
VITE_CLERK_SIGN_IN_URL="/login"
VITE_CLERK_SIGN_UP_URL="/signup"
VITE_CLERK_AFTER_SIGN_IN_URL="/dashboard"
VITE_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

---

## Why This Happens

- ✅ Your local `.env` file has the keys
- ❌ Vercel doesn't automatically read your `.env` file
- ❌ You must manually add environment variables to Vercel
- ✅ After adding them, redeploy to apply changes

---

## Verification

After redeploying, check:
1. Go to https://desy.vercel.app/login
2. Open browser console (F12)
3. Type: `console.log(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)`
4. Should show: `pk_test_bW92ZWQtc3dpbmUtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA`
5. If it shows `undefined`, the env vars aren't set correctly

---

**This is the ONLY thing preventing your app from working!**
