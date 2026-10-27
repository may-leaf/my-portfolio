import { ImageIcon } from "lucide-react";
import Image from "next/image";
import CornerBrackets from "@/components/CornerBrackets";

export default function ArtworkCard({ artwork, index = 0, onOpen }) {
  return (
    <div
      className="group hud-frame hud-frame--interactive hud-cut-8 mb-3 break-inside-avoid transition-transform sm:mb-4 motion-safe:hover:-translate-y-0.5 motion-safe:focus-within:-translate-y-0.5"
      data-artwork-id={artwork.id}
    >
      <button
        aria-haspopup="dialog"
        aria-label={`Open ${artwork.title}`}
        className="hud-frame__inner relative block w-full overflow-hidden text-left"
        onClick={() => onOpen(artwork.id)}
        type="button"
      >
        <span className="relative block overflow-hidden">
          {artwork.image_url ? (
            <Image
              alt={artwork.title}
              className="h-auto w-full transition-transform duration-300 motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-within:scale-[1.02]"
              height={artwork.height}
              sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              src={artwork.image_url}
              width={artwork.width}
            />
          ) : (
            <span className="flex aspect-[4/5] items-center justify-center bg-surface-alt">
              <ImageIcon aria-hidden="true" className="h-7 w-7 text-muted" />
            </span>
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg via-bg/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          />

          <CornerBrackets className="inset-3" />

          <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <span className="flex items-center justify-between gap-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                [{String(index + 1).padStart(3, "0")}]
              </span>
              {artwork.tags?.[0] ? (
                <span className="hud-label truncate text-muted">
                  {artwork.tags[0]}
                </span>
              ) : null}
            </span>
            <span className="mt-1 block translate-y-2 font-heading text-sm font-semibold leading-snug text-text opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:text-base">
              {artwork.title}
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
