import { Suspense } from "react";
import BackLink from "@/components/BackLink";
import ArtworkGallery from "@/components/portfolio/ArtworkGallery";
import PortfolioEmptyState from "@/components/portfolio/PortfolioEmptyState";
import PortfolioSkeleton from "@/components/portfolio/PortfolioSkeleton";
import TagFilter from "@/components/portfolio/TagFilter";
import { portfolioPage } from "@/data/portfolio";
import { fetchArtworks, fetchArtworkTags } from "@/lib/artworks";

export const metadata = {
  title: "Artworks",
  description:
    "Browse anime and manga illustrations, character work and fan art by Tuna (まぐろ寿司).",
  openGraph: {
    title: "Artworks | Tuna (まぐろ寿司)",
    description:
      "Browse anime and manga illustrations, character work and fan art by Tuna (まぐろ寿司).",
    type: "website",
  },
};

async function PortfolioContent({ searchParams }) {
  const params = await searchParams;
  const requestedTag = Array.isArray(params.tag) ? params.tag[0] : params.tag;
  const { tags } = await fetchArtworkTags();
  const activeTag =
    typeof requestedTag === "string" && tags.includes(requestedTag)
      ? requestedTag
      : "All";

  const { artworks, hasMore, error } = await fetchArtworks({
    tag: activeTag,
    limit: portfolioPage.pageSize,
  });

  return (
    <>
      <TagFilter activeTag={activeTag} tags={tags} />

      <div className="mt-8">
        {error ? (
          <PortfolioEmptyState
            body={portfolioPage.errorState.body}
            title={portfolioPage.errorState.title}
          />
        ) : artworks.length === 0 ? (
          <PortfolioEmptyState
            body={portfolioPage.emptyState.body}
            title={portfolioPage.emptyState.title}
          />
        ) : (
          <ArtworkGallery
            activeTag={activeTag}
            initialArtworks={artworks}
            initialHasMore={hasMore}
            key={activeTag}
          />
        )}
      </div>
    </>
  );
}

export default function PortfolioPage({ searchParams }) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
      <BackLink />

      <header className="mt-8 border-b border-border pb-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="hud-label text-primary">
              {"// "}
              {portfolioPage.eyebrow}
            </p>
            <h1 className="mt-3 font-heading text-[clamp(2.75rem,7vw,5.5rem)] font-bold uppercase leading-[0.92]">
              {portfolioPage.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-[1.7] text-muted sm:text-lg">
              {portfolioPage.intro}
            </p>
          </div>

          <div className="border-l border-border pl-5">
            <p className="hud-label text-muted">Archive status</p>
            <p className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-primary">
              <span
                aria-hidden="true"
                className="hud-pulse h-1.5 w-1.5 rounded-full bg-primary"
              />
              Online
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8">
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
