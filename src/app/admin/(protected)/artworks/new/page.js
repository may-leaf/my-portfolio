import BackLink from "@/components/BackLink";
import ArtworkUploader from "@/components/admin/ArtworkUploader";

export const metadata = {
  title: "Upload artwork",
};

export default function NewArtworkPage() {
  return (
    <div className="max-w-[720px]">
      <BackLink href="/admin/artworks">Back to artworks</BackLink>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
        Admin
      </p>
      <h1 className="mt-2 font-heading text-[2.5rem] font-bold leading-tight sm:text-5xl">
        Upload artwork
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The image uploads directly to Supabase Storage, then the artwork is
        published to the public gallery.
      </p>

      <ArtworkUploader />
    </div>
  );
}
