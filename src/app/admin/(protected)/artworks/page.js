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
import { connection } from "next/server";
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
  await connection();
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
          <p className="hud-label text-primary">{"// Admin / Artworks"}</p>
          <h1 className="mt-2 font-heading text-[2rem] font-bold uppercase leading-tight sm:text-4xl">
            Artworks
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">
            {total === 0
              ? "No records"
              : `${start}–${end} / ${total} records`}
          </p>
        </div>

        <Button href="/admin/artworks/new" variant="primary">
          <Plus aria-hidden="true" className="h-4 w-4" />
          Upload artwork
        </Button>
      </div>

      {created || updated ? (
        <p
          className="mt-6 border border-primary/25 bg-primary-soft px-4 py-3 text-sm text-primary"
          role="status"
        >
          {created ? "Artwork published." : "Artwork updated."}
        </p>
      ) : null}

      {error ? (
        <p
          className="mt-6 border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          Could not load artworks: {error}
        </p>
      ) : artworks.length === 0 ? (
        <div className="mt-8 border border-border bg-surface p-6">
          <div className="flex items-start gap-3">
            <ImageIcon aria-hidden="true" className="h-5 w-5 text-muted" />
            <div>
              <h2 className="font-heading text-lg font-semibold uppercase">
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
              className="border border-border bg-surface p-3 transition-colors hover:border-border-strong sm:flex sm:items-start sm:gap-4"
              key={artwork.id}
            >
              <div className="shrink-0">
                {artwork.image_url ? (
                  <Image
                    alt={artwork.title}
                    className="h-48 w-full border border-border object-cover sm:h-24 sm:w-24"
                    height={artwork.height}
                    sizes="(min-width: 640px) 96px, 90vw"
                    src={artwork.image_url}
                    width={artwork.width}
                  />
                ) : (
                  <span className="flex h-48 w-full items-center justify-center border border-border bg-surface-alt sm:h-24 sm:w-24">
                    <ImageIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-muted"
                    />
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 py-3 sm:py-0">
                <h2 className="truncate font-heading text-lg font-semibold uppercase">
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

          <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
            Page {page} / {totalPages}
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
        className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-primary"
        href="/portfolio"
      >
        View public Portfolio
      </Link>
    </div>
  );
}
