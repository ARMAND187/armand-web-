-- Phase 5: Community Submission & Moderation System

-- 1. Create Roles Table for Auth
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('contributor', 'reviewer', 'editor', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own role" ON user_roles FOR SELECT USING (auth.uid() = user_id);

-- 2. Create Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_type TEXT NOT NULL, -- 'quote', 'poem', 'proverb', 'word', 'correction'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'under_review', 'needs_information', 'approved', 'rejected'
    
    -- Core Content
    title_kurdish TEXT,
    title_english TEXT,
    text_kurdish TEXT,
    text_english TEXT,
    
    -- Attribution & Copyright
    author_name TEXT,
    author_id UUID REFERENCES authors(id),
    attribution_status TEXT DEFAULT 'unknown',
    copyright_status TEXT DEFAULT 'unknown',
    
    -- Context & Source
    category TEXT,
    dialect TEXT,
    source_description TEXT,
    source_url TEXT,
    context TEXT, -- Explanation / Evidence
    work_id UUID REFERENCES works(id), -- If it's a correction to an existing work
    
    -- Submitter Details
    submitter_name TEXT,
    submitter_email TEXT,
    submitter_user_id UUID REFERENCES auth.users(id),
    
    -- Review Details
    reviewer_id UUID REFERENCES auth.users(id),
    review_notes TEXT,
    rejection_reason TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone (including anonymous) can insert a submission
CREATE POLICY "Anyone can insert submissions" ON submissions 
FOR INSERT WITH CHECK (true);

-- Policy: Submitter can view their own submissions (if logged in)
CREATE POLICY "Submitter can view own submissions" ON submissions 
FOR SELECT USING (auth.uid() = submitter_user_id);

-- Policy: Reviewers/Admins can select, update, and manage all submissions
CREATE POLICY "Reviewers can manage submissions" ON submissions 
FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('reviewer', 'editor', 'admin'))
) WITH CHECK (
    auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('reviewer', 'editor', 'admin'))
);

-- Note: No policy is provided for DELETE. Submissions should be kept for audit trail.
