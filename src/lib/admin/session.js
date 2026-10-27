import { cookies } from "next/headers";
import { cache } from "react";
import {
  createServerSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export const getAdminSession = cache(async () => {
  await cookies();

  if (!isSupabaseServerConfigured) {
    return {
      configured: false,
      user: null,
      isAdmin: false,
      supabase: null,
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        configured: true,
        user: null,
        isAdmin: false,
        supabase,
      };
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    return {
      configured: true,
      user: {
        id: user.id,
        email: user.email ?? "",
      },
      isAdmin: !adminError && isAdmin === true,
      supabase,
    };
  } catch {
    return {
      configured: true,
      user: null,
      isAdmin: false,
      supabase: null,
    };
  }
});

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session.configured) {
    return {
      ...session,
      error: "Supabase is not configured.",
    };
  }

  if (!session.user) {
    return {
      ...session,
      error: "Your session has expired. Please sign in again.",
    };
  }

  if (!session.isAdmin) {
    return {
      ...session,
      error: "You are not authorized to do that.",
    };
  }

  return {
    ...session,
    error: null,
  };
}
