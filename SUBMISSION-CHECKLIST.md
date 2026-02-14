# Submission Checklist

Use this checklist before submitting your project.

## 📋 Pre-Deployment Checklist

### Supabase Setup
- [ ] Created Supabase project
- [ ] Ran `supabase-setup.sql` in SQL Editor
- [ ] Verified bookmarks table exists
- [ ] Verified RLS policies are active (4 policies)
- [ ] Enabled Realtime for bookmarks table
- [ ] Configured Google OAuth provider
- [ ] Saved Supabase Project URL
- [ ] Saved Supabase anon key

### Google Cloud Console
- [ ] Created OAuth 2.0 credentials
- [ ] Added Supabase redirect URI
- [ ] Saved Client ID
- [ ] Saved Client Secret
- [ ] Enabled Google+ API

### GitHub
- [ ] Created public repository
- [ ] Pushed all code to main branch
- [ ] Repository is accessible (test in incognito)
- [ ] README.md is complete
- [ ] All files are committed

### Vercel
- [ ] Connected GitHub repository
- [ ] Added both environment variables
- [ ] Deployment successful
- [ ] Live URL is accessible
- [ ] No build errors

## 📋 Post-Deployment Checklist

### Configuration Updates
- [ ] Added Vercel URL to Supabase Site URL
- [ ] Added Vercel callback URL to Supabase Redirect URLs
- [ ] Added Vercel callback URL to Google OAuth

### Functionality Testing
- [ ] Can access the live URL
- [ ] "Sign in with Google" button appears
- [ ] Can sign in successfully
- [ ] Redirects back to app after sign-in
- [ ] Can add a bookmark
- [ ] Bookmark appears immediately
- [ ] Can delete a bookmark
- [ ] Bookmark disappears immediately

### Real-time Testing
- [ ] Opened app in two tabs
- [ ] Added bookmark in Tab 1
- [ ] Bookmark appeared in Tab 2 (no refresh)
- [ ] Deleted bookmark in Tab 1
- [ ] Bookmark disappeared from Tab 2 (no refresh)

### Privacy Testing
- [ ] Signed in with Account A
- [ ] Added test bookmarks
- [ ] Signed out
- [ ] Signed in with Account B (incognito window)
- [ ] Account A's bookmarks NOT visible
- [ ] Account B can add own bookmarks

### Mobile Testing
- [ ] Opened on mobile device
- [ ] Layout looks good
- [ ] Can sign in on mobile
- [ ] Can add bookmarks on mobile
- [ ] Can delete bookmarks on mobile

## 📋 Documentation Checklist

### README.md Must Include:
- [ ] Project title and description
- [ ] Features list
- [ ] Tech stack
- [ ] Setup instructions
- [ ] Deployment instructions
- [ ] **Problems encountered section**
- [ ] **Solutions to problems section**
- [ ] How to test locally
- [ ] Live URL (after deployment)
- [ ] GitHub URL

### Code Quality
- [ ] No commented-out code
- [ ] No console.logs in production
- [ ] TypeScript types are correct
- [ ] No TypeScript errors
- [ ] Components are well-organized
- [ ] Code is readable and clean

## 📋 Submission Requirements

### Required Items:
- [ ] Live Vercel URL that works
- [ ] Public GitHub repository URL
- [ ] README.md with problems/solutions

### To Submit:
```
Live URL: https://your-app.vercel.app
GitHub: https://github.com/username/smart-bookmark-manager
```

## 🧪 Final Manual Test

Run through this test scenario one more time:

1. **Open the live URL**
   - [ ] Page loads without errors
   - [ ] See the landing page with "Sign in with Google"

2. **Sign in**
   - [ ] Click "Sign in with Google"
   - [ ] Select your Google account
   - [ ] Authorize the app
   - [ ] Redirected back to the app
   - [ ] See your email in the header

3. **Add bookmarks**
   - [ ] Add bookmark: "Test 1" - "https://google.com"
   - [ ] Bookmark appears immediately
   - [ ] Add bookmark: "Test 2" - "https://github.com"
   - [ ] Both bookmarks visible

4. **Test real-time**
   - [ ] Open second tab with same URL
   - [ ] Add bookmark in Tab 1: "Real-time Test" - "https://example.com"
   - [ ] Bookmark appears in Tab 2 without refresh

5. **Test delete**
   - [ ] Delete "Test 1" in Tab 1
   - [ ] Bookmark disappears from Tab 2 immediately

6. **Test privacy**
   - [ ] Open incognito window
   - [ ] Go to the live URL
   - [ ] Sign in with different Google account
   - [ ] Verify previous bookmarks are NOT visible

7. **Sign out**
   - [ ] Click "Sign Out"
   - [ ] Redirected to landing page
   - [ ] Bookmarks section hidden

## ⚠️ Common Last-Minute Issues

### Issue: "Invalid Redirect URI"
- **Check**: Google Cloud Console redirect URIs
- **Fix**: Add `https://your-app.vercel.app/api/auth/callback`

### Issue: "Environment variables undefined"
- **Check**: Vercel environment variables
- **Fix**: Add both variables and redeploy

### Issue: Real-time not working
- **Check**: Supabase Realtime settings
- **Fix**: Run `ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;`

### Issue: Can see other users' bookmarks
- **Check**: RLS policies in Supabase
- **Fix**: Verify policies are enabled and correct

### Issue: Deployment failed
- **Check**: Vercel build logs
- **Common fixes**:
  - Ensure `npm run build` works locally
  - Check for TypeScript errors
  - Verify all imports are correct

## ✅ Ready to Submit When:

All of these are TRUE:
- [ ] Live URL works perfectly
- [ ] Can sign in with Google
- [ ] Can add bookmarks
- [ ] Can delete bookmarks
- [ ] Real-time sync works
- [ ] Privacy works (tested with 2 accounts)
- [ ] GitHub repo is public
- [ ] README has problems section
- [ ] No critical bugs

## 📧 Submission Template

```
Subject: Smart Bookmark Manager - Submission

Hello,

Please find my submission for the Smart Bookmark Manager project:

Live Vercel URL: https://your-app.vercel.app
GitHub Repository: https://github.com/username/smart-bookmark-manager

All requirements have been met:
✓ Google OAuth authentication
✓ Add bookmarks (URL + title)
✓ Private bookmarks per user
✓ Real-time sync across tabs
✓ Delete functionality
✓ Deployed on Vercel

The README includes a detailed "Problems Encountered" section.

Thank you!
```

## 🎉 Final Checklist Summary

Before clicking submit:
- [ ] I have tested the live URL myself
- [ ] I have tested with a second Google account
- [ ] I have tested real-time sync with two tabs
- [ ] I have read through my README
- [ ] I have documented the problems I encountered
- [ ] The GitHub repository is public
- [ ] All features work as expected

**If all boxes are checked, you're ready to submit! Good luck! 🚀**
