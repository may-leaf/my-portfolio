import { ShieldX } from "lucide-react";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/admin/auth-actions";
import AdminSetupNotice from "@/components/admin/AdminSetupNotice";
import { getAdminSession } from "@/lib/admin/session";

export const instant = false;

export const metadata = {
  title: "Not authorized",
};

export default async function NotAuthorizedPage() {
  const session = await getAdminSession();

  if (!session.configured) {
    return <AdminSetupNotice />;
  }

  if (!session.user) {
    redirect("/admin/login");
  }

  if (session.isAdmin) {
    redirect("/admin/artworks");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col justify-center px-5 py-16">
      <p className="hud-label text-danger">{"// Access denied"}</p>

      <div className="mt-3 border border-border border-t-2 border-t-danger bg-surface p-6 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center border border-danger/30 bg-danger/10 text-danger">
          <ShieldX aria-hidden="true" className="h-5 w-5" />
        </span>

        <h1 className="mt-6 font-heading text-3xl font-bold uppercase leading-tight">
          Not authorized
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          This account does not have admin access.
        </p>

        {session.user.email ? (
          <p className="mt-4 border border-border bg-surface-alt px-4 py-3 text-sm text-muted">
            Signed in as{" "}
            <span className="font-semibold text-text">
              {session.user.email}
            </span>
          </p>
        ) : null}

        <form action={signOutAction} className="mt-6">
          <button
            className="inline-flex min-h-11 w-full items-center justify-center border border-primary bg-primary px-6 text-base font-semibold text-primary-ink transition-colors hover:border-primary-hover hover:bg-primary-hover"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
