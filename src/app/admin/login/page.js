import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import AdminSetupNotice from "@/components/admin/AdminSetupNotice";
import LoginForm from "@/components/admin/LoginForm";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

export const instant = false;

export const metadata = {
  title: "Sign in",
  description: "Admin sign in for MaguroSushi.",
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const next = Array.isArray(params.next) ? params.next[0] : params.next;

  if (!isSupabaseServerConfigured) {
    return <AdminSetupNotice />;
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center px-5 py-16">
      <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary-soft text-primary">
          <LockKeyhole aria-hidden="true" className="h-5 w-5" />
        </span>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          MaguroSushi
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold leading-tight">
          Admin sign in
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This area is restricted to the site owner.
        </p>

        <LoginForm next={typeof next === "string" ? next : undefined} />
      </div>

      <Link
        className="mt-6 inline-flex min-h-11 items-center justify-center text-sm font-semibold text-muted transition-colors hover:text-primary"
        href="/"
      >
        Back to public site
      </Link>
    </div>
  );
}
