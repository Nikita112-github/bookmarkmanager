# Deployment Guide - Smart Bookmark Manager

This guide will walk you through deploying the Smart Bookmark Manager to Vercel with Supabase backend.

## Part 1: Supabase Setup (15 minutes)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click **New Project**
3. Fill in:
   - **Name**: bookmark-manager (or any name you prefer)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **Create new project**
5. Wait 2-3 minutes for the project to be ready

### Step 2: Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy the entire contents of `supabase-setup.sql` from this repo
4. Paste into the SQL editor
5. Click **Run** (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned" - this is correct!

### Step 3: Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use an existing one)
3. Enable the **Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click it and press **Enable**

4. Create OAuth 2.0 credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Name it: "Smart Bookmark Manager"
   - Under **Authorized redirect URIs**, add:
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
     (Replace `[YOUR-PROJECT-REF]` with your actual Supabase project reference - you can find this in your Supabase project URL)
   - Click **Create**
   - **Save the Client ID and Client Secret** - you'll need these!

5. Configure Google OAuth in Supabase:
   - Go to your Supabase dashboard
   - Navigate to **Authentication** → **Providers**
   - Find **Google** and toggle it **ON**
   - Enter your **Client ID** and **Client Secret** from Google Cloud Console
   - Click **Save**

### Step 4: Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these two values (you'll need them later):
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Part 2: GitHub Setup (5 minutes)

### Step 1: Initialize Git Repository

```bash
cd bookmark-app
git init
git add .
git commit -m "Initial commit - Smart Bookmark Manager"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it: `smart-bookmark-manager`
4. Keep it **Public** (required for submission)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/smart-bookmark-manager.git
git branch -M main
git push -u origin main
```

Refresh your GitHub repository page - you should see all the code!

## Part 3: Vercel Deployment (10 minutes)

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** → **Project**
3. Find your `smart-bookmark-manager` repository
4. Click **Import**

### Step 2: Configure the Project

1. **Framework Preset**: Should auto-detect as Next.js ✓
2. **Root Directory**: Leave as `./`
3. **Build Command**: `npm run build` (should be default)
4. **Output Directory**: `.next` (should be default)

### Step 3: Add Environment Variables

Click **Environment Variables** and add these two:

```
NEXT_PUBLIC_SUPABASE_URL = [your Supabase Project URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [your Supabase anon key]
```

**Important**: 
- Make sure to add these to **all environments** (Production, Preview, Development)
- Values should NOT have quotes around them
- Should look like: `https://abcdefgh.supabase.co` and `eyJhbGc...` (long string)

### Step 4: Deploy!

1. Click **Deploy**
2. Wait 2-3 minutes for the build to complete
3. You'll see "Congratulations!" when done
4. Click **Visit** to see your live site
5. Copy the URL - it will be something like: `https://smart-bookmark-manager.vercel.app`

## Part 4: Final Configuration (5 minutes)

### Update Supabase with Vercel URL

1. Go back to your Supabase dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Update these fields:
   - **Site URL**: `https://your-app.vercel.app` (your actual Vercel URL)
   - **Redirect URLs**: Add `https://your-app.vercel.app/api/auth/callback`
4. Click **Save**

### Update Google OAuth

1. Go back to Google Cloud Console
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add:
   ```
   https://your-app.vercel.app/api/auth/callback
   ```
5. Click **Save**

## Part 5: Testing (5 minutes)

### Test the Live Application

1. Open your Vercel URL in a browser
2. Click **Sign in with Google**
3. Authorize with your Google account
4. You should be redirected back to the app, signed in
5. Try adding a bookmark:
   - Title: "Google"
   - URL: "https://google.com"
6. Click **Add Bookmark**
7. Bookmark should appear immediately
8. Open the app in another tab - bookmark should appear there too!
9. Delete the bookmark - it should disappear from both tabs

### Test with Different Account

1. Open the app in an incognito/private window
2. Sign in with a different Google account
3. Add different bookmarks
4. Verify you CANNOT see the first account's bookmarks
5. Sign out

## Troubleshooting

### "Error: Invalid Redirect URI"

- Make sure you added ALL redirect URIs to Google Cloud Console:
  - `https://[project-ref].supabase.co/auth/v1/callback`
  - `https://your-app.vercel.app/api/auth/callback`

### "Error: Invalid Grant"

- Wait 5 minutes after updating Google OAuth settings
- Clear browser cookies and try again

### "Bookmarks not updating in real-time"

- Make sure you ran the full SQL script including:
  ```sql
  ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
  ```

### "Environment variables undefined"

- In Vercel dashboard, go to **Settings** → **Environment Variables**
- Make sure both variables are added
- **Redeploy** the project after adding them

### "Sign in works locally but not in production"

- Verify your Vercel URL is added to Supabase redirect URLs
- Verify your Vercel URL is added to Google OAuth redirect URIs
- Make sure there are no trailing slashes

## Submission Checklist

- [ ] Live Vercel URL is working
- [ ] Can sign in with Google
- [ ] Can add bookmarks
- [ ] Can delete bookmarks
- [ ] Real-time sync works (test with two tabs)
- [ ] Different users see different bookmarks
- [ ] GitHub repository is public
- [ ] README.md is complete with problems section

## Need Help?

If you encounter issues:

1. Check Vercel deployment logs: **Deployments** → Click on latest deployment → **Build Logs**
2. Check browser console for errors: Press F12 → **Console** tab
3. Check Supabase logs: **Logs** → **API Logs**

## Next Steps

Once deployed successfully:

1. Copy your live Vercel URL
2. Share the GitHub repository URL (make sure it's public)
3. Document any problems you encountered in the README.md

**Congratulations! Your app is now live! 🎉**
