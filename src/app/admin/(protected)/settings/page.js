import AdminSetupNotice from "@/components/admin/AdminSetupNotice";
import SettingsForm from "@/components/admin/SettingsForm";
import StatusBadge from "@/components/StatusBadge";
import { commissionPage } from "@/data/pricing";
import { getAdminSession } from "@/lib/admin/session";

export const instant = false;

export const metadata = {
  title: "Commission settings",
};

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  if (!session.supabase) {
    return <AdminSetupNotice />;
  }

  const { data, error } = await session.supabase
    .from("site_settings")
    .select("commissions_open,updated_at")
    .eq("id", 1)
    .maybeSingle();

  const open = Boolean(data?.commissions_open);

  return (
    <div className="max-w-[720px]">
      <p className="hud-label text-primary">{"// Admin / Settings"}</p>
      <h1 className="mt-2 font-heading text-[2rem] font-bold uppercase leading-tight sm:text-4xl">
        Commission settings
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Update the public commission availability status.
      </p>

      <div className="mt-8 border border-border bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-semibold uppercase">
            Current status
          </h2>
          <StatusBadge
            closedLabel={commissionPage.statusClosed}
            open={open}
            openLabel={commissionPage.statusOpen}
          />
        </div>

        {data?.updated_at ? (
          <p className="mt-3 text-xs text-muted">
            Last updated {new Date(data.updated_at).toLocaleString()}
          </p>
        ) : null}

        {error ? (
          <p
            className="mt-5 border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
            role="alert"
          >
            Could not load the settings row: {error.message}
          </p>
        ) : null}

        {!data && !error ? (
          <p className="mt-5 border border-border bg-surface-alt px-4 py-3 text-sm text-muted">
            The settings row is missing. Saving will create it.
          </p>
        ) : null}

        <SettingsForm open={open} />
      </div>
    </div>
  );
}
