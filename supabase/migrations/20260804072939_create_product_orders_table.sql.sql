/*
# Create product_orders table for St Hairdesign product ordering

## Summary
Creates the `product_orders` table to store product pre-orders placed by authenticated
Google users. Each order records which product was ordered, the user's Google email and
name, the price, and the timestamp of the order. The admin dashboard reads these orders.

## Tables

### product_orders
Stores product pre-orders from authenticated customers.

Columns:
- id (uuid, PK) — auto-generated unique ID
- user_id (uuid, not null) — the authenticated customer's Supabase auth user id
- user_email (text, not null) — customer's Google email (denormalized for admin display)
- user_name (text) — customer's display name from Google (optional)
- product_category (text, not null) — "Preparati za kosu" or "Balzam za bradu"
- product_name (text, not null) — name of the product ordered
- price (numeric, not null) — price in KM at time of ordering
- status (text, not null, default "Na čekanju") — order status
- created_at (timestamptz) — when the order was placed

## Security
- RLS enabled
- SELECT: anon + authenticated can read (admin reads via anon key)
- INSERT: authenticated only — user must be signed in with Google to place an order
- UPDATE: anon + authenticated can update (admin marks orders as completed)
- DELETE: anon + authenticated can delete

## Notes
- Google OAuth: the user signs in via Supabase Auth with the google provider.
  Their auth.uid() is used as user_id; user_email and user_name are captured from the
  session for admin display without needing a join to auth.users.
- Status values: "Na čekanju", "Završeno"
*/

CREATE TABLE IF NOT EXISTS product_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  user_name text,
  product_category text NOT NULL,
  product_name text NOT NULL,
  price numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'Na čekanju',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_product_orders" ON product_orders;
CREATE POLICY "anon_select_product_orders" ON product_orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_product_orders" ON product_orders;
CREATE POLICY "auth_insert_product_orders" ON product_orders FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_product_orders" ON product_orders;
CREATE POLICY "anon_update_product_orders" ON product_orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_product_orders" ON product_orders;
CREATE POLICY "anon_delete_product_orders" ON product_orders FOR DELETE
TO anon, authenticated USING (true);
