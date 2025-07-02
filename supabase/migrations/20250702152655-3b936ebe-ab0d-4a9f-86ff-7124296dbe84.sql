
-- Create orders table to store complete customer orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  billing_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_date DATE NOT NULL,
  comment TEXT,
  selected_box JSONB NOT NULL,
  selected_items JSONB NOT NULL,
  greeting_card JSONB,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'bank')),
  bank_slip_url TEXT,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Remove item_code column from items table since we're removing item codes
ALTER TABLE public.items DROP COLUMN IF EXISTS item_code;

-- Enable RLS for orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to orders (you may want to restrict this later)
CREATE POLICY "Allow public read access on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Create storage bucket for bank slips
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bank-slips', 'bank-slips', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for bank slips
CREATE POLICY "Public can upload bank slips" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'bank-slips');

CREATE POLICY "Public can view bank slips" ON storage.objects 
FOR SELECT USING (bucket_id = 'bank-slips');
