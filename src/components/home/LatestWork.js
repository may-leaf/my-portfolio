import { ArrowRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HudPanel from "@/components/HudPanel";
import Reveal from "@/components/motion/Reveal";
import { portfolioPage } from "@/data/portfolio";
import { fetchArtworks } from "@/lib/artworks";

function EmptyLatestWork({ title, body }) {
  return (
    <HudPanel innerClassName="flex items-start gap-3 p-6">
      <ImageIcon
        aria-hidden="true"
        className="mt-0.5 h-5 w-5 shrink-0 text-muted"
      />
      <div>
        <p className="font-heading text-base font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </HudPanel>
  );
}

export default async function LatestWork() {
  const { artworks, error } = await fetchArtworks({ limit: 6 });

  return (
    <Reveal as="section" aria-labelledby="latest-work-title">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="hud-label text-primary">
            {"// "}
            {portfolioPage.latestWork.eyebrow}
          </p>
          <h2
            className="mt-2 font-heading text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-tight"
            id="latest-work-title"
          >
            {portfolioPage.latestWork.title}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {!error && artworks.length ? (
            <span className="hud-label text-muted">
              {String(artworks.length).padStart(2, "0")} records
            </span>
          ) : null}
          <Link
            className="hud-link inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-primary"
            href="/portfolio"
          >
            {portfolioPage.latestWork.action}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-6">
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
          <ul className="flex snap-x gap-3 overflow-x-auto pb-3">
            {artworks.map((artwork, index) => (
              <li
                className="w-36 shrink-0 snap-start sm:w-44"
                key={artwork.id}
              >
                <HudPanel
                  className="group h-full"
                  cut="sm"
                  innerClassName="flex h-full flex-col bg-surface p-0"
                >
                  <Link
                    aria-label={`View ${artwork.title} in the portfolio`}
                    className="flex h-full flex-col"
                    href="/portfolio"
                  >
                    <span className="relative block aspect-[4/5] overflow-hidden bg-surface-alt">
                      {artwork.image_url ? (
                        <Image
                          alt={artwork.title}
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          fill
                          sizes="(min-width: 640px) 176px, 144px"
                          src={artwork.image_url}
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center">
                          <ImageIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-muted"
                          />
                        </span>
                      )}
                      <span className="absolute inset-0 bg-linear-to-t from-bg/70 via-transparent to-transparent" />
                      <span className="hud-label absolute left-2 top-2 text-primary">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>
                    </span>

                    <span className="flex flex-col gap-1 p-3">
                      <span className="truncate font-heading text-sm font-semibold uppercase tracking-[0.04em] text-text transition-colors group-hover:text-primary">
                        {artwork.title}
                      </span>
                      <span className="hud-label truncate text-muted">
                        {artwork.tags?.[0] ?? "Record"}
                      </span>
                    </span>
                  </Link>
                </HudPanel>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
