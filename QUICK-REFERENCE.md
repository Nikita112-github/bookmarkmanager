# Quick Reference - Commands & URLs

This is a one-page reference for all the commands and URLs you'll need.

## 📦 Installation

```bash
# Clone and install
git clone <your-repo-url>
cd bookmark-app
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run locally
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🗄️ Supabase Setup Commands

```sql
-- Run this in Supabase SQL Editor

-- 1. Create table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Enable RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- 4. Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
```

## 🔐 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🌐 Important URLs

### Supabase
- Dashboard: https://app.supabase.com/projects
- Project URL: https://YOUR-PROJECT.supabase.co
- API Settings: Settings → API
- Auth Providers: Authentication → Providers
- SQL Editor: SQL Editor (left sidebar)
- Realtime: Database → Replication

### Google Cloud Console
- Console: https://console.cloud.google.com
- APIs & Services: Navigation → APIs & Services
- Credentials: APIs & Services → Credentials
- OAuth Consent: APIs & Services → OAuth consent screen

### Vercel
- Dashboard: https://vercel.com/dashboard
- New Project: Add New → Project
- Environment Variables: Settings → Environment Variables
- Deployments: Deployments tab
- Logs: Click on deployment → Build Logs

### GitHub
- New Repo: https://github.com/new
- Your Repos: https://github.com/YOUR-USERNAME?tab=repositories

## 🔗 OAuth Redirect URIs

Add these to Google Cloud Console → Credentials → OAuth 2.0 Client:

```
# Local Development
http://localhost:3000/api/auth/callback

# Supabase (REQUIRED)
https://YOUR-PROJECT.supabase.co/auth/v1/callback

# Production (After Vercel deployment)
https://your-app.vercel.app/api/auth/callback
```

## 📝 Git Commands

```bash
# Initialize repo
git init
git add .
git commit -m "Initial commit - Smart Bookmark Manager"
git branch -M main

# Connect to GitHub
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# Later updates
git add .
git commit -m "Description of changes"
git push
```

## 🚀 Vercel Deployment

```bash
# Via GitHub (Recommended)
# 1. Push code to GitHub
# 2. Go to vercel.com
# 3. Import repository
# 4. Add environment variables
# 5. Deploy

# Via Vercel CLI (Alternative)
npm i -g vercel
vercel login
vercel
vercel --prod
```

## 🧪 Testing URLs

```bash
# Local
http://localhost:3000

# Production
https://your-app.vercel.app

# API endpoints (test with Postman or curl)
GET  /api/bookmarks
POST /api/bookmarks
DELETE /api/bookmarks?id=<bookmark-id>
```

## 🔍 Debugging Commands

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Check build locally
npm run build
```

## 📊 Supabase SQL Queries (Debugging)

```sql
-- Check if table exists
SELECT * FROM bookmarks LIMIT 5;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'bookmarks';

-- Check realtime publication
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';

-- Count bookmarks per user
SELECT user_id, COUNT(*) FROM bookmarks GROUP BY user_id;

-- Delete all bookmarks (careful!)
DELETE FROM bookmarks;
```

## 🛠️ Common Fixes

```bash
# Fix: Port 3000 already in use
lsof -ti:3000 | xargs kill

# Fix: Cannot find module
npm install

# Fix: TypeScript errors
npm install --save-dev @types/node @types/react @types/react-dom

# Fix: Outdated packages
npm update
```

## 📞 Where to Get Help

1. **Supabase Issues**: Check Supabase logs (API Logs)
2. **Vercel Issues**: Check deployment logs
3. **Google OAuth**: Check Google Cloud Console errors
4. **Code Issues**: Check browser console (F12)
5. **Database Issues**: Check Supabase SQL Editor

## 🎯 Quick Test Scenarios

```bash
# Test 1: Local Authentication
1. npm run dev
2. Open http://localhost:3000
3. Click "Sign in with Google"
4. Should redirect and sign in

# Test 2: Add Bookmark
1. Sign in
2. Add: Title="Google", URL="https://google.com"
3. Should appear immediately

# Test 3: Real-time
1. Open two tabs
2. Add bookmark in tab 1
3. Should appear in tab 2 instantly

# Test 4: Privacy
1. Sign in with Account A
2. Add bookmarks
3. Sign out
4. Sign in with Account B (incognito)
5. Should NOT see Account A's bookmarks
```

## 📋 Pre-Submission Checklist

```
Before submitting:
□ npm run build (no errors)
□ Live URL works
□ Can sign in with Google
□ Can add bookmarks
□ Real-time sync works (tested with 2 tabs)
□ Privacy works (tested with 2 accounts)
□ GitHub repo is public
□ README has problems section
```

## 🔗 Key Files to Edit

```
Must configure:
- .env.local (environment variables)
- Google Cloud Console (OAuth credentials)
- Supabase (database + auth)
- Vercel (deployment + env vars)

Should NOT edit:
- node_modules/ (auto-generated)
- .next/ (auto-generated)
- package-lock.json (auto-generated)
```

## 💡 Pro Tips

```bash
# Run build before pushing to GitHub
npm run build

# Test production build locally
npm run build && npm start

# Clear Next.js cache if issues
rm -rf .next

# Format code (if using Prettier)
npx prettier --write .
```

---

**Save this file for quick reference during setup and deployment!**
