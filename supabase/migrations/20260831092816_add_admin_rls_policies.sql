/*
# Add admin CRUD RLS policies

## Overview
The existing schema has read-only policies for the public storefront and
insert-only policies for orders/enquiries/newsletter. This migration adds
authenticated CRUD policies so an admin user (signed in via Supabase Auth)
can manage products, categories, recommendations, orders, and enquiries.

## Security Changes
- Products: authenticated users get full CRUD (for admin management)
- Categories: authenticated users get full CRUD
- Product recommendations: authenticated users get full CRUD
- Orders: authenticated users get SELECT + UPDATE (view and change status)
- Order items: authenticated users get SELECT (view order contents)
- Contact enquiries: authenticated users get SELECT + UPDATE + DELETE
- Newsletter subscribers: authenticated users get SELECT + DELETE

## Important Notes
1. The public storefront policies (anon read for products/categories/recommendations,
   anon insert for orders/enquiries/newsletter) remain unchanged.
2. Only authenticated users can access admin operations — this is enforced by
   scoping new policies to `TO authenticated`.
3. Admin access control is handled at the application layer (admin route guard)
   combined with Supabase Auth. Any authenticated user can read/write via these
   policies; restrict sign-up in production to trusted admins only.
*/

-- ============================================================
-- PRODUCTS — authenticated CRUD
-- ============================================================
DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- CATEGORIES — authenticated CRUD
-- ============================================================
DROP POLICY IF EXISTS "auth_insert_categories" ON categories;
CREATE POLICY "auth_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_categories" ON categories;
CREATE POLICY "auth_update_categories" ON categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_categories" ON categories;
CREATE POLICY "auth_delete_categories" ON categories FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- PRODUCT RECOMMENDATIONS — authenticated CRUD
-- ============================================================
DROP POLICY IF EXISTS "auth_insert_recommendations" ON product_recommendations;
CREATE POLICY "auth_insert_recommendations" ON product_recommendations FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_recommendations" ON product_recommendations;
CREATE POLICY "auth_update_recommendations" ON product_recommendations FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_recommendations" ON product_recommendations;
CREATE POLICY "auth_delete_recommendations" ON product_recommendations FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- ORDERS — authenticated SELECT + UPDATE (view + status change)
-- ============================================================
DROP POLICY IF EXISTS "auth_select_orders" ON orders;
CREATE POLICY "auth_select_orders" ON orders FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_orders" ON orders;
CREATE POLICY "auth_update_orders" ON orders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- ORDER ITEMS — authenticated SELECT (view order contents)
-- ============================================================
DROP POLICY IF EXISTS "auth_select_order_items" ON order_items;
CREATE POLICY "auth_select_order_items" ON order_items FOR SELECT
  TO authenticated USING (true);

-- ============================================================
-- CONTACT ENQUIRIES — authenticated SELECT + UPDATE + DELETE
-- ============================================================
DROP POLICY IF EXISTS "auth_select_enquiries" ON contact_enquiries;
CREATE POLICY "auth_select_enquiries" ON contact_enquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_enquiries" ON contact_enquiries;
CREATE POLICY "auth_update_enquiries" ON contact_enquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_enquiries" ON contact_enquiries;
CREATE POLICY "auth_delete_enquiries" ON contact_enquiries FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS — authenticated SELECT + DELETE
-- ============================================================
DROP POLICY IF EXISTS "auth_select_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_select_newsletter" ON newsletter_subscribers FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_delete_newsletter" ON newsletter_subscribers;
CREATE POLICY "auth_delete_newsletter" ON newsletter_subscribers FOR DELETE
  TO authenticated USING (true);
