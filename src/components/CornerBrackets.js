export default function CornerBrackets({
  className = "inset-3",
  size = "h-3 w-3",
  tone = "border-border-strong",
  hoverTone = "group-hover:border-primary group-focus-visible:border-primary",
}) {
  const base = [
    "pointer-events-none absolute",
    size,
    tone,
    hoverTone,
    "transition-colors duration-200",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
