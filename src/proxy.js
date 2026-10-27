import {
  redirectWithCookies,
  updateSupabaseSession,
} from "@/lib/supabase/proxy";

const publicAdminPaths = new Set([
  "/admin/login",
  "/admin/not-authorized",
]);

export async function proxy(request) {
  const { response, user } = await updateSupabaseSession(request);
  const { pathname } = request.nextUrl;

  if (publicAdminPaths.has(pathname)) {
    return response;
  }

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    loginUrl.searchParams.set(
      "next",
      `${pathname}${request.nextUrl.search}`,
    );

    return redirectWithCookies(loginUrl, response);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
