import Badge from "@/components/Badge";

export default function StatusBadge({
  open,
  openLabel = "Commissions open",
  closedLabel = "Commissions closed",
}) {
  return (
    <Badge tone={open ? "soft" : "danger"}>
      <span
        aria-hidden="true"
        className={[
          "h-1.5 w-1.5 shrink-0 rounded-full",
          open ? "hud-pulse bg-primary" : "bg-danger",
        ].join(" ")}
      />
      <span aria-hidden="true" className="opacity-60">
        {"//"}
      </span>
      {open ? openLabel : closedLabel}
    </Badge>
  );
}
