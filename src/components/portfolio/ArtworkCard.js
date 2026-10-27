import { ImageIcon } from "lucide-react";
import Image from "next/image";

export default function ArtworkCard({ artwork, onOpen }) {
  return (
    <button
      aria-haspopup="dialog"
      aria-label={`Open ${artwork.title}`}
      className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-image border border-border text-left transition-colors hover:border-primary sm:mb-4"
      onClick={() => onOpen(artwork.id)}
      type="button"
    >
      {artwork.image_url ? (
        <Image
          alt={artwork.title}
          className="h-auto w-full transition-transform duration-200 group-hover:scale-[1.02]"
          height={artwork.height}
          sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          src={artwork.image_url}
          width={artwork.width}
        />
      ) : (
        <span className="flex aspect-[4/5] items-center justify-center bg-surface">
          <ImageIcon aria-hidden="true" className="h-7 w-7 text-muted" />
        </span>
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="block text-sm font-semibold leading-snug text-text">
          {artwork.title}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-image ring-1 ring-inset ring-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </button>
  );
}
