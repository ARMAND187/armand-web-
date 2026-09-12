-- Kurdish Digital Archive - Initial Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Authors Table
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_kurdish TEXT NOT NULL,
    name_english TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    bio_kurdish TEXT,
    bio_english TEXT,
    birth_year VARCHAR(50),
    death_year VARCHAR(50),
    era TEXT,
    region TEXT,
    image_url TEXT,
    is_unknown_author BOOLEAN DEFAULT false,
    attribution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Sources Table
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_type TEXT NOT NULL,
    title TEXT,
    author TEXT,
    publisher TEXT,
    publication_year VARCHAR(50),
    page_number TEXT,
    url TEXT,
    notes TEXT,
    verification_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Works Table (Poems, Quotes, Proverbs, etc.)
CREATE TABLE works (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
    title_kurdish TEXT,
    title_english TEXT,
    slug TEXT UNIQUE,
    text_kurdish TEXT NOT NULL,
    text_english TEXT,
    type TEXT NOT NULL, -- 'poem', 'quote', 'proverb', etc.
    category TEXT,
    description_kurdish TEXT,
    description_english TEXT,
    meaning_kurdish TEXT,
    meaning_english TEXT,
    attribution_status TEXT DEFAULT 'Unknown',
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    source_platform TEXT,
    source_url TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Words Table
CREATE TABLE words (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word_kurdish TEXT NOT NULL,
    word_latin TEXT,
    slug TEXT UNIQUE NOT NULL,
    dialect TEXT,
    pronunciation TEXT,
    meaning_english TEXT NOT NULL,
    meaning_kurdish TEXT,
    literal_meaning TEXT,
    cultural_meaning TEXT,
    poetic_meaning TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tags Table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_kurdish TEXT NOT NULL,
    name_english TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- Work_Tags Junction Table
CREATE TABLE work_tags (
    work_id UUID REFERENCES works(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (work_id, tag_id)
);


-- =========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Free-Tier compatible security: Let anyone read, but restrict writes.
-- =========================================

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_tags ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all main tables
CREATE POLICY "Public authors are viewable by everyone." ON authors FOR SELECT USING (true);
CREATE POLICY "Public works are viewable by everyone." ON works FOR SELECT USING (true);
CREATE POLICY "Public sources are viewable by everyone." ON sources FOR SELECT USING (true);
CREATE POLICY "Public words are viewable by everyone." ON words FOR SELECT USING (true);
CREATE POLICY "Public tags are viewable by everyone." ON tags FOR SELECT USING (true);
CREATE POLICY "Public work_tags are viewable by everyone." ON work_tags FOR SELECT USING (true);

-- =========================================
-- INDEXES FOR PERFORMANCE (Phase 3 Prep)
-- =========================================
CREATE INDEX idx_works_type ON works(type);
CREATE INDEX idx_works_author_id ON works(author_id);
CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_words_slug ON words(slug);
