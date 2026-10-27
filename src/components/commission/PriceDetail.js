export default function PriceDetail({ label, children }) {
  return (
    <div>
      <dt className="hud-label text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-text">{children}</dd>
    </div>
  );
}
