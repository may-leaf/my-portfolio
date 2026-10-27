import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseProxyConfigured = Boolean(
  supabaseUrl && supabaseAnonKey,
);

export async function updateSupabaseSession(request) {
  if (!isSupabaseProxyConfigured) {
    return {
      response: NextResponse.next({ request }),
      user: null,
      configured: false,
    };
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });

        Object.entries(headers).forEach(([name, value]) => {
          response.headers.set(name, value);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    response,
    user,
    configured: true,
  };
}

export function redirectWithCookies(url, sourceResponse) {
  const response = NextResponse.redirect(url);

  sourceResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });

  ["cache-control", "expires", "pragma"].forEach((name) => {
    const value = sourceResponse.headers.get(name);

    if (value) {
      response.headers.set(name, value);
    }
  });

  return response;
}
