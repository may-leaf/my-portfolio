import { ArrowUpRight, LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/admin/auth-actions";
import AdminNav from "@/components/admin/AdminNav";
import AdminSetupNotice from "@/components/admin/AdminSetupNotice";
import { getAdminSession } from "@/lib/admin/session";
import { connection } from "next/server";

export const instant = false;

function SignOutButton({ compact = false }) {
  return (
    <form action={signOutAction}>
      <button
        aria-label={compact ? "Sign out" : undefined}
        className={[
          "inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-surface text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary",
          compact ? "w-11 p-0" : "w-full px-3",
        ].join(" ")}
        type="submit"
      >
        <LogOut aria-hidden="true" className="h-4 w-4" />
        {compact ? null : "Sign out"}
      </button>
    </form>
  );
}

export default async function AdminProtectedLayout({ children }) {
  await connection();
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
    <div className="min-h-screen bg-bg">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
          <div className="border-b border-border p-6">
            <Link
              className="block transition-colors hover:text-primary"
              href="/admin/artworks"
            >
              <span className="hud-label text-primary">{"// Control room"}</span>
              <span className="mt-2 block font-heading text-xl font-bold normal-case">
                Tuna (まぐろ寿司)
              </span>
            </Link>
          </div>

          <div className="flex-1 p-4">
            <AdminNav />
          </div>

          <div className="border-t border-border p-4">
            <p className="hud-label text-muted">Signed in as</p>
            <p className="mt-2 truncate text-sm text-text">
              {session.user.email}
            </p>

            <div className="mt-4">
              <SignOutButton />
            </div>

            <Link
              className="mt-2 inline-flex min-h-11 w-full items-center justify-between gap-2 px-3 text-sm font-semibold text-muted transition-colors hover:text-primary"
              href="/"
            >
              Public site
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur lg:hidden">
            <div className="flex min-h-16 items-center gap-2 px-4">
              <Link
                className="shrink-0 font-heading text-sm font-bold uppercase transition-colors hover:text-primary"
                href="/admin/artworks"
              >
                Admin
              </Link>
              <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />
              <div className="min-w-0 flex-1">
                <AdminNav orientation="horizontal" />
              </div>
              <SignOutButton compact />
            </div>
          </header>

          <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">{children}</main>
        </div>
      </div>
    </div>
  );
}
