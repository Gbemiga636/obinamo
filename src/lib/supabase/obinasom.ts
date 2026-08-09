import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ObinasomGuest = {
  id: string;
  first_name: string;
  surname: string;
  phone: string;
  email: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  return url;
}

/** Browser / public client — insert-only via RLS on obinasom_guests */
export function createAnonClient(): SupabaseClient {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(getSupabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Server-only — never import into client components */
export function createServiceClient(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(getSupabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const OBINASOM_GUESTS_TABLE = "obinasom_guests" as const;
