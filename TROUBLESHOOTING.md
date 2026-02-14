# Troubleshooting Guide

This guide helps you fix common issues you might encounter.

---

## 🔧 Installation & Setup Issues

### Error: "npm: command not found"

**What it means**: Node.js/npm is not installed

**Fix**:
1. Go to [nodejs.org](https://nodejs.org)
2. Download and install the LTS version
3. Restart your terminal
4. Verify: `npm --version`

---

### Error: "git: command not found"

**What it means**: Git is not installed

**Fix**:
- **Windows**: Download from [git-scm.com](https://git-scm.com)
- **Mac**: Run `xcode-select --install` in Terminal
- **Linux**: Run `sudo apt-get install git`

---

### Error: "Module not found" or "Cannot find module"

**What it means**: Dependencies not installed

**Fix**:
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install

# Or if that doesn't work
npm cache clean --force
npm install
```

---

### Error: "Port 3000 is already in use"

**What it means**: Another app is using port 3000

**Fix**:

**Option 1 - Kill the process:**
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Windows (Command Prompt)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Option 2 - Use a different port:**
```bash
npm run dev -- -p 3001
```
Then open: http://localhost:3001

---

## 🔐 Authentication Issues

### Error: "Invalid Redirect URI"

**What it means**: Google doesn't recognize your redirect URL

**Fix - Check Google Cloud Console**:
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Click your OAuth Client ID
4. Under "Authorized redirect URIs", make sure you have:
   ```
   https://YOUR-PROJECT.supabase.co/auth/v1/callback
   http://localhost:3000/api/auth/callback
   https://your-app.vercel.app/api/auth/callback
   ```
5. Click SAVE
6. **Wait 5 minutes** for changes to take effect

**Fix - Check Supabase**:
1. Go to Supabase → Authentication → URL Configuration
2. Make sure Redirect URLs includes:
   ```
   http://localhost:3000/api/auth/callback
   https://your-app.vercel.app/api/auth/callback
   ```

---

### Error: "Access blocked: This app's request is invalid"

**What it means**: OAuth consent screen not configured or app not published

**Fix**:
1. Go to Google Cloud Console
2. APIs & Services → OAuth consent screen
3. Click **PUBLISH APP**
4. Confirm the publishing

---

### Error: "This app is blocked"

**What it means**: You're not added as a test user (if app is in testing mode)

**Fix**:
1. Go to Google Cloud Console
2. APIs & Services → OAuth consent screen
3. Scroll to "Test users"
4. Click **ADD USERS**
5. Add your email address
6. Click SAVE

**OR** publish the app (see previous error)

---

### Error: "Sign in works locally but not on Vercel"

**What it means**: Production URL not configured

**Fix**:
1. Get your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Add it to Google Cloud Console redirect URIs
3. Add it to Supabase redirect URLs
4. Wait 5 minutes
5. Try again

---

### Error: Stuck in redirect loop

**What it means**: Callback route not handling code exchange properly

**Fix**:
1. Check Vercel deployment logs for errors
2. Verify environment variables are set in Vercel
3. Clear browser cookies and try again
4. Check that `/api/auth/callback/route.ts` exists in your project

---

## 💾 Database Issues

### Error: "relation 'bookmarks' does not exist"

**What it means**: Database table not created

**Fix**:
1. Go to Supabase → SQL Editor
2. Open `supabase-setup.sql` from your project
3. Copy the entire contents
4. Paste in SQL Editor
5. Click RUN
6. Verify: Table Editor → Should see `bookmarks` table

---

### Error: "new row violates row-level security policy"

**What it means**: RLS policies are blocking the operation

**Fix**:
1. Go to Supabase → SQL Editor
2. Run:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'bookmarks';
   ```
3. Should see 3-4 policies
4. If not, run the full `supabase-setup.sql` again

---

### Error: Can see other users' bookmarks

**What it means**: RLS not working properly

**Fix**:
1. Go to Supabase → Table Editor → bookmarks
2. Check that "RLS enabled" shows "Yes"
3. If not, go to SQL Editor and run:
   ```sql
   ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
   ```
4. Recreate all policies from `supabase-setup.sql`

---

### Error: Real-time updates not working

**What it means**: Realtime not enabled for the table

**Fix**:
1. Go to Supabase → Database → Replication
2. Find `bookmarks` table
3. Toggle it ON (should turn green)
4. Or run in SQL Editor:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
   ```

---

## 🚀 Deployment Issues

### Error: Vercel build fails

**What it means**: Build errors in your code

**Fix**:
1. **Check locally first**:
   ```bash
   npm run build
   ```
2. If it fails locally, read the error message
3. Common issues:
   - TypeScript errors: `npx tsc --noEmit`
   - Missing dependencies: `npm install`
   - Import errors: Check file paths

4. Fix the error locally, commit, and push:
   ```bash
   git add .
   git commit -m "Fix build error"
   git push
   ```

---

### Error: "Environment variables are undefined"

**What it means**: Vercel doesn't have your environment variables

**Fix**:
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Click "Add New"
5. Add both variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Select all environments (Production, Preview, Development)
7. Click Save
8. **Redeploy**: Deployments → Click ⋯ menu → Redeploy

---

### Error: "Cannot find module '@supabase/ssr'"

**What it means**: Missing dependency

**Fix**:
```bash
npm install @supabase/ssr
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

---

### Error: Deployment succeeds but site shows 404

**What it means**: Vercel is looking in wrong directory

**Fix**:
1. Vercel dashboard → Your project → Settings
2. Check "Root Directory" is set to `./`
3. Check "Output Directory" is set to `.next`
4. Redeploy

---

## 🐛 Runtime Issues

### Error: "Failed to fetch" when adding bookmark

**What it means**: API call failing

**Fix**:
1. **Check browser console** (F12 → Console)
2. Look for the actual error
3. Common causes:
   - Not signed in: Sign in first
   - Network error: Check internet connection
   - API error: Check Vercel function logs

**Check Supabase logs**:
1. Supabase → Logs → API Logs
2. Look for errors when you try to add a bookmark

---

### Error: Bookmarks load slowly

**What it means**: Database query is slow or network issues

**Fix**:
1. Check Supabase region matches your location
2. Create indexes (should already be there from setup script):
   ```sql
   CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON bookmarks(user_id);
   CREATE INDEX IF NOT EXISTS bookmarks_created_at_idx ON bookmarks(created_at DESC);
   ```

---

### Error: "User not found" or "Invalid JWT"

**What it means**: Auth session expired or invalid

**Fix**:
1. Sign out
2. Clear browser cookies
3. Sign in again
4. If it persists, check Supabase auth logs

---

## 🎨 UI/Display Issues

### Error: Styles not loading

**What it means**: Tailwind CSS not compiling

**Fix**:
1. Restart dev server:
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```
2. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### Error: Components not updating

**What it means**: Browser caching old version

**Fix**:
1. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Try incognito/private window

---

## 🔍 Debugging Tips

### How to Check Vercel Logs

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click **Deployments** tab
4. Click on the latest deployment
5. Click **Build Logs** to see build errors
6. Click **Functions** to see runtime errors

### How to Check Supabase Logs

1. Go to your Supabase dashboard
2. Click **Logs** in sidebar
3. Select:
   - **API Logs**: For database errors
   - **Auth Logs**: For authentication errors
   - **Realtime Logs**: For real-time subscription errors

### How to Check Browser Console

1. Open your app
2. Press **F12** (or right-click → Inspect)
3. Click **Console** tab
4. Look for red error messages
5. Click on the error to expand and see details

### How to Test if Supabase is Working

Run this in your browser console (F12):
```javascript
fetch('https://YOUR-PROJECT.supabase.co/rest/v1/bookmarks', {
  headers: {
    'apikey': 'YOUR-ANON-KEY',
    'Authorization': 'Bearer YOUR-ANON-KEY'
  }
}).then(r => r.json()).then(console.log)
```

Should return empty array `[]` or list of bookmarks.

---

## 📊 Performance Issues

### Site is slow

**Check**:
1. Vercel region: Should be close to your users
2. Supabase region: Should be close to Vercel
3. Image optimization: Not an issue in this project
4. Too many bookmarks: Add pagination if 100+

**Fix**:
- Can't change regions after deployment
- Consider adding pagination for large lists

---

## 🔒 Security Issues

### Error: "CORS error"

**What it means**: Cross-Origin request blocked

**Fix**: This shouldn't happen in this project since we use Supabase client-side SDK. If you see it:
1. Check that you're using `createClient()` from `@/utils/supabase/client`
2. Check that environment variables are correct

---

### Error: "Invalid API key"

**What it means**: Wrong Supabase credentials

**Fix**:
1. Go to Supabase → Settings → API
2. Copy the **anon public** key again
3. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_ANON_KEY=the-correct-key
   ```
4. Restart dev server
5. For production, update Vercel environment variables and redeploy

---

## 💡 General Debugging Workflow

When something doesn't work:

1. **Read the error message** - It usually tells you what's wrong
2. **Check the browser console** - Press F12
3. **Check the network tab** - See if API calls are failing
4. **Test locally first** - Easier to debug than production
5. **Check logs**:
   - Vercel logs for deployment/runtime errors
   - Supabase logs for database errors
   - Browser console for client-side errors
6. **Google the error** - Someone has probably had this issue before
7. **Start fresh** - Sometimes rebuilding from scratch is fastest:
   ```bash
   rm -rf node_modules .next
   npm install
   npm run dev
   ```

---

## 🆘 Still Stuck?

1. **Read the error message again** - carefully this time
2. **Check all configuration**:
   - Environment variables
   - Google OAuth redirect URIs
   - Supabase redirect URLs
   - Database tables and policies
3. **Compare with working example**:
   - Check the original files in the project
   - Make sure you didn't accidentally change something
4. **Start over** (last resort):
   - Delete `.next` folder
   - Delete `node_modules`
   - Run `npm install`
   - Run `npm run dev`

---

## 📋 Configuration Checklist

Use this to verify everything is set up correctly:

**Supabase**:
- [ ] Project created
- [ ] `bookmarks` table exists
- [ ] RLS enabled on `bookmarks` table
- [ ] 3-4 RLS policies exist
- [ ] Realtime enabled for `bookmarks` table
- [ ] Google provider enabled
- [ ] Google Client ID and Secret added
- [ ] Redirect URLs configured

**Google Cloud**:
- [ ] Project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth client created
- [ ] All redirect URIs added
- [ ] App published (or test users added)

**Local Project**:
- [ ] Dependencies installed (`node_modules` exists)
- [ ] `.env.local` file exists
- [ ] Environment variables correct
- [ ] Can run `npm run dev` without errors
- [ ] Can access http://localhost:3000

**Vercel**:
- [ ] GitHub repo created and pushed
- [ ] Vercel project created
- [ ] Both environment variables added
- [ ] Deployment successful
- [ ] Can access live URL

**Google OAuth**:
- [ ] Supabase callback URI added
- [ ] Localhost callback URI added  
- [ ] Vercel callback URI added
- [ ] Client ID matches in Supabase

**Testing**:
- [ ] Can sign in locally
- [ ] Can add bookmarks locally
- [ ] Real-time works locally (2 tabs)
- [ ] Can sign in on production
- [ ] Can add bookmarks on production
- [ ] Real-time works on production
- [ ] Privacy works (tested with 2 accounts)

---

**If all checkboxes are ticked and it still doesn't work, there might be a propagation delay. Wait 5-10 minutes and try again.**

Good luck! 🍀
