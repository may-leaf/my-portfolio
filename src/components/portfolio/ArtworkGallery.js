"use client";

import { animate, stagger } from "animejs";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const seenIds = useRef(new Set(initialArtworks.map((artwork) => artwork.id)));
  const galleryRef = useRef(null);

  const openIndex = artworks.findIndex((artwork) => artwork.id === openId);
  const recordCount = `${String(artworks.length).padStart(2, "0")}${
    hasMore ? "+" : ""
  }`;

  useEffect(() => {
    const newArtworks = artworks.filter(
      (artwork) => !seenIds.current.has(artwork.id),
    );

    if (!newArtworks.length) {
      return;
    }

    newArtworks.forEach((artwork) => seenIds.current.add(artwork.id));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const nodes = newArtworks
      .map((artwork) =>
        galleryRef.current?.querySelector(
          `[data-artwork-id="${CSS.escape(artwork.id)}"]`,
        ),
      )
      .filter(Boolean);

    if (!nodes.length) {
      return;
    }

    const animation = animate(nodes, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: stagger(60),
      duration: 500,
      ease: "outExpo",
    });

    return () => animation.revert();
  }, [artworks]);

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

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p className="hud-label text-muted">
          {"// Records"}
          <span className="ml-3 text-primary">{recordCount}</span>
        </p>
        <p className="hud-label text-muted">
          {hasMore ? "More available" : "End of loaded archive"}
        </p>
      </div>

      <div
        className="mt-6 columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4 2xl:columns-5"
        ref={galleryRef}
      >
        {artworks.map((artwork, index) => (
          <ArtworkCard
            artwork={artwork}
            index={index}
            key={artwork.id}
            onOpen={setOpenId}
          />
        ))}
      </div>

      {error ? (
        <p
          className="mt-6 border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
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
            <Plus aria-hidden="true" className="h-4 w-4" />
            {isLoading ? "Loading records..." : "Load more records"}
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
