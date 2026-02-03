# 🚨 URGENT ACTION REQUIRED

## ⚠️ Your .env file was exposed in Git

**Status**: 🔴 CRITICAL  
**Action Required**: IMMEDIATE

---

## ✅ Step 1: Remove from Git (DONE)

The `.env` file has been removed from Git tracking.

---

## 🔴 Step 2: ROTATE ALL KEYS (DO THIS NOW!)

### Supabase Key (2 minutes)

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click Settings → API
4. Click "Reset" next to anon/public key
5. Copy the NEW key
6. Update your `.env` file:
   ```env
   VITE_SUPABASE_PUBLISHABLE_KEY=your_NEW_key_here
   ```

### Groq API Key (2 minutes)

1. Go to: https://console.groq.com
2. Click API Keys
3. Delete the old key
4. Create new key
5. Copy the NEW key
6. Update your `.env` file:
   ```env
   VITE_GROQ_API_KEY=your_NEW_key_here
   ```

---

## ✅ Step 3: Commit the Changes

```bash
git add .env
git commit -m "Security: Remove .env from repository"
git push origin main
```

---

## ✅ Step 4: Verify .env is Ignored

```bash
git status
# .env should NOT appear in the list
```

---

## ✅ Step 5: Update Deployment

If you've already deployed:

**Vercel:**
```bash
vercel env rm VITE_SUPABASE_PUBLISHABLE_KEY production
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
# Enter your NEW key

vercel env rm VITE_GROQ_API_KEY production
vercel env add VITE_GROQ_API_KEY production
# Enter your NEW key

vercel --prod
```

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Update both keys with NEW values
3. Redeploy

---

## ✅ Step 6: Test Everything

```bash
npm run dev
# Test login, decision creation, AI analysis
```

---

## 📋 Quick Checklist

- [ ] Rotated Supabase key
- [ ] Rotated Groq API key
- [ ] Updated local `.env` file
- [ ] Committed .env removal
- [ ] Pushed to repository
- [ ] Updated deployment environment variables
- [ ] Tested application

---

## ⏱️ Time Required: 10 minutes

**Don't delay - do this now to secure your application!**

---

## 📞 Need Help?

See [SECURITY_WARNING.md](SECURITY_WARNING.md) for detailed instructions.
