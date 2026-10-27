import { LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/admin/auth-actions";
import AdminNav from "@/components/admin/AdminNav";
import AdminSetupNotice from "@/components/admin/AdminSetupNotice";
import { getAdminSession } from "@/lib/admin/session";

export const instant = false;

export default async function AdminProtectedLayout({ children }) {
  const session = await getAdminSession();

  if (!session.configured) {
    return <AdminSetupNotice />;
  }

  if (!session.user) {
    redirect("/admin/login");
  }

  if (!session.isAdmin) {
    redirect("/admin/not-authorized");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface/80">
        <div className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2">
          <Link
            className="inline-flex min-h-11 items-center font-heading text-base font-bold text-text transition-colors hover:text-primary"
            href="/admin/artworks"
          >
            Admin
          </Link>

          <AdminNav />

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden max-w-56 truncate text-sm text-muted sm:inline">
              {session.user.email}
            </span>
            <form action={signOutAction}>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-border bg-surface px-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                type="submit"
              >
                <LogOut aria-hidden="true" className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:py-14">
        {children}
      </main>
    </div>
  );
}
