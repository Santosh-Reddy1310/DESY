-- Enable RLS for Clerk Authentication
-- Clerk JWT is not integrated with Supabase auth.uid(),
-- so we use permissive policies and handle authorization at the application level

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can insert their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can update their own decisions" ON decisions;
DROP POLICY IF EXISTS "Users can delete their own decisions" ON decisions;

DROP POLICY IF EXISTS "Users can view options for their decisions" ON options;
DROP POLICY IF EXISTS "Users can insert options for their decisions" ON options;
DROP POLICY IF EXISTS "Users can update options for their decisions" ON options;
DROP POLICY IF EXISTS "Users can delete options for their decisions" ON options;

DROP POLICY IF EXISTS "Users can view criteria for their decisions" ON criteria;
DROP POLICY IF EXISTS "Users can insert criteria for their decisions" ON criteria;
DROP POLICY IF EXISTS "Users can update criteria for their decisions" ON criteria;
DROP POLICY IF EXISTS "Users can delete criteria for their decisions" ON criteria;

DROP POLICY IF EXISTS "Users can view constraints for their decisions" ON constraints;
DROP POLICY IF EXISTS "Users can insert constraints for their decisions" ON constraints;
DROP POLICY IF EXISTS "Users can update constraints for their decisions" ON constraints;
DROP POLICY IF EXISTS "Users can delete constraints for their decisions" ON constraints;

-- Enable RLS on all tables
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;
ALTER TABLE criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE constraints ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for authenticated users
-- Security is handled at the application level by filtering with user.id

CREATE POLICY "Allow authenticated users full access to decisions"
  ON decisions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to options"
  ON options
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to criteria"
  ON criteria
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to constraints"
  ON constraints
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated;
