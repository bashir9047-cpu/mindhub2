
-- Create resources table for London, ON services
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'mental_health', 'food', 'shelter', 'transportation', 'women_only'
  address TEXT,
  phone TEXT,
  hours TEXT,
  description TEXT,
  tags TEXT[],
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resources are publicly readable"
ON public.resources FOR SELECT USING (true);

-- Create user mood logs table
CREATE TABLE public.user_mood_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  mood_score INTEGER NOT NULL CHECK (mood_score BETWEEN 1 AND 5),
  mood_emoji TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_mood_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert mood logs"
ON public.user_mood_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read mood logs by session"
ON public.user_mood_logs FOR SELECT USING (true);

-- Create community posts table (read-only feed)
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Community posts are publicly readable"
ON public.community_posts FOR SELECT USING (true);
