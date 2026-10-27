import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Pencil,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import DeleteArtworkButton from "@/components/admin/DeleteArtworkButton";
import { fetchAdminArtworks } from "@/lib/artworks";

export const instant = false;

export const metadata = {
  title: "Artworks",
};

const pageSize = 20;

function getString(value) {
  return Array.isArray(value) ? value[0] : value;
}

function getPage(value) {
  const page = Number.parseInt(getString(value) ?? "", 10);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export default async function AdminArtworksPage({ searchParams }) {
  const params = await searchParams;
  const page = getPage(params.page);
  const created = getString(params.created);
  const updated = getString(params.updated);

  const { artworks, total, error } = await fetchAdminArtworks({
    page,
    pageSize,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (total > 0 && artworks.length === 0 && page > 1) {
    redirect(`/admin/artworks?page=${totalPages}`);
  }

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            Admin
          </p>
          <h1 className="mt-2 font-heading text-[2.5rem] font-bold leading-tight sm:text-5xl">
            Artworks
          </h1>
          <p className="mt-3 text-sm text-muted">
            {total === 0
              ? "No artworks yet."
              : `Showing ${start}-${end} of ${total} artworks.`}
          </p>
        </div>

        <Button href="/admin/artworks/new" variant="primary">
          <Plus aria-hidden="true" className="h-4 w-4" />
          Upload artwork
        </Button>
      </div>

      {created || updated ? (
        <p
          className="mt-6 rounded-card border border-primary/25 bg-primary-soft px-4 py-3 text-sm text-primary"
          role="status"
        >
          {created ? "Artwork published." : "Artwork updated."}
        </p>
      ) : null}

      {error ? (
        <p
          className="mt-6 rounded-card border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          Could not load artworks: {error}
        </p>
      ) : artworks.length === 0 ? (
        <div className="mt-8 rounded-card border border-border bg-surface p-6">
          <div className="flex items-start gap-3">
            <ImageIcon aria-hidden="true" className="h-5 w-5 text-muted" />
            <div>
              <h2 className="font-heading text-lg font-semibold">
                Nothing here yet
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Upload the first artwork to fill the public portfolio.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {artworks.map((artwork) => (
            <li
              className="rounded-card border border-border bg-surface p-3 sm:flex sm:items-start sm:gap-4"
              key={artwork.id}
            >
              <div className="shrink-0">
                {artwork.image_url ? (
                  <Image
                    alt={artwork.title}
                    className="h-48 w-full rounded-image border border-border object-cover sm:h-24 sm:w-24"
                    height={artwork.height}
                    sizes="(min-width: 640px) 96px, 90vw"
                    src={artwork.image_url}
                    width={artwork.width}
                  />
                ) : (
                  <span className="flex h-48 w-full items-center justify-center rounded-image border border-border bg-surface-alt sm:h-24 sm:w-24">
                    <ImageIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-muted"
                    />
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 py-3 sm:py-0">
                <h2 className="truncate font-heading text-lg font-semibold">
                  {artwork.title}
                </h2>
                {artwork.description ? (
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                    {artwork.description}
                  </p>
                ) : null}
                {artwork.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <Badge key={tag} tone="soft">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 sm:shrink-0 sm:pt-0">
                <Button
                  href={`/admin/artworks/${artwork.id}/edit`}
                  size="sm"
                  variant="secondary"
                >
                  <Pencil aria-hidden="true" className="h-4 w-4" />
                  Edit
                </Button>
                <DeleteArtworkButton artwork={artwork} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 ? (
        <nav
          aria-label="Artwork pages"
          className="mt-8 flex items-center justify-between gap-3"
        >
          {page > 1 ? (
            <Button href={`/admin/artworks?page=${page - 1}`} variant="secondary">
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              Previous
            </Button>
          ) : (
            <span />
          )}

          <span className="text-sm text-muted">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Button href={`/admin/artworks?page=${page + 1}`} variant="secondary">
              Next
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          ) : (
            <span />
          )}
        </nav>
      ) : null}

      <Link
        className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors hover:text-primary"
        href="/portfolio"
      >
        View public Portfolio
      </Link>
    </div>
  );
}
