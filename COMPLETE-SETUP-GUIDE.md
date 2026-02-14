# Complete Setup Guide - From Zero to Deployed

This guide assumes you're starting completely from scratch with no accounts or setup.

**Total Time**: 60-90 minutes  
**Difficulty**: Beginner-friendly

---

## Part 1: Account Setup (15 minutes)

### Step 1.1: Create a GitHub Account (5 min)

1. Go to [github.com](https://github.com)
2. Click **Sign up**
3. Enter your email, create a password, choose a username
4. Verify your email address
5. Complete the setup wizard (choose free plan)

**✓ You now have a GitHub account**

### Step 1.2: Create a Vercel Account (3 min)

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** (easiest option)
4. Authorize Vercel to access your GitHub
5. Complete the onboarding

**✓ You now have a Vercel account linked to GitHub**

### Step 1.3: Create a Supabase Account (3 min)

1. Go to [supabase.com](https://supabase.com)
2. Click **Start your project**
3. Click **Sign in with GitHub** (recommended)
4. Authorize Supabase

**✓ You now have a Supabase account**

### Step 1.4: Create a Google Cloud Account (4 min)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Sign in with your Google account
3. Accept the Terms of Service
4. Complete the account setup (no credit card needed for this project)

**✓ You now have a Google Cloud Console account**

---

## Part 2: Install Development Tools (10 minutes)

### Step 2.1: Install Node.js (5 min)

**Windows:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS version (left button)
3. Run the installer
4. Follow the installation wizard (use all defaults)
5. Open Command Prompt and verify:
   ```bash
   node --version
   npm --version
   ```
   (Should see version numbers like v20.x.x and 10.x.x)

**Mac:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS version
3. Open the .pkg file and install
4. Open Terminal and verify:
   ```bash
   node --version
   npm --version
   ```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

**✓ Node.js and npm are now installed**

### Step 2.2: Install Git (3 min)

**Windows:**
1. Go to [git-scm.com](https://git-scm.com)
2. Download Git for Windows
3. Run installer (use all defaults)
4. Open Command Prompt or Git Bash:
   ```bash
   git --version
   ```

**Mac:**
- Already installed! Verify in Terminal:
  ```bash
  git --version
  ```
- If not installed, run:
  ```bash
  xcode-select --install
  ```

**Linux:**
```bash
sudo apt-get install git
git --version
```

**✓ Git is now installed**

### Step 2.3: Install a Code Editor (2 min)

**VS Code (Recommended):**
1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download for your OS
3. Install using defaults
4. Open VS Code

**✓ You now have a code editor**

---

## Part 3: Download the Project (5 minutes)

### Option A: Using Git (Recommended)

1. **Download the project from GitHub** (once you have the repo URL):
   ```bash
   # Open Terminal (Mac/Linux) or Command Prompt (Windows)
   cd Desktop
   git clone https://github.com/YOUR-USERNAME/bookmark-app.git
   cd bookmark-app
   ```

### Option B: Using the Files I Created

1. **Extract the project folder** from wherever you saved it
2. Open Terminal/Command Prompt and navigate to it:
   ```bash
   # Windows
   cd C:\Users\YourName\Downloads\bookmark-app
   
   # Mac/Linux
   cd ~/Downloads/bookmark-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   (This will take 2-3 minutes)

**✓ Project is downloaded and dependencies are installed**

---

## Part 4: Set Up Supabase (15 minutes)

### Step 4.1: Create a Supabase Project (3 min)

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New project**
3. Fill in the form:
   - **Name**: `bookmark-manager`
   - **Database Password**: Click the generate button (SAVE THIS PASSWORD!)
   - **Region**: Choose closest to you (e.g., US West, Europe West)
   - **Pricing Plan**: Free
4. Click **Create new project**
5. **Wait 2-3 minutes** while it sets up (get a coffee ☕)

**✓ Supabase project is creating...**

### Step 4.2: Set Up the Database (5 min)

1. Once your project is ready, click **SQL Editor** in the left sidebar
2. Click **New query** button
3. Copy the ENTIRE contents of `supabase-setup.sql` from the project folder
4. Paste it into the SQL editor
5. Click **Run** (or press Ctrl/Cmd + Enter)
6. You should see: "Success. No rows returned" ✓

**Verify it worked:**
1. Click **Table Editor** in the left sidebar
2. You should see a table called `bookmarks`
3. Click on it - you'll see columns: id, user_id, url, title, created_at

**✓ Database is set up**

### Step 4.3: Get Your Supabase Credentials (2 min)

1. In Supabase, go to **Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. You'll see two important things:

   **Project URL** - Copy this (looks like: `https://abcdefgh.supabase.co`)
   
   **Project API keys** → **anon public** - Copy this (very long string starting with `eyJ...`)

4. **SAVE THESE SOMEWHERE SAFE** - you'll need them in a minute!

**✓ You have your Supabase credentials**

### Step 4.4: Enable Realtime (2 min)

1. Still in Supabase, go to **Database** in the left sidebar
2. Click **Replication** 
3. Look for the `bookmarks` table in the list
4. Toggle it **ON** (the switch should turn green)
5. Click **Save** if prompted

**✓ Realtime is enabled**

### Step 4.5: Configure Google OAuth in Supabase (3 min - we'll get credentials later)

1. Go to **Authentication** in the left sidebar
2. Click **Providers**
3. Find **Google** in the list
4. Toggle it **ON**
5. Leave this page open - we'll come back to fill in Client ID and Secret

**✓ Google provider is enabled (we'll configure it next)**

---

## Part 5: Set Up Google OAuth (15 minutes)

### Step 5.1: Create a Google Cloud Project (5 min)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown at the top (next to "Google Cloud")
3. Click **NEW PROJECT** (top right)
4. Fill in:
   - **Project name**: `bookmark-manager`
   - **Location**: Leave as default
5. Click **CREATE**
6. **Wait 30 seconds** for the project to be created
7. Click **SELECT PROJECT** when it's ready

**✓ Google Cloud project created**

### Step 5.2: Enable Google+ API (3 min)

1. In the Google Cloud Console, click the **hamburger menu** (☰) top left
2. Go to **APIs & Services** → **Library**
3. In the search box, type: `Google+ API`
4. Click on **Google+ API** in the results
5. Click **ENABLE**
6. Wait for it to enable (10 seconds)

**✓ Google+ API enabled**

### Step 5.3: Configure OAuth Consent Screen (4 min)

1. Click hamburger menu (☰) → **APIs & Services** → **OAuth consent screen**
2. Choose **External** (unless you have a Google Workspace)
3. Click **CREATE**
4. Fill in the form:
   - **App name**: `Smart Bookmark Manager`
   - **User support email**: Your email
   - **App logo**: Skip this
   - **Developer contact email**: Your email
5. Click **SAVE AND CONTINUE**
6. On "Scopes" page, click **SAVE AND CONTINUE** (don't add any)
7. On "Test users" page:
   - Click **ADD USERS**
   - Add your email address (the one you'll use for testing)
   - Add any other emails you want to test with
   - Click **ADD**
8. Click **SAVE AND CONTINUE**
9. Click **BACK TO DASHBOARD**

**✓ OAuth consent screen configured**

### Step 5.4: Create OAuth Credentials (3 min)

1. Click hamburger menu (☰) → **APIs & Services** → **Credentials**
2. Click **CREATE CREDENTIALS** at the top
3. Choose **OAuth client ID**
4. For Application type, choose **Web application**
5. Fill in:
   - **Name**: `Bookmark Manager Web Client`
   
6. Under **Authorized redirect URIs**, click **ADD URI** and add:
   ```
   https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
   ```
   
   **To find YOUR-PROJECT-REF:**
   - Go back to your Supabase dashboard
   - Look at the URL in your browser
   - It will be: `https://app.supabase.com/project/YOUR-PROJECT-REF`
   - Copy that part and replace in the URI above
   
   **Example**: If your Supabase URL is `https://abcdefgh.supabase.co`, add:
   ```
   https://abcdefgh.supabase.co/auth/v1/callback
   ```

7. Click **CREATE**
8. A popup appears with your credentials:
   - **Client ID** - Copy this
   - **Client Secret** - Copy this
   - **SAVE THESE SOMEWHERE SAFE!**

**✓ OAuth credentials created**

### Step 5.5: Add Credentials to Supabase (2 min)

1. Go back to your Supabase dashboard
2. Go to **Authentication** → **Providers** → **Google**
3. Paste in:
   - **Client ID** (from Google Cloud)
   - **Client Secret** (from Google Cloud)
4. Click **Save**

**✓ Google OAuth is fully configured!**

---

## Part 6: Configure Your Project (5 minutes)

### Step 6.1: Set Environment Variables (3 min)

1. Open the `bookmark-app` folder in VS Code:
   ```bash
   code .
   ```
   (Or File → Open Folder in VS Code)

2. Find the file `.env.local.example`
3. Make a copy and rename it to `.env.local` (remove the `.example`)
4. Open `.env.local` and replace with your values:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3...
   ```
   
   Replace with:
   - The **Project URL** from Step 4.3
   - The **anon public key** from Step 4.3

5. Save the file (Ctrl+S / Cmd+S)

**✓ Environment variables configured**

### Step 6.2: Configure Supabase Site URL (2 min)

1. Go to Supabase dashboard
2. Go to **Authentication** → **URL Configuration**
3. Set:
   - **Site URL**: `http://localhost:3000`
4. Under **Redirect URLs**, add:
   - `http://localhost:3000/api/auth/callback`
5. Click **Save**

**✓ Local development is configured**

---

## Part 7: Test Locally (10 minutes)

### Step 7.1: Start the Development Server (2 min)

1. Open Terminal in your project folder:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Ready in X.Xs
   ```

3. Open your browser and go to: [http://localhost:3000](http://localhost:3000)

**✓ App is running locally!**

### Step 7.2: Test Sign In (3 min)

1. Click **Sign in with Google**
2. Choose your Google account
3. You should see a Google authorization screen
4. Click **Continue** or **Allow**
5. You should be redirected back to the app
6. You should now be signed in! ✓

**If you get an error:**
- Check that you added your email to "Test users" in Google Cloud
- Check that the redirect URI matches in Google Cloud Console

**✓ Authentication works!**

### Step 7.3: Test Adding Bookmarks (2 min)

1. Fill in the form:
   - **Title**: `Google`
   - **URL**: `https://google.com`
2. Click **Add Bookmark**
3. The bookmark should appear below immediately ✓

Add a few more:
- Title: `GitHub`, URL: `https://github.com`
- Title: `Stack Overflow`, URL: `https://stackoverflow.com`

**✓ Adding bookmarks works!**

### Step 7.4: Test Real-time Sync (3 min)

1. Keep your current tab open (Tab A)
2. Open a NEW tab and go to [http://localhost:3000](http://localhost:3000) (Tab B)
3. You should automatically be signed in (same browser)
4. You should see all your bookmarks in Tab B ✓

Now the real test:
5. In Tab A, add a new bookmark:
   - Title: `Real-time Test`
   - URL: `https://example.com`
6. **Watch Tab B** - the bookmark should appear WITHOUT refreshing! ✓

Try deleting:
7. In Tab A, delete one bookmark
8. **Watch Tab B** - it should disappear immediately! ✓

**✓ Real-time sync works!**

**Congratulations! Your app works locally! 🎉**

---

## Part 8: Deploy to Vercel (15 minutes)

### Step 8.1: Create GitHub Repository (5 min)

1. Go to [github.com](https://github.com)
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name**: `smart-bookmark-manager`
   - **Description**: `A real-time bookmark manager with Google OAuth`
   - **Public** ✓ (must be public for submission)
   - **DO NOT** check any boxes below
4. Click **Create repository**

**✓ GitHub repository created**

### Step 8.2: Push Your Code to GitHub (4 min)

1. In your terminal (in the bookmark-app folder), run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Smart Bookmark Manager"
   git branch -M main
   ```

2. Copy the commands from GitHub under "push an existing repository":
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/smart-bookmark-manager.git
   git push -u origin main
   ```
   
   Replace `YOUR-USERNAME` with your actual GitHub username

3. Enter your GitHub credentials if prompted
4. Refresh your GitHub repository page - you should see all your code! ✓

**✓ Code is on GitHub**

### Step 8.3: Deploy to Vercel (6 min)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Find your `smart-bookmark-manager` repository
4. Click **Import**

5. **Configure the project:**
   - Framework Preset: **Next.js** (should auto-detect) ✓
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (leave as default)
   - Output Directory: `.next` (leave as default)

6. Click **Environment Variables** dropdown
7. Add your two variables:
   
   **First variable:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste your Supabase Project URL)
   - Environment: Production, Preview, Development (all checked)
   
   **Second variable:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste your Supabase anon key)
   - Environment: Production, Preview, Development (all checked)

8. Click **Deploy**
9. **Wait 2-3 minutes** for the build to complete
10. You'll see "Congratulations! 🎉"
11. Click **Visit** to see your live site
12. **COPY THE URL** - it will be something like:
    ```
    https://smart-bookmark-manager-abc123.vercel.app
    ```

**✓ Your app is now live!**

---

## Part 9: Final Configuration (10 minutes)

### Step 9.1: Update Supabase with Production URL (3 min)

1. Go to your Supabase dashboard
2. Go to **Authentication** → **URL Configuration**
3. Update:
   - **Site URL**: `https://your-app.vercel.app` (your actual Vercel URL)
4. Under **Redirect URLs**, add:
   - `https://your-app.vercel.app/api/auth/callback`
   
   **Keep the localhost ones too!**
   
5. Click **Save**

**✓ Supabase knows about your production URL**

### Step 9.2: Update Google OAuth (4 min)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Make sure you're in the `bookmark-manager` project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, click **ADD URI**
6. Add:
   ```
   https://your-app.vercel.app/api/auth/callback
   ```
   Replace with your actual Vercel URL
   
7. Click **SAVE**
8. **Wait 5 minutes** for changes to propagate

**✓ Google OAuth knows about your production URL**

### Step 9.3: Publish OAuth App (3 min)

1. Still in Google Cloud Console
2. Go to **APIs & Services** → **OAuth consent screen**
3. Click **PUBLISH APP**
4. Click **CONFIRM**

This moves your app from "Testing" to "In Production" so anyone can sign in.

**✓ OAuth app is published**

---

## Part 10: Test Production (10 minutes)

### Step 10.1: Basic Testing (5 min)

1. Open your Vercel URL in a browser:
   ```
   https://your-app.vercel.app
   ```

2. Click **Sign in with Google**
3. Choose your Google account
4. Click **Continue**
5. You should be redirected back and signed in ✓

6. Add a bookmark:
   - Title: `Production Test`
   - URL: `https://google.com`
7. Should appear immediately ✓

8. Delete it - should disappear ✓

**✓ Basic functionality works in production!**

### Step 10.2: Test Real-time (2 min)

1. Open your production URL in a new tab
2. Add a bookmark in one tab
3. Watch it appear in the other tab immediately ✓

**✓ Real-time works in production!**

### Step 10.3: Test Privacy (3 min)

1. Note what bookmarks you have
2. Open an **incognito/private window**
3. Go to your production URL
4. Sign in with a **DIFFERENT Google account**
5. You should NOT see the first account's bookmarks ✓
6. Add a test bookmark in this account
7. Go back to the first account - you should NOT see the second account's bookmark ✓

**✓ Privacy works!**

**Everything works! Your app is complete! 🎉🎉🎉**

---

## Part 11: Submission (5 minutes)

### What to Submit

You need to provide:

1. **Live Vercel URL**
   ```
   https://your-app.vercel.app
   ```

2. **Public GitHub Repository URL**
   ```
   https://github.com/YOUR-USERNAME/smart-bookmark-manager
   ```

3. **README with Problems Section**
   - Already included in the project! ✓

### Submission Template

```
Subject: Smart Bookmark Manager - Technical Assessment Submission

Hello,

Please find my submission for the Smart Bookmark Manager project:

📱 Live Application: https://your-app.vercel.app
💻 GitHub Repository: https://github.com/YOUR-USERNAME/smart-bookmark-manager

All requirements have been successfully implemented:
✅ Google OAuth authentication (no email/password)
✅ Add bookmarks with URL and title
✅ Private bookmarks per user (Row Level Security)
✅ Real-time synchronization across tabs
✅ Delete bookmarks functionality
✅ Deployed on Vercel

The README.md includes a comprehensive "Problems Encountered and Solutions" section documenting the challenges faced during development.

You can test the application by:
1. Signing in with any Google account
2. Adding/deleting bookmarks
3. Opening in multiple tabs to verify real-time sync
4. Testing with multiple Google accounts to verify privacy

Thank you for the opportunity!

Best regards,
[Your Name]
```

---

## 🎉 Congratulations!

You've successfully:
- ✅ Set up all required accounts
- ✅ Installed all development tools
- ✅ Configured Supabase with database and auth
- ✅ Set up Google OAuth
- ✅ Tested locally
- ✅ Deployed to Vercel
- ✅ Tested in production
- ✅ Ready to submit!

---

## 🆘 Troubleshooting

### Common Issues and Fixes

**Issue: "npm: command not found"**
- Solution: Install Node.js from nodejs.org

**Issue: "git: command not found"**
- Solution: Install Git from git-scm.com

**Issue: "Invalid redirect URI" when signing in**
- Solution: Make sure ALL redirect URIs are added to Google Cloud Console:
  - `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
  - `http://localhost:3000/api/auth/callback`
  - `https://your-app.vercel.app/api/auth/callback`

**Issue: "This app is blocked" from Google**
- Solution: Make sure you published the OAuth app in Google Cloud Console

**Issue: Real-time not working**
- Solution: Check that you ran `ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;` in Supabase

**Issue: Can see other users' bookmarks**
- Solution: Check that RLS policies are enabled in Supabase (Table Editor → bookmarks → RLS enabled)

**Issue: Environment variables not working on Vercel**
- Solution: 
  1. Go to Vercel dashboard → Your project → Settings → Environment Variables
  2. Make sure both variables are there
  3. Redeploy: Deployments tab → Click ⋯ → Redeploy

**Issue: Build fails on Vercel**
- Solution: Run `npm run build` locally first to see the error

### Getting Help

1. **Check browser console**: Press F12 → Console tab
2. **Check Vercel logs**: Deployments → Click on deployment → Build Logs
3. **Check Supabase logs**: Logs → API Logs
4. **Read the error message carefully** - it usually tells you what's wrong!

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**You're all set! Good luck with your submission! 🚀**

If you get stuck at any point, refer back to this guide or check the TESTING.md file for testing scenarios.
