import { createClient } from '@supabase/supabase-js';

// These fallbacks are public browser credentials (not secrets). Environment
// variables can override them per Cloudflare Pages environment.
export const supabaseUrl =
  import.meta.env.PUBLIC_SUPABASE_URL || 'https://qyzpqajotnnairsgdhqu.supabase.co';
export const supabasePublishableKey =
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_gA70Y0N7q-Bdal1VRzdSeA_ddjkhpUD';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
