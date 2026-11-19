import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zimoihszjrfqrebeykda.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbW9paHN6anJmcXJlYmV5a2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNjMxNzcsImV4cCI6MjA5NDkzOTE3N30.jfFh4kIFsJptuBsK3Plyn4-UwAvwSPy1LrRWHkGGMEE";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbW9paHN6anJmcXJlYmV5a2RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTM2MzE3NywiZXhwIjoyMDk0OTM5MTc3fQ.tSd2byAe9FOJ1xnVrl1UrQiowRJk_CyN-_Ddl8-YBv4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

