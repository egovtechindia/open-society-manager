import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and Anon Key from environment variables
// The VITE_ prefix is required by Vite to expose these to the browser
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);