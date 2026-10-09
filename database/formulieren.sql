-- Aanvulling op setup.sql; opnieuw uitvoeren is veilig.
-- Alleen technische verzendstatus en tellers, geen formulierinhoud.
BEGIN;
CREATE TABLE IF NOT EXISTS public_form_limits (
  bucket text PRIMARY KEY, attempts integer NOT NULL, window_start timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS public_form_deliveries (
  id uuid PRIMARY KEY,
  fingerprint text NOT NULL,
  status text NOT NULL CHECK (status IN ('sending', 'sent', 'failed', 'uncertain')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS public_form_deliveries_created ON public_form_deliveries (created_at);
REVOKE ALL ON public_form_limits, public_form_deliveries FROM PUBLIC;
COMMIT;
