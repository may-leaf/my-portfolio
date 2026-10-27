"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { deleteArtworkAction } from "@/app/admin/(protected)/artworks/actions";

export default function DeleteArtworkButton({ artwork }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function closeDialog() {
    if (isDeleting) {
      return;
    }

    setIsOpen(false);

    if (deletedMessage) {
      router.refresh();
    }
  }

  async function handleDelete() {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    const result = await deleteArtworkAction(artwork.id);

    if (result.status !== "success") {
      setError(result.message);
      setIsDeleting(false);
      return;
    }

    setIsDeleting(false);

    if (result.warning) {
      setDeletedMessage(result.warning);
      return;
    }

    setIsOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-danger/30 bg-danger/10 px-4 text-sm font-semibold text-danger transition-colors hover:bg-danger/20"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Trash2 aria-hidden="true" className="h-4 w-4" />
        Delete
      </button>

      <dialog
        aria-labelledby={`delete-title-${artwork.id}`}
        className="m-auto w-[min(92vw,420px)] rounded-card border border-border bg-surface p-0 text-text shadow-modal backdrop:bg-bg/90"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
        ref={dialogRef}
      >
        <div className="p-6">
          <h2
            className="font-heading text-2xl font-bold leading-tight"
            id={`delete-title-${artwork.id}`}
          >
            Delete artwork?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-text">{artwork.title}</span>{" "}
            will be removed from the site and its image file will be deleted.
          </p>

          {deletedMessage ? (
            <p
              className="mt-4 rounded-card border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              role="status"
            >
              {deletedMessage}
            </p>
          ) : null}

          {error ? (
            <p
              className="mt-4 rounded-card border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            {deletedMessage ? (
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-pill border border-border bg-surface px-5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                onClick={closeDialog}
                type="button"
              >
                Close
              </button>
            ) : (
              <>
                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-pill border border-border bg-surface px-5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                  disabled={isDeleting}
                  onClick={closeDialog}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-pill border border-danger/40 bg-danger/10 px-5 text-sm font-semibold text-danger transition-colors hover:bg-danger/20 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isDeleting}
                  onClick={handleDelete}
                  type="button"
                >
                  {isDeleting ? "Deleting..." : "Delete artwork"}
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
