"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updateArtworkAction } from "@/app/admin/(protected)/artworks/actions";
import Button from "@/components/Button";

const initialState = {
  status: null,
  message: null,
};

const inputClassName =
  "mt-2 block min-h-11 w-full rounded-input border border-border bg-surface-alt px-3 text-base text-text placeholder:text-muted focus:border-primary";

export default function EditArtworkForm({ artwork }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    updateArtworkAction,
    initialState,
  );

  useEffect(() => {
    if (state?.status === "success") {
      router.push("/admin/artworks?updated=1");
    }
  }, [router, state]);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input name="id" type="hidden" value={artwork.id} />
      <input name="image_path" type="hidden" value={artwork.image_path} />
      <input name="width" type="hidden" value={artwork.width} />
      <input name="height" type="hidden" value={artwork.height} />

      <div>
        <label className="text-sm font-semibold" htmlFor="title">
          Title
        </label>
        <input
          className={inputClassName}
          defaultValue={artwork.title}
          id="title"
          maxLength={120}
          name="title"
          required
          type="text"
        />
      </div>

      <div>
        <label className="text-sm font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className={`${inputClassName} min-h-32 py-3`}
          defaultValue={artwork.description}
          id="description"
          maxLength={1000}
          name="description"
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm font-semibold" htmlFor="tags">
          Tags
        </label>
        <input
          aria-describedby="tags-help"
          className={inputClassName}
          defaultValue={artwork.tags?.join(", ") ?? ""}
          id="tags"
          name="tags"
          type="text"
        />
        <p className="mt-2 text-xs leading-relaxed text-muted" id="tags-help">
          Separate tags with commas. To change the image, delete this artwork and
          upload a new one.
        </p>
      </div>

      {state?.status === "error" && state.message ? (
        <p
          className="rounded-card border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div aria-live="polite" className="min-h-6 text-sm text-muted">
        {pending ? "Saving changes..." : state?.message}
      </div>

      <Button className="w-full sm:w-auto" disabled={pending} type="submit">
        {pending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
