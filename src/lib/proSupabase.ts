import { createClient } from "@supabase/supabase-js";

const proSupabaseUrl =
  process.env.PRO_SUPABASE_URL || "https://ejjqvrngxscpzmnelpkf.supabase.co";
const proSupabaseServiceKey =
  process.env.PRO_SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqanF2cm5neHNjcHptbmVscGtmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzI2NjUzMSwiZXhwIjoyMDkyODQyNTMxfQ.yCnjaaVhTA-dcp6Mk3ZvYmDuYPfjy_xEtM2x3q5PX0g";

export const proSupabaseAdmin = createClient(proSupabaseUrl, proSupabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

