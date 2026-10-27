import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import EditArtworkForm from "@/components/admin/EditArtworkForm";
import BackLink from "@/components/BackLink";
import { parseArtworkId } from "@/lib/admin/artworks";
import { fetchArtworkById } from "@/lib/artworks";

export const instant = false;

export const metadata = {
  title: "Edit artwork",
};

export default async function EditArtworkPage({ params }) {
  const routeParams = await params;
  const id = parseArtworkId(routeParams.id);

  if (!id) {
    notFound();
  }

  const { artwork, error } = await fetchArtworkById(id);

  if (error) {
    return (
      <div className="max-w-[720px]">
        <BackLink href="/admin/artworks">Back to artworks</BackLink>
        <p
          className="mt-8 border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          Could not load this artwork: {error}
        </p>
      </div>
    );
  }

  if (!artwork) {
    notFound();
  }

  return (
    <div className="max-w-[720px]">
      <BackLink href="/admin/artworks">Back to artworks</BackLink>

      <p className="mt-8 hud-label text-primary">{"// Admin / Artworks"}</p>
      <h1 className="mt-2 font-heading text-[2rem] font-bold uppercase leading-tight sm:text-4xl">
        Edit artwork
      </h1>

      <div className="mt-6 border border-border bg-surface p-3">
        {artwork.image_url ? (
          <Image
            alt={artwork.title}
            className="max-h-72 w-auto border border-border"
            height={artwork.height}
            src={artwork.image_url}
            width={artwork.width}
          />
        ) : (
          <span className="flex h-48 items-center justify-center bg-surface-alt">
            <ImageIcon aria-hidden="true" className="h-8 w-8 text-muted" />
          </span>
        )}
      </div>

      <EditArtworkForm artwork={artwork} />
    </div>
  );
}
