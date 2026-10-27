"use server";

import { revalidatePath } from "next/cache";
import {
  parseArtworkFields,
  parseArtworkId,
} from "@/lib/admin/artworks";
import { requireAdmin } from "@/lib/admin/session";

function revalidateArtworkPages() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/artworks");
}

export async function createArtworkAction(previousState, formData) {
  const auth = await requireAdmin();

  if (auth.error) {
    return {
      status: "error",
      message: auth.error,
    };
  }

  const parsed = parseArtworkFields(formData);

  if (parsed.error) {
    return {
      status: "error",
      message: parsed.error,
    };
  }

  const { data, error } = await auth.supabase
    .from("artworks")
    .insert(parsed.data)
    .select("id")
    .single();

  if (error) {
    let cleanupFailed = false;

    try {
      const { error: removeError } = await auth.supabase.storage
        .from("artworks")
        .remove([parsed.data.image_path]);
      cleanupFailed = Boolean(removeError);
    } catch {
      cleanupFailed = true;
    }

    return {
      status: "error",
      message: cleanupFailed
        ? "Could not save the artwork, and the uploaded image needs manual cleanup."
        : "Could not save the artwork. The uploaded image was removed.",
    };
  }

  revalidateArtworkPages();

  return {
    status: "success",
    message: "Artwork published.",
    id: data.id,
  };
}

export async function updateArtworkAction(previousState, formData) {
  const auth = await requireAdmin();

  if (auth.error) {
    return {
      status: "error",
      message: auth.error,
    };
  }

  const id = parseArtworkId(formData.get("id"));
  const parsed = parseArtworkFields(formData);

  if (!id) {
    return {
      status: "error",
      message: "Artwork not found.",
    };
  }

  if (parsed.error) {
    return {
      status: "error",
      message: parsed.error,
    };
  }

  const { data, error } = await auth.supabase
    .from("artworks")
    .update(parsed.data)
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      status: "error",
      message: "Could not save the artwork. Please try again.",
    };
  }

  if (!data) {
    return {
      status: "error",
      message: "Artwork not found.",
    };
  }

  revalidateArtworkPages();

  return {
    status: "success",
    message: "Artwork updated.",
  };
}

export async function deleteArtworkAction(artworkId) {
  const auth = await requireAdmin();

  if (auth.error) {
    return {
      status: "error",
      message: auth.error,
    };
  }

  const id = parseArtworkId(artworkId);

  if (!id) {
    return {
      status: "error",
      message: "Artwork not found.",
    };
  }

  const { data, error } = await auth.supabase
    .from("artworks")
    .delete()
    .eq("id", id)
    .select("image_path")
    .maybeSingle();

  if (error) {
    return {
      status: "error",
      message: "Could not delete the artwork. Please try again.",
    };
  }

  if (!data) {
    return {
      status: "error",
      message: "Artwork not found.",
    };
  }

  let cleanupFailed = false;

  try {
    const { error: removeError } = await auth.supabase.storage
      .from("artworks")
      .remove([data.image_path]);
    cleanupFailed = Boolean(removeError);
  } catch {
    cleanupFailed = true;
  }

  revalidateArtworkPages();

  return {
    status: "success",
    message: "Artwork deleted.",
    warning: cleanupFailed
      ? "The artwork row was deleted, but the storage file could not be removed."
      : null,
  };
}
