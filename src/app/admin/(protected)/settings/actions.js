"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/session";

export async function updateCommissionSettingsAction(previousState, formData) {
  const auth = await requireAdmin();

  if (auth.error) {
    return {
      status: "error",
      message: auth.error,
    };
  }

  const commissionsOpen = formData.get("commissions_open") === "on";

  const { data, error } = await auth.supabase
    .from("site_settings")
    .upsert(
      {
        id: 1,
        commissions_open: commissionsOpen,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    )
    .select("id")
    .single();

  if (error || !data) {
    return {
      status: "error",
      message: "Could not save the commission status. Please try again.",
    };
  }

  revalidatePath("/commission");
  revalidatePath("/admin/settings");

  return {
    status: "success",
    message: commissionsOpen
      ? "Commissions are now open."
      : "Commissions are now closed.",
  };
}
