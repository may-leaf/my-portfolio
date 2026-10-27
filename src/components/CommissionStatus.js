import StatusBadge from "@/components/StatusBadge";
import { commissionPage } from "@/data/pricing";
import { getCommissionStatus } from "@/lib/settings";

export default async function CommissionStatus() {
  const open = await getCommissionStatus();

  return (
    <StatusBadge
      closedLabel={commissionPage.statusClosed}
      open={open}
      openLabel={commissionPage.statusOpen}
    />
  );
}
