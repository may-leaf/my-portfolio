"use client";

import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Badge from "@/components/Badge";
import { portfolioPage } from "@/data/portfolio";

export default function Lightbox({ artworks, index, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const artwork = artworks[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;

      if (dialog?.open) {
        dialog.close();
      }

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, []);

  if (!artwork) {
    return null;
  }

  function showPrevious() {
    onNavigate((index - 1 + artworks.length) % artworks.length);
  }

  function showNext() {
    onNavigate((index + 1) % artworks.length);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleTouchStart(event) {
    const touch = event.touches[0];

    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event) {
    if (!touchStart.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    touchStart.current = null;

    if (Math.abs(deltaY) > 80 && Math.abs(deltaY) > Math.abs(deltaX)) {
      onClose();
    }
  }

  return (
    <dialog
      aria-labelledby="lightbox-title"
      className="m-auto max-h-[92vh] w-[min(94vw,1120px)] overflow-hidden rounded-card border border-border bg-surface p-0 text-text shadow-modal backdrop:bg-bg/95"
      onClick={handleBackdropClick}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={handleKeyDown}
      ref={dialogRef}
    >
      <div className="flex max-h-[92vh] flex-col lg:flex-row">
        <div
          className="relative h-[48vh] shrink-0 bg-bg lg:h-[80vh] lg:flex-1"
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
        >
          {artwork.image_url ? (
            <Image
              alt={artwork.title}
              className="object-contain"
              fill
              sizes="(min-width: 1024px) 70vw, 94vw"
              src={artwork.image_url}
            />
          ) : (
            <span className="flex h-full items-center justify-center">
              <ImageIcon aria-hidden="true" className="h-10 w-10 text-muted" />
            </span>
          )}

          {artworks.length > 1 ? (
            <>
              <button
                aria-label={portfolioPage.lightbox.previousLabel}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-text backdrop-blur transition-colors hover:border-primary hover:text-primary"
                onClick={showPrevious}
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>

              <button
                aria-label={portfolioPage.lightbox.nextLabel}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-text backdrop-blur transition-colors hover:border-primary hover:text-primary"
                onClick={showNext}
                type="button"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        <div className="flex w-full flex-col overflow-y-auto border-t border-border lg:w-80 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
            <span className="text-sm font-medium text-muted">
              {index + 1} / {artworks.length}
            </span>
            <button
              aria-label={portfolioPage.lightbox.closeLabel}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
              onClick={onClose}
              ref={closeRef}
              type="button"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <div className="p-5">
            <h2
              className="font-heading text-2xl font-bold leading-tight"
              id="lightbox-title"
            >
              {artwork.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {artwork.description || portfolioPage.lightbox.emptyDescription}
            </p>

            {artwork.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <Badge key={tag} tone="soft">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs text-muted">
                {portfolioPage.lightbox.emptyTags}
              </p>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
