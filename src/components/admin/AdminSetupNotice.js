import { ShieldAlert } from "lucide-react";

export default function AdminSetupNotice() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-16 sm:py-24">
      <div className="rounded-card border border-danger/30 bg-danger/10 p-6">
        <div className="flex items-start gap-4">
          <ShieldAlert
            aria-hidden="true"
            className="mt-0.5 h-6 w-6 shrink-0 text-danger"
          />
          <div>
            <h1 className="font-heading text-2xl font-bold">
              Supabase is not configured
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Add <code className="text-text">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="text-text">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
              <code className="text-text">.env.local</code>, then restart the
              development server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
