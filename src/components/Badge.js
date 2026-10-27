const tones = {
  primary: "hud-chip--primary",
  soft: "hud-chip--soft",
  neutral: "",
  danger: "hud-chip--danger",
};

export default function Badge({ tone = "neutral", className = "", children }) {
  return (
    <span
      className={[
        "hud-chip min-h-7 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em]",
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
