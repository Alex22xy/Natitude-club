import { createClient } from '@supabase/supabase-js'

// these lines tell the code to go look inside the .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// this creates the connection to your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)