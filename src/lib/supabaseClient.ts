import { createClient, SupabaseClient } from '@supabase/supabase-js';

console.log('Environment:', process.env.NODE_ENV);
console.log('All env variables:', process.env);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl || 'undefined');
console.log('Supabase Anon Key:', supabaseAnonKey ? '[REDACTED]' : 'undefined');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  throw new Error('Missing Supabase environment variables');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Error handler function
export const handleSupabaseError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Supabase error:', error.message);
  } else {
    console.error('Supabase error:', error);
  }
};

// Test the Supabase connection
supabase.auth.getSession().then(
  ({ data, error }) => {
    if (error) {
      console.error('Failed to connect to Supabase:', error.message);
    } else {
      console.log('Successfully connected to Supabase');
    }
  }
).catch(error => {
  console.error('Error while connecting to Supabase:', error);
});
