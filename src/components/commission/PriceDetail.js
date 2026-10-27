export default function PriceDetail({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-text">{children}</dd>
    </div>
  );
}
