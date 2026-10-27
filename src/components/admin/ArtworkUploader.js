"use client";

import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createArtworkAction } from "@/app/admin/(protected)/artworks/actions";
import Button from "@/components/Button";
import { portfolioPage } from "@/data/portfolio";
import {
  artworkFileTypes,
  maxArtworkFileSize,
} from "@/lib/admin/artworks";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const extensionByType = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const inputClassName =
  "mt-2 block min-h-11 w-full rounded-input border border-border bg-surface-alt px-3 text-base text-text placeholder:text-muted focus:border-primary";

function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("The selected file could not be read as an image."));
    };

    image.src = url;
  });
}

function getImagePath(file) {
  const extension = extensionByType[file.type];
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `uploads/${year}/${month}/${crypto.randomUUID()}.${extension}`;
}

export default function ArtworkUploader() {
  const router = useRouter();
  const [tags, setTags] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  function addSuggestedTag(tag) {
    const current = tags
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (current.some((value) => value.toLowerCase() === tag.toLowerCase())) {
      return;
    }

    setTags([...current, tag].join(", "));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isUploading) {
      return;
    }

    setError(null);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("image");
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const tagValue = String(formData.get("tags") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      setError("Choose a JPEG, PNG or WebP image.");
      return;
    }

    if (!artworkFileTypes.includes(file.type)) {
      setError("Only JPEG, PNG and WebP images are supported.");
      return;
    }

    if (file.size > maxArtworkFileSize) {
      setError("Images must be 10 MB or smaller.");
      return;
    }

    if (!title) {
      setError("Title is required.");
      return;
    }

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    setIsUploading(true);

    try {
      setStatus("Checking sign-in...");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      setStatus("Reading image dimensions...");
      const dimensions = await getImageDimensions(file);

      setStatus("Uploading image...");
      const imagePath = getImagePath(file);
      const { error: uploadError } = await supabase.storage
        .from("artworks")
        .upload(imagePath, file, {
          cacheControl: "31536000",
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(
          "Could not upload the image. Check that you are still signed in.",
        );
      }

      setStatus("Saving artwork...");

      const payload = new FormData();
      payload.set("title", title);
      payload.set("description", description);
      payload.set("tags", tagValue);
      payload.set("image_path", imagePath);
      payload.set("width", String(dimensions.width));
      payload.set("height", String(dimensions.height));

      const result = await createArtworkAction(null, payload);

      if (result?.status !== "success") {
        try {
          await supabase.storage.from("artworks").remove([imagePath]);
        } catch {
          setError(
            "Could not save the artwork, and the uploaded image needs manual cleanup.",
          );
          setIsUploading(false);
          setStatus(null);
          return;
        }

        throw new Error(result?.message || "Could not save the artwork.");
      }

      router.push("/admin/artworks?created=1");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not publish the artwork.",
      );
      setIsUploading(false);
      setStatus(null);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-semibold" htmlFor="image">
          Image
        </label>
        <input
          accept={artworkFileTypes.join(",")}
          aria-describedby="image-help"
          className="mt-2 block w-full cursor-pointer rounded-input border border-border bg-surface-alt px-3 py-2 text-sm text-muted file:mr-4 file:rounded-pill file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-ink hover:file:bg-primary-hover"
          id="image"
          name="image"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? "");
          }}
          required
          type="file"
        />
        <p className="mt-2 text-xs leading-relaxed text-muted" id="image-help">
          JPEG, PNG or WebP. Maximum 10 MB.
          {fileName ? ` Selected: ${fileName}` : ""}
        </p>
      </div>

      <div>
        <label className="text-sm font-semibold" htmlFor="title">
          Title
        </label>
        <input
          className={inputClassName}
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
          id="description"
          maxLength={1000}
          name="description"
          placeholder="Optional context for the lightbox."
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
          id="tags"
          name="tags"
          onChange={(event) => setTags(event.target.value)}
          placeholder="Character, Fanart, Original"
          type="text"
          value={tags}
        />
        <p className="mt-2 text-xs leading-relaxed text-muted" id="tags-help">
          Separate tags with commas. Custom tags get their own Portfolio filter.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {portfolioPage.tagSuggestions.map((tag) => (
            <button
              className="inline-flex min-h-11 items-center rounded-pill border border-border bg-surface px-3 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
              key={tag}
              onClick={() => addSuggestedTag(tag)}
              type="button"
            >
              Add {tag}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p
          className="rounded-card border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div aria-live="polite" className="min-h-6 text-sm text-muted">
        {status}
      </div>

      <Button
        className="w-full sm:w-auto"
        disabled={isUploading}
        type="submit"
      >
        <ImagePlus aria-hidden="true" className="h-4 w-4" />
        {isUploading ? status || "Publishing..." : "Publish artwork"}
      </Button>
    </form>
  );
}
