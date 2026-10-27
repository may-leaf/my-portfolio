"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createServerSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

function getSafeNextPath(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/admin") ||
    value.startsWith("/admin/login")
  ) {
    return "/admin/artworks";
  }

  return value;
}

export async function signInAction(previousState, formData) {
  if (!isSupabaseServerConfigured) {
    return {
      error: "Supabase is not configured.",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = getSafeNextPath(formData.get("next"));

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        error: "Invalid email or password.",
      };
    }
  } catch {
    return {
      error: "Could not sign in. Please try again.",
    };
  }

  revalidatePath("/admin", "layout");
  redirect(next);
}

export async function signOutAction() {
  let failed = false;

  if (isSupabaseServerConfigured) {
    try {
      const supabase = await createServerSupabaseClient();
      await supabase.auth.signOut();
    } catch {
      failed = true;
    }
  }

  if (failed) {
    redirect("/admin/login");
  }

  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}
