# Quick Start - Local Development

Follow these steps to get the app running locally in under 10 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- A Supabase account (free)
- A Google Cloud account (free)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
3. Go to **Settings** → **API** and copy:
   - Project URL
   - anon public key

## Step 3: Configure Google OAuth

### In Google Cloud Console:

1. Create a new project
2. Enable Google+ API
3. Create OAuth 2.0 credentials (Web application)
4. Add redirect URI: `https://[YOUR-PROJECT].supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret

### In Supabase:

1. Go to **Authentication** → **Providers** → **Google**
2. Toggle ON and enter your Client ID and Secret
3. Add these redirect URLs in **URL Configuration**:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/api/auth/callback`

## Step 4: Set Environment Variables

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 5: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing Real-time Features

1. Open the app in two browser tabs
2. Sign in with Google
3. Add a bookmark in one tab
4. Watch it appear instantly in the other tab!

## Common Issues

### "Failed to sign in with Google"

- Make sure you added `http://localhost:3000/api/auth/callback` to Google OAuth redirect URIs
- Clear browser cookies and try again

### "Bookmarks not showing"

- Check browser console for errors
- Verify RLS policies are set up correctly in Supabase
- Make sure you ran the full SQL setup script

### "Real-time not working"

- Ensure you ran: `ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;`
- Check if the table appears in **Database** → **Replication** in Supabase

## Next Steps

Once local development is working:
1. Follow `DEPLOYMENT.md` to deploy to Vercel
2. Test the production deployment
3. Document any issues in README.md

Happy coding! 🚀
