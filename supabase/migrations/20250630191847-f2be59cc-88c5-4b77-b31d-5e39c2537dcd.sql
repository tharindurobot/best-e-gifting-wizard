
-- Create boxes table
CREATE TABLE public.boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  paper_fills BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create items table
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  item_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create greeting cards table
CREATE TABLE public.greeting_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create paper colors table
CREATE TABLE public.paper_colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create box fills table
CREATE TABLE public.box_fills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  is_free BOOLEAN DEFAULT true,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security (making tables public for now since this is a gift box ordering app)
ALTER TABLE public.boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.greeting_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.box_fills ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for public access (suitable for a product catalog)
CREATE POLICY "Allow public read access on boxes" ON public.boxes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on items" ON public.items FOR SELECT USING (true);
CREATE POLICY "Allow public read access on greeting_cards" ON public.greeting_cards FOR SELECT USING (true);
CREATE POLICY "Allow public read access on paper_colors" ON public.paper_colors FOR SELECT USING (true);
CREATE POLICY "Allow public read access on box_fills" ON public.box_fills FOR SELECT USING (true);

-- Insert default paper colors
INSERT INTO public.paper_colors (name, color_code) VALUES
  ('Red', '#FF0000'),
  ('Blue', '#0000FF'),
  ('Green', '#008000'),
  ('Yellow', '#FFFF00'),
  ('Purple', '#800080'),
  ('Orange', '#FFA500'),
  ('Pink', '#FFC0CB'),
  ('Black', '#000000'),
  ('White', '#FFFFFF'),
  ('Brown', '#A52A2A'),
  ('Gold', '#FFD700'),
  ('Silver', '#C0C0C0'),
  ('Turquoise', '#40E0D0'),
  ('Lime', '#00FF00'),
  ('Magenta', '#FF00FF'),
  ('Navy', '#000080'),
  ('Coral', '#FF7F50'),
  ('Lavender', '#E6E6FA'),
  ('Mint', '#98FB98'),
  ('Peach', '#FFCBA4');
