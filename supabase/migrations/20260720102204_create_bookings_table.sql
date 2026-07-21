/*
# Create bookings table for St Hairdesign

## Summary
Creates the main `bookings` table used by both the client booking form and the admin dashboard.
No authentication is required for clients — they book anonymously. The admin uses Supabase Auth.

## Tables

### bookings
Stores all appointment reservations made through the client website.

Columns:
- id (uuid, PK) — auto-generated unique ID
- client_name (text, not null) — customer's first name
- phone (text, not null) — customer phone number
- barber (text, not null) — selected barber: "Sulejman Turanović" or "Edvin Šahinović"
- service_name (text, not null) — name of the selected service
- service_duration (int, not null) — duration in minutes
- service_price (numeric, not null) — price in KM
- booked_date (date, not null) — appointment date (YYYY-MM-DD)
- booked_time (text, not null) — appointment time slot (HH:MM)
- status (text, not null, default "Na čekanju") — booking status
- created_at (timestamptz) — record creation timestamp

## Security
- RLS enabled
- anon + authenticated can SELECT (for availability checks on the client side)
- anon + authenticated can INSERT (clients book without logging in)
- anon + authenticated can UPDATE (admin updates status via anon key or service role)
- anon + authenticated can DELETE

## Notes
- Clients never log in; all policies use TO anon, authenticated with USING (true)
- Status values in use: "Na čekanju", "Završeno", "Otkazano/Propušteno"
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  phone text NOT NULL,
  barber text NOT NULL,
  service_name text NOT NULL,
  service_duration integer NOT NULL,
  service_price numeric(10,2) NOT NULL,
  booked_date date NOT NULL,
  booked_time text NOT NULL,
  status text NOT NULL DEFAULT 'Na čekanju',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings" ON bookings FOR DELETE
TO anon, authenticated USING (true);
