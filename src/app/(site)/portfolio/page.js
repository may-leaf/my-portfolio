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
    "Browse anime and manga illustrations, character work and fan art by MaguroSushi.",
  openGraph: {
    title: "Artworks | MaguroSushi",
    description:
      "Browse anime and manga illustrations, character work and fan art by MaguroSushi.",
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
    <div className="mx-auto w-full max-w-[1120px] px-5 py-12 sm:py-16">
      <BackLink />
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
        {portfolioPage.eyebrow}
      </p>
      <h1 className="mt-2 font-heading text-[2.5rem] font-bold leading-tight sm:text-5xl">
        {portfolioPage.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-[1.7] text-muted">
        {portfolioPage.intro}
      </p>

      <div className="mt-8">
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
