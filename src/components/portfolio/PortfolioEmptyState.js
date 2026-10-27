import { ImageIcon } from "lucide-react";
import HudPanel from "@/components/HudPanel";

export default function PortfolioEmptyState({ body, title }) {
  return (
    <HudPanel
      brackets
      bracketClassName="inset-5"
      innerClassName="flex flex-col items-center px-6 py-14 text-center sm:px-10"
    >
      <span className="flex h-12 w-12 items-center justify-center border border-border bg-surface-alt">
        <ImageIcon aria-hidden="true" className="h-5 w-5 text-muted" />
      </span>
      <p className="hud-label mt-6 text-muted">Archive // empty</p>
      <h2 className="mt-2 font-heading text-2xl font-bold uppercase">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{body}</p>
    </HudPanel>
  );
}
