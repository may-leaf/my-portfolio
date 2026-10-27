import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import AdminSetupNotice from "@/components/admin/AdminSetupNotice";
import LoginForm from "@/components/admin/LoginForm";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

export const instant = false;

export const metadata = {
  title: "Sign in",
  description: "Admin sign in for Tuna (まぐろ寿司).",
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const next = Array.isArray(params.next) ? params.next[0] : params.next;

  if (!isSupabaseServerConfigured) {
    return <AdminSetupNotice />;
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col justify-center px-5 py-16">
      <p className="hud-label text-primary">{"// Restricted access"}</p>

      <div className="mt-3 border border-border border-t-2 border-t-primary bg-surface p-6 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center border border-primary/25 bg-primary-soft text-primary">
          <LockKeyhole aria-hidden="true" className="h-5 w-5" />
        </span>

        <h1 className="mt-6 font-heading text-3xl font-bold uppercase leading-tight">
          Admin sign in
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This area is restricted to the site owner.
        </p>

        <LoginForm next={typeof next === "string" ? next : undefined} />
      </div>

      <Link
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-primary"
        href="/"
      >
        <span aria-hidden="true">{"<"}</span>
        Back to public site
      </Link>
    </div>
  );
}
