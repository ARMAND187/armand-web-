-- Phase 5.5: Users, Profiles & Performance Architecture

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Basic Constraints for Username & Bio
-- 1. Username length & safety (3-20 chars, alphanumeric and underscores only)
ALTER TABLE profiles ADD CONSTRAINT valid_username 
    CHECK (username ~ '^[a-zA-Z0-9_]{3,20}$');

-- 2. Reserved Names (prevent impersonation)
ALTER TABLE profiles ADD CONSTRAINT no_reserved_usernames 
    CHECK (LOWER(username) NOT IN ('admin', 'administrator', 'official', 'moderator', 'reviewer', 'support', 'system'));

-- 3. Bio Word Count (Hard limit of roughly 12 words by counting spaces + 1)
ALTER TABLE profiles ADD CONSTRAINT bio_length_limit 
    CHECK (bio IS NULL OR array_length(regexp_split_to_array(trim(bio), '\s+'), 1) <= 12);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public can read any profile
DROP POLICY IF EXISTS "Public can view profiles" ON profiles;
CREATE POLICY "Public can view profiles" ON profiles FOR SELECT USING (true);

-- Owners can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Owners can insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Performance Indexes for Phase 5.5 Architecture Optimization
CREATE INDEX IF NOT EXISTS idx_submissions_submitter_user_id ON submissions(submitter_user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
