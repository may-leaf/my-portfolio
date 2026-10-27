import { getSupabaseClient } from "@/lib/supabase";

export async function getCommissionStatus() {
  const client = getSupabaseClient();

  if (!client) {
    return false;
  }

  const { data, error } = await client
    .from("site_settings")
    .select("commissions_open")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return false;
  }

  return Boolean(data?.commissions_open);
}
