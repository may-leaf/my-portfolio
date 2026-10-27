"use client";

import { animate } from "animejs";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Badge from "@/components/Badge";
import CornerBrackets from "@/components/CornerBrackets";
import { portfolioPage } from "@/data/portfolio";

const pad = (value) => String(value).padStart(2, "0");

function formatDate(value) {
  if (!value) {
    return "Undated";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Undated";
  }

  return date.toISOString().slice(0, 10);
}

export default function Lightbox({ artworks, index, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const artwork = artworks[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    let animation;

    document.body.style.overflow = "hidden";

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    closeRef.current?.focus();

    if (
      panel &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      animation = animate(panel, {
        opacity: [0, 1],
        scale: [0.985, 1],
        duration: 220,
        ease: "outQuad",
      });
    }

    return () => {
      animation?.revert();
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
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-bg p-0 text-text backdrop:bg-black/95"
      onClick={handleBackdropClick}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={handleKeyDown}
      ref={dialogRef}
    >
      <div className="flex h-full flex-col" ref={panelRef}>
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="hud-label text-primary">[REC]</span>
            <span className="hud-label text-muted">
              {pad(index + 1)} / {pad(artworks.length)}
            </span>
          </div>

          <button
            aria-label={portfolioPage.lightbox.closeLabel}
            className="hud-btn hud-btn--secondary inline-flex h-11 w-11 items-center justify-center p-0"
            onClick={onClose}
            ref={closeRef}
            type="button"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_360px] lg:grid-rows-1">
          <div
            className="relative min-h-0 bg-bg p-4 sm:p-6"
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
          >
            <div className="relative h-full min-h-[45dvh] w-full">
              {artwork.image_url ? (
                <Image
                  alt={artwork.title}
                  className="object-contain"
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  src={artwork.image_url}
                />
              ) : (
                <span className="flex h-full items-center justify-center">
                  <ImageIcon aria-hidden="true" className="h-10 w-10 text-muted" />
                </span>
              )}

              <CornerBrackets className="inset-0" />
            </div>

            {artworks.length > 1 ? (
              <>
                <button
                  aria-label={portfolioPage.lightbox.previousLabel}
                  className="hud-btn hud-btn--secondary absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-bg/85 p-0 backdrop-blur sm:left-5"
                  onClick={showPrevious}
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>

                <button
                  aria-label={portfolioPage.lightbox.nextLabel}
                  className="hud-btn hud-btn--secondary absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-bg/85 p-0 backdrop-blur sm:right-5"
                  onClick={showNext}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          <aside className="max-h-[42dvh] overflow-y-auto border-t border-border bg-surface lg:max-h-none lg:border-l lg:border-t-0">
            <div className="p-5 sm:p-6">
              <p className="hud-label text-primary">{"// Record detail"}</p>
              <h2
                className="mt-3 font-heading text-2xl font-bold uppercase leading-tight sm:text-3xl"
                id="lightbox-title"
              >
                {artwork.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {artwork.description || portfolioPage.lightbox.emptyDescription}
              </p>

              <dl className="mt-6 space-y-3 border-t border-border pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="hud-label text-muted">Date</dt>
                  <dd className="font-mono text-xs text-text">
                    {formatDate(artwork.created_at)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="hud-label text-muted">Index</dt>
                  <dd className="font-mono text-xs text-primary">
                    {pad(index + 1)} / {pad(artworks.length)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <p className="hud-label text-muted">Tags</p>
                {artwork.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <Badge key={tag} tone="soft">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-muted">
                    {portfolioPage.lightbox.emptyTags}
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
