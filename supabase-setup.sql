-- Smart Bookmark Manager - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor

-- 1. Create the bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Policy: Users can view only their own bookmarks
CREATE POLICY "Users can view own bookmarks" 
  ON bookmarks FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Users can insert only their own bookmarks
CREATE POLICY "Users can insert own bookmarks" 
  ON bookmarks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update only their own bookmarks
CREATE POLICY "Users can update own bookmarks" 
  ON bookmarks FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy: Users can delete only their own bookmarks
CREATE POLICY "Users can delete own bookmarks" 
  ON bookmarks FOR DELETE 
  USING (auth.uid() = user_id);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS bookmarks_created_at_idx ON bookmarks(created_at DESC);

-- 5. Enable Realtime for the bookmarks table
-- This allows real-time subscriptions to work
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;

-- 6. Verify the setup
-- You should see the bookmarks table with RLS enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'bookmarks';

-- You should see 4 policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'bookmarks';
