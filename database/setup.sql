-- Run once in the SQL editor of the Neon database connected through Vercel Storage.
BEGIN;
CREATE TABLE IF NOT EXISTS site_content (
  id integer PRIMARY KEY CHECK (id = 1),
  overrides jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(overrides) = 'object'),
  revision integer NOT NULL DEFAULT 0 CHECK (revision >= 0), updated_at timestamptz
);
INSERT INTO site_content (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash text PRIMARY KEY, credential_version text NOT NULL, expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS admin_sessions_expiry ON admin_sessions (expires_at);
CREATE TABLE IF NOT EXISTS admin_login_limits (
  bucket text PRIMARY KEY, attempts integer NOT NULL, window_start timestamptz NOT NULL
);
REVOKE ALL ON site_content, admin_sessions, admin_login_limits FROM PUBLIC;
COMMIT;
