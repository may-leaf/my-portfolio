const tones = {
  primary: "border-primary bg-primary text-primary-ink",
  soft: "border-primary/25 bg-primary-soft text-primary",
  neutral: "border-border bg-surface-alt text-muted",
  danger: "border-danger/30 bg-danger/10 text-danger",
};

export default function Badge({ tone = "neutral", className = "", children }) {
  return (
    <span
      className={[
        "inline-flex min-h-7 items-center gap-2 rounded-pill border px-3 py-1",
        "text-xs font-semibold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
