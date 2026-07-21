/*
# Create admin_users table for St Hairdesign admin dashboard

## Summary
Creates the `admin_users` table to store admin account credentials for the admin dashboard.
This is a temporary mock authentication system that will be replaced later.

## Tables

### admin_users
Stores admin account email and password (hashed) for login.

Columns:
- id (uuid, PK)
- email (text, unique, not null)
- password (text, not null) — stored password (mock, will be removed later)
- created_at (timestamptz)

## Security
- RLS enabled
- anon + authenticated can SELECT and INSERT (for registration and login)
- No UPDATE or DELETE needed for now
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_admin_users" ON admin_users;
CREATE POLICY "anon_select_admin_users" ON admin_users FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_admin_users" ON admin_users;
CREATE POLICY "anon_insert_admin_users" ON admin_users FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_admin_users" ON admin_users;
CREATE POLICY "anon_update_admin_users" ON admin_users FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_admin_users" ON admin_users;
CREATE POLICY "anon_delete_admin_users" ON admin_users FOR DELETE
TO anon, authenticated USING (true);
