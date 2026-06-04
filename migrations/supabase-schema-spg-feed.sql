-- SPG FEED Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the SPG FEED program tables

-- Products table
CREATE TABLE IF NOT EXISTS spg_feed_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  customer_item_number TEXT NOT NULL UNIQUE,
  school_meals_per_purchase INTEGER NOT NULL,
  price DECIMAL(10, 2) DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS spg_feed_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT,
  shipping_address TEXT NOT NULL,
  shipping_address2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'USA',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS spg_feed_order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES spg_feed_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES spg_feed_products(id),
  product_name TEXT NOT NULL,
  customer_item_number TEXT,
  school_meals INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_spg_feed_orders_email ON spg_feed_orders(email);
CREATE INDEX IF NOT EXISTS idx_spg_feed_orders_order_number ON spg_feed_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_spg_feed_order_items_order_id ON spg_feed_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_spg_feed_products_sku ON spg_feed_products(customer_item_number);

-- Row Level Security
ALTER TABLE spg_feed_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE spg_feed_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE spg_feed_order_items ENABLE ROW LEVEL SECURITY;

-- Policies: public read products, insert/select orders
CREATE POLICY "spg_feed_products are viewable by everyone"
  ON spg_feed_products FOR SELECT
  USING (true);

CREATE POLICY "spg_feed_orders are insertable"
  ON spg_feed_orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "spg_feed_orders are viewable by everyone"
  ON spg_feed_orders FOR SELECT
  USING (true);

CREATE POLICY "spg_feed_order_items are insertable"
  ON spg_feed_order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "spg_feed_order_items are viewable by everyone"
  ON spg_feed_order_items FOR SELECT
  USING (true);

-- Seed 6 FEED tote products (run once; skip if rows already exist)
INSERT INTO spg_feed_products (name, description, thumbnail_url, customer_item_number, school_meals_per_purchase)
VALUES
  (
    'FEED Organic Cotton Convention Tote & FEED Organix Cotton Pouch',
    'Convention tote with organic cotton pouch. Each purchase helps provide school meals for children worldwide.',
    '/images/FEED_Item1.jpg',
    'SPG-FEED-001',
    6
  ),
  (
    'FEED Organic Cotton Book Tote & Feed Cotton Organic Pouch',
    'Book tote with organic cotton pouch. Each purchase helps provide school meals for children worldwide.',
    '/images/FEED_Item2.jpg',
    'SPG-FEED-002',
    8
  ),
  (
    'FEED Organic Cotton Shopper Tote & FEED Cotton Organic Pouch',
    'Shopper tote with organic cotton pouch. Each purchase helps provide school meals for children worldwide.',
    '/images/FEED_Item3.jpg',
    'SPG-FEED-003',
    8
  ),
  (
    'FEED Organic Cotton Crossbody',
    'Organic cotton crossbody bag. Each purchase helps provide school meals for children worldwide.',
    '/images/FEED_Item4.jpg',
    'SPG-FEED-004',
    3
  ),
  (
    'FEED Organic Cotton Zippered Tote',
    'Zippered organic cotton tote. Each purchase helps provide school meals for children worldwide.',
    '/images/FEED_Item5.jpg',
    'SPG-FEED-005',
    5
  ),
  (
    'FEED Organic Cotton Rivet Tote',
    'Rivet organic cotton tote. Each purchase helps provide school meals for children worldwide.',
    '/images/FEED_Item6.jpg',
    'SPG-FEED-006',
    5
  )
ON CONFLICT (customer_item_number) DO NOTHING;
