# Smart Bookmark Manager

A modern bookmark management application built with Next.js 14 (App Router), Supabase, and Tailwind CSS. Features real-time synchronization, Google OAuth authentication, and a clean, responsive interface.

## 🚀 Live Demo

[Live URL will be added after deployment]

## ✨ Features

- **Google OAuth Authentication**: Secure sign-in with Google (no email/password required)
- **Private Bookmarks**: Each user's bookmarks are completely private
- **Real-time Sync**: Bookmarks update instantly across all open tabs and devices
- **CRUD Operations**: Add and delete bookmarks with ease
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean interface built with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Authentication**: Google OAuth via Supabase Auth

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- A Google Cloud Console account for OAuth credentials
- A Vercel account for deployment

## 🔧 Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd bookmark-app
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` public key

3. Create the bookmarks table in Supabase:
   - Go to **SQL Editor**
   - Run the following SQL:

```sql
-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own bookmarks
CREATE POLICY "Users can view own bookmarks" 
  ON bookmarks FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own bookmarks
CREATE POLICY "Users can insert own bookmarks" 
  ON bookmarks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks" 
  ON bookmarks FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
```

4. Enable Google OAuth:
   - Go to **Authentication** → **Providers** → **Google**
   - Enable Google provider
   - Follow Supabase's instructions to create OAuth credentials in Google Cloud Console
   - Add your OAuth Client ID and Secret

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

6. Click **Deploy**

### Step 3: Update Supabase Redirect URLs

After deployment, add your Vercel URL to Supabase:

1. Go to your Supabase project
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/api/auth/callback`

### Step 4: Update Google OAuth

1. Go to Google Cloud Console
2. Navigate to your OAuth 2.0 Client
3. Add to **Authorized redirect URIs**:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `https://your-app.vercel.app/api/auth/callback`

## 🎯 How It Works

### Authentication Flow

1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. After approval, Google redirects to Supabase
4. Supabase creates/updates user record
5. User is redirected to `/api/auth/callback`
6. Callback route exchanges code for session
7. User is redirected to home page, now authenticated

### Real-time Updates

The app uses Supabase Realtime to listen for database changes:

```typescript
const channel = supabase
  .channel('bookmarks_changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'bookmarks',
  }, (payload) => {
    // Update local state when database changes
  })
  .subscribe()
```

When a bookmark is added or deleted in one tab, all other tabs receive the update instantly.

### Security

- **Row Level Security (RLS)**: Ensures users can only access their own bookmarks
- **Server-side Authentication**: All API routes verify user authentication
- **OAuth Flow**: Secure Google authentication via Supabase
- **Environment Variables**: Sensitive credentials stored securely

## 🐛 Problems Encountered and Solutions

### Problem 1: Real-time Updates Not Working Across Tabs

**Issue**: Initially, bookmarks weren't syncing in real-time across multiple browser tabs.

**Solution**: 
- Enabled the `bookmarks` table for Realtime in Supabase using:
  ```sql
  ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
  ```
- Added proper user_id filtering in the real-time subscription to only show updates for the current user
- Implemented duplicate checking when receiving INSERT events to prevent showing the same bookmark twice

### Problem 2: OAuth Redirect Loop

**Issue**: After Google authentication, users were getting stuck in a redirect loop.

**Solution**:
- Updated the callback route to properly handle the `code` parameter
- Added support for both local development and production environments
- Used the `x-forwarded-host` header for proper Vercel deployment redirects
- Set the correct redirect URL in both Google Cloud Console and Supabase

### Problem 3: Cookie Handling in Server Components

**Issue**: Supabase auth was not persisting properly in Next.js 14 App Router.

**Solution**:
- Created separate Supabase clients for browser and server contexts
- Implemented middleware to refresh auth sessions on each request
- Used the `@supabase/ssr` package for proper cookie handling
- Added proper error handling for Server Component cookie operations

### Problem 4: TypeScript Type Errors with Supabase

**Issue**: TypeScript was complaining about missing types for Supabase responses.

**Solution**:
- Defined proper interfaces for the `Bookmark` type
- Used Supabase's built-in TypeScript support
- Added explicit return types for all async functions
- Configured `tsconfig.json` with strict mode enabled

### Problem 5: Environment Variables Not Loading

**Issue**: Environment variables were undefined in production on Vercel.

**Solution**:
- Ensured all environment variables use the `NEXT_PUBLIC_` prefix for client-side access
- Added environment variables in Vercel dashboard under Project Settings
- Redeployed after adding environment variables
- Used the `!` non-null assertion operator for required environment variables

### Problem 6: Bookmark Deletion Race Condition

**Issue**: Sometimes clicking delete would fail or the UI wouldn't update immediately.

**Solution**:
- Implemented optimistic UI updates alongside database operations
- Added proper error handling and user feedback
- Used Supabase's real-time subscription to handle deletions from other tabs
- Added loading states to prevent duplicate delete requests

## 📁 Project Structure

```
bookmark-app/
├── app/
│   ├── api/
│   │   ├── auth/callback/
│   │   │   └── route.ts          # OAuth callback handler
│   │   └── bookmarks/
│   │       └── route.ts          # Bookmark CRUD API
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── BookmarkList.tsx          # Bookmark list with real-time
│   └── Header.tsx                # Header with auth
├── utils/
│   └── supabase/
│       ├── client.ts             # Browser Supabase client
│       ├── server.ts             # Server Supabase client
│       └── middleware.ts         # Auth middleware
├── middleware.ts                 # Next.js middleware
├── .env.local.example            # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🧪 Testing Checklist

- [ ] Sign in with Google works
- [ ] After sign in, redirected to home page with bookmarks section
- [ ] Can add a new bookmark (URL + title)
- [ ] Bookmark appears immediately after adding
- [ ] Open second tab - new bookmark appears there too
- [ ] Delete a bookmark in one tab
- [ ] Bookmark disappears from all tabs
- [ ] Cannot see other users' bookmarks
- [ ] Sign out works
- [ ] Sign back in - bookmarks are still there

## 📝 Notes

- This app uses Next.js 14 App Router (not Pages Router)
- Authentication is Google-only (no email/password option)
- All bookmarks are private to each user via Row Level Security
- Real-time sync works across all tabs and devices
- The app is optimized for Vercel deployment

## 🤝 Contributing

This is a demo project for a technical assessment. Feel free to fork and modify as needed.

## 📄 License

MIT
