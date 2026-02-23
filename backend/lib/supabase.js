const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn("⚠️  Supabase credentials not configured. Some features will not work.");
  // Return a mock client that won't crash
  module.exports = {
    from: () => ({
      select: () => ({ data: [], error: new Error("Supabase not configured") }),
      insert: () => ({ data: null, error: new Error("Supabase not configured") }),
      update: () => ({ data: null, error: new Error("Supabase not configured") }),
      delete: () => ({ data: null, error: new Error("Supabase not configured") })
    })
  };
} else {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
  
  console.log("✅ Supabase client initialized");
  module.exports = supabase;
}
