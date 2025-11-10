-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  theme TEXT NOT NULL DEFAULT 'system',
  language TEXT NOT NULL DEFAULT 'en',
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  push_notifications BOOLEAN NOT NULL DEFAULT false,
  marketing_emails BOOLEAN NOT NULL DEFAULT false,
  ai_temperature DECIMAL(3,2) NOT NULL DEFAULT 0.7,
  ai_max_tokens INTEGER NOT NULL DEFAULT 2048,
  ai_model TEXT NOT NULL DEFAULT 'llama2',
  auto_save_progress BOOLEAN NOT NULL DEFAULT true,
  show_completion_badges BOOLEAN NOT NULL DEFAULT true,
  privacy_mode BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own settings
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Policy: Users can insert their own settings
CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can update their own settings
CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Policy: Users can delete their own settings
CREATE POLICY "Users can delete own settings" ON user_settings
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
