-- Kurdish Digital Archive - Phase 3 Search Indexes
-- This uses pg_trgm for highly efficient wildcard and similarity searches,
-- which is perfect for Kurdish (since native stemming/dictionaries for Kurdish don't exist in standard PG).

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. Authors Search Indexes
CREATE INDEX IF NOT EXISTS idx_authors_name_kurdish_trgm ON authors USING GIN (name_kurdish gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_authors_name_english_trgm ON authors USING GIN (name_english gin_trgm_ops);

-- 2. Works Search Indexes (Titles & Text)
CREATE INDEX IF NOT EXISTS idx_works_title_kurdish_trgm ON works USING GIN (title_kurdish gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_works_title_english_trgm ON works USING GIN (title_english gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_works_text_kurdish_trgm ON works USING GIN (text_kurdish gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_works_text_english_trgm ON works USING GIN (text_english gin_trgm_ops);

-- 3. Words Search Indexes
CREATE INDEX IF NOT EXISTS idx_words_word_kurdish_trgm ON words USING GIN (word_kurdish gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_words_word_latin_trgm ON words USING GIN (word_latin gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_words_meaning_english_trgm ON words USING GIN (meaning_english gin_trgm_ops);
