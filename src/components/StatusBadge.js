import Badge from "@/components/Badge";

export default function StatusBadge({
  open,
  openLabel = "Commissions open",
  closedLabel = "Commissions closed",
}) {
  return (
    <Badge tone={open ? "primary" : "danger"}>
      <span
        aria-hidden="true"
        className={[
          "h-1.5 w-1.5 rounded-full",
          open ? "bg-primary-ink" : "bg-danger",
        ].join(" ")}
      />
      {open ? openLabel : closedLabel}
    </Badge>
  );
}
