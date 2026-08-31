/*
# Sodha Global — Full E-commerce Schema

## Overview
Creates the complete database for the Sodha Global premium spice & peanut store:
product catalogue, categories, product recommendations, orders, order items,
contact enquiries, and newsletter subscribers.

## New Tables
1. **categories** — product categories (Spices, Masala, Seeds, Nuts)
2. **products** — full product catalogue with all detail fields
3. **product_recommendations** — explicit per-product recommendation links with priority
4. **orders** — customer orders with shipping details and payment status
5. **order_items** — line items belonging to an order
6. **contact_enquiries** — submissions from the contact form
7. **newsletter_subscribers** — email subscriptions

## Security (RLS)
- This is a **public storefront with no sign-in**. The anon-key client must be able to:
  - READ products, categories, and recommendations
  - INSERT orders, order_items, contact_enquiries, newsletter_subscribers
- Orders/enquiries are write-only from the client (no public SELECT) to protect customer data.
- Admin reads/writes happen via the service role key (server-side only), which bypasses RLS.

## Important Notes
1. Array columns use `text[]` for sizes, images, ingredients, tags, benefits, usage.
2. `product_recommendations` uses a composite of product_id + recommended_product_id with a priority int.
3. Orders use `gen_random_uuid()` for public IDs (no sequential guessing).
4. All timestamps default to `now()`.
5. `updated_at` on products is maintained by a trigger.
*/

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_categories" ON categories;
CREATE POLICY "anon_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  short_description text,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  compare_price numeric(10,2),
  thumbnail text,
  images text[] DEFAULT '{}',
  sizes text[] DEFAULT '{}',
  ingredients text[] DEFAULT '{}',
  origin text,
  weight text,
  availability boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  best_seller boolean NOT NULL DEFAULT false,
  tags text[] DEFAULT '{}',
  benefits text[] DEFAULT '{}',
  usage text[] DEFAULT '{}',
  storage text,
  sku text UNIQUE,
  seo_title text,
  seo_description text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products (featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products (best_seller) WHERE best_seller = true;

-- ============================================================
-- PRODUCT RECOMMENDATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  recommended_product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  priority int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE (product_id, recommended_product_id)
);

ALTER TABLE product_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_recommendations" ON product_recommendations;
CREATE POLICY "anon_read_recommendations" ON product_recommendations FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_rec_product ON product_recommendations (product_id);
CREATE INDEX IF NOT EXISTS idx_rec_priority ON product_recommendations (priority);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  country text NOT NULL DEFAULT 'India',
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  shipping numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'pending',
  order_status text NOT NULL DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public can create orders (checkout). No public read — protects customer data.
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- ============================================================
-- ORDER ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  price numeric(10,2) NOT NULL DEFAULT 0,
  size text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);

-- ============================================================
-- CONTACT ENQUIRIES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON contact_enquiries;
CREATE POLICY "anon_insert_enquiries" ON contact_enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);
