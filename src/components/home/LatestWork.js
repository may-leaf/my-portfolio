import { ArrowRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { portfolioPage } from "@/data/portfolio";
import { fetchArtworks } from "@/lib/artworks";

function EmptyLatestWork({ title, body }) {
  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <div className="flex items-start gap-3">
        <ImageIcon
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0 text-muted"
        />
        <div>
          <p className="font-heading text-base font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

export default async function LatestWork() {
  const { artworks, error } = await fetchArtworks({ limit: 6 });

  return (
    <section aria-labelledby="latest-work-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {portfolioPage.latestWork.eyebrow}
          </p>
          <h2
            className="mt-2 font-heading text-[1.75rem] font-bold leading-tight"
            id="latest-work-title"
          >
            {portfolioPage.latestWork.title}
          </h2>
        </div>
        <Link
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-muted transition-colors hover:text-primary"
          href="/portfolio"
        >
          {portfolioPage.latestWork.action}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5">
        {error ? (
          <EmptyLatestWork
            body={portfolioPage.errorState.body}
            title={portfolioPage.errorState.title}
          />
        ) : artworks.length === 0 ? (
          <EmptyLatestWork
            body={portfolioPage.emptyState.body}
            title={portfolioPage.emptyState.title}
          />
        ) : (
          <ul className="flex gap-3 overflow-x-auto pb-2">
            {artworks.map((artwork) => (
              <li className="w-32 shrink-0 sm:w-40" key={artwork.id}>
                <Link
                  aria-label={`View ${artwork.title} in the portfolio`}
                  className="group block"
                  href="/portfolio"
                >
                  {artwork.image_url ? (
                    <Image
                      alt={artwork.title}
                      className="h-auto w-full rounded-image border border-border transition-transform duration-200 group-hover:scale-[1.02] group-hover:border-primary"
                      height={artwork.height}
                      sizes="(min-width: 640px) 160px, 128px"
                      src={artwork.image_url}
                      width={artwork.width}
                    />
                  ) : (
                    <span className="flex aspect-[4/5] items-center justify-center rounded-image border border-border bg-surface">
                      <ImageIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-muted"
                      />
                    </span>
                  )}
                  <span className="mt-2 block truncate text-sm font-medium text-text transition-colors group-hover:text-primary">
                    {artwork.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
