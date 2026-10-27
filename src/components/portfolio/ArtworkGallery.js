"use client";

import { useState } from "react";
import Button from "@/components/Button";
import ArtworkCard from "@/components/portfolio/ArtworkCard";
import Lightbox from "@/components/portfolio/Lightbox";
import { portfolioPage } from "@/data/portfolio";
import { fetchArtworks } from "@/lib/artworks";

export default function ArtworkGallery({
  activeTag,
  initialArtworks,
  initialHasMore,
}) {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [openId, setOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const openIndex = artworks.findIndex((artwork) => artwork.id === openId);

  async function handleLoadMore() {
    setIsLoading(true);
    setError(null);

    const result = await fetchArtworks({
      tag: activeTag,
      offset: artworks.length,
      limit: portfolioPage.pageSize,
    });

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setArtworks((current) => [...current, ...result.artworks]);
    setHasMore(result.hasMore);
    setIsLoading(false);
  }

  return (
    <>
      <p aria-live="polite" className="sr-only">
        Showing {artworks.length} artworks
      </p>

      <div className="columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4 2xl:columns-5">
        {artworks.map((artwork) => (
          <ArtworkCard
            artwork={artwork}
            key={artwork.id}
            onOpen={setOpenId}
          />
        ))}
      </div>

      {error ? (
        <p
          className="mt-5 rounded-card border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            disabled={isLoading}
            onClick={handleLoadMore}
            variant="secondary"
          >
            {isLoading ? "Loading…" : "Load more"}
          </Button>
        </div>
      ) : null}

      {openIndex >= 0 ? (
        <Lightbox
          artworks={artworks}
          index={openIndex}
          onClose={() => setOpenId(null)}
          onNavigate={(nextIndex) => setOpenId(artworks[nextIndex].id)}
        />
      ) : null}
    </>
  );
}
