-- ==============================================================================
-- Reference schema for the contact_messages table in Supabase.
-- Note: This table is already created in Supabase.
-- Do NOT execute this from application code.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  email_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security (RLS) is enabled with no public policies.
-- Server-side API access uses the SUPABASE_SECRET_KEY to bypass RLS.
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
