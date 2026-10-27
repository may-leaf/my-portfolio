import { ImageIcon } from "lucide-react";

export default function PortfolioEmptyState({ body, title }) {
  return (
    <div className="rounded-card border border-border bg-surface p-8 text-center">
      <ImageIcon
        aria-hidden="true"
        className="mx-auto h-7 w-7 text-muted"
      />
      <h2 className="mt-4 font-heading text-xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
        {body}
      </p>
    </div>
  );
}
