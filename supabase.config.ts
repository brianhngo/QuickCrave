import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://clxvgiwqjhwgwucmazsm.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNseHZnaXdxamh3Z3d1Y21henNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NjA1MjgsImV4cCI6MjAyMjMzNjUyOH0.IKuiP4GmgmTyDJEQGUK_ak4sW849TLscCr4Tw0UMxf0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
