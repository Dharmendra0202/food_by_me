const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn("⚠️  Supabase credentials not configured. Some features will not work.");
  console.warn(`   SUPABASE_URL: ${supabaseUrl ? 'SET' : 'MISSING'}`);
  console.warn(`   SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceRoleKey ? 'SET' : 'MISSING'}`);
  
  // Return a mock client that won't crash
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: new Error("Supabase not configured") }),
      insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      update: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      delete: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      eq: function() { return this; },
      or: function() { return this; },
      maybeSingle: function() { return this; }
    }),
    auth: {
      signInWithOtp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      verifyOtp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      signOut: () => Promise.resolve({ error: null })
    }
  };
} else {
  try {
    // Use service role key for admin operations (database access)
    supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { 
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    
    console.log("✅ Supabase client initialized");
    console.log(`   Using ${supabaseAnonKey ? 'anon key for auth' : 'service role key'}`);
  } catch (error) {
    console.error("❌ Failed to initialize Supabase:", error.message);
    // Fallback to mock client
    supabase = {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: new Error("Supabase initialization failed") }),
        insert: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        update: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        delete: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        eq: function() { return this; },
        or: function() { return this; },
        maybeSingle: function() { return this; }
      }),
      auth: {
        signInWithOtp: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        verifyOtp: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase initialization failed") }),
        signOut: () => Promise.resolve({ error: null })
      }
    };
  }
}

module.exports = supabase;
