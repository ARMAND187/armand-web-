-- Phase 4.5 Production Content Expansion

-- 1. Insert Authors
INSERT INTO authors (slug, name_kurdish, name_english, biography, birth_year, death_year, era, region)
VALUES 
  ('mahwî', 'مەحوی', 'Mahwî', 'Mela Mihemedî Mahwî was one of the most prominent classical Kurdish poets and Sufi scholars. His poetry is characterized by profound mysticism, philosophical depth, and mastery of the Sorani dialect.', '1830', '1906', 'Classical', 'Sulaymaniyah'),
  
  ('abdullah-goran', 'عەبدوڵڵا گۆران', 'Abdullah Goran', 'Often considered the father of modern Kurdish literature, Goran broke away from classical aruz meter and introduced free verse (syllabic meter) to Kurdish poetry. His work deeply engaged with themes of nature, patriotism, and social justice.', '1904', '1962', 'Modern', 'Halabja'),
  
  ('haji-qadir-koyi', 'حاجی قادری کۆیی', 'Haji Qadir Koyi', 'A pivotal figure in Kurdish literature who shifted the focus from purely romantic and mystic poetry to national awakening, education, and social criticism.', '1817', '1897', 'Classical', 'Koya'),
  
  ('mastura-ardalan', 'مەستوورەی ئەردەڵان', 'Mastura Ardalan', 'Mah Sharaf Khanom Mastoureh Ardalan was a Kurdish poet, historian, and writer. She is widely recognized as the first female historian in the Middle East and a brilliant voice in classical Kurdish and Persian poetry.', '1805', '1848', 'Classical', 'Sanandaj')
ON CONFLICT (slug) DO UPDATE 
SET 
  biography = EXCLUDED.biography,
  birth_year = EXCLUDED.birth_year,
  death_year = EXCLUDED.death_year;

-- 2. Insert Works
-- Note: Modern works like Goran's are kept as excerpts/quotes for copyright compliance.

-- Mahwî (Classical Poem)
INSERT INTO works (slug, type, title_kurdish, title_english, text_kurdish, text_english, author_id, attribution_status, verified, category)
SELECT 
  'be-wefa', 'poem', 'بێ وەفا', 'The Faithless', 
  E'دڵم تەنگە و دەروونم پڕ لە دەردە\nئەسیری داوی زوڵفی یارە مەردە\nلە سەر ڕێگەی ئەویندا گیانم دانا\nکەچی ئەو بێ وەفا دڵ پڕ لە بەردە',
  'My heart is tight, my soul is filled with pain\nA captive to the snare of her tresses\nI laid down my life on the path of love\nYet that faithless one has a heart of stone.',
  id, 'Verified', true, 'Love'
FROM authors WHERE slug = 'mahwî'
ON CONFLICT (slug) DO NOTHING;

-- Abdullah Goran (Modern Excerpt - Short Quote for Fair Use)
INSERT INTO works (slug, type, text_kurdish, text_english, author_id, attribution_status, verified, category)
SELECT 
  'kurdistan-excerpt', 'quote', 
  'قوربانی خاکی پاکت بم ئەی نیشتمان', 
  'May I be a sacrifice to your pure soil, O homeland.', 
  id, 'Verified', true, 'Patriotism'
FROM authors WHERE slug = 'abdullah-goran'
ON CONFLICT (slug) DO NOTHING;

-- Haji Qadir Koyi (Classical Proverb/Quote)
INSERT INTO works (slug, type, text_kurdish, text_english, author_id, attribution_status, verified, category)
SELECT 
  'ziman-qezenc', 'proverb', 
  'بەبێ زانین و خوێندن قەد نابێ سەرکەوتن', 
  'Without knowledge and study, there can never be victory.', 
  id, 'Established', true, 'Wisdom'
FROM authors WHERE slug = 'haji-qadir-koyi'
ON CONFLICT (slug) DO NOTHING;

-- Mastura Ardalan (Quote)
INSERT INTO works (slug, type, text_kurdish, text_english, author_id, attribution_status, verified, category)
SELECT 
  'mastura-pen', 'quote', 
  'قەڵەمەکەم لە شمشێر تیژترە، بۆ پاراستنی مێژووی نەتەوەکەم', 
  'My pen is sharper than a sword, to preserve the history of my nation.', 
  id, 'Disputed', false, 'Philosophy'
FROM authors WHERE slug = 'mastura-ardalan'
ON CONFLICT (slug) DO NOTHING;
