import { getSupabaseClient } from "@/lib/supabase";

const artworkColumns =
  "id,title,description,tags,image_path,width,height,created_at";

export function getArtworkImageUrl(imagePath) {
  if (!imagePath) {
    return null;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const client = getSupabaseClient();

  if (!client) {
    return null;
  }

  return client.storage.from("artworks").getPublicUrl(imagePath).data.publicUrl;
}

export function mapArtwork(row) {
  return {
    ...row,
    image_url: getArtworkImageUrl(row.image_path),
  };
}

export async function fetchArtworks({
  tag = "All",
  offset = 0,
  limit = 20,
} = {}) {
  const client = getSupabaseClient();

  if (!client) {
    return {
      artworks: [],
      hasMore: false,
      error: null,
      configured: false,
    };
  }

  let query = client
    .from("artworks")
    .select(artworkColumns)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit);

  if (tag && tag !== "All") {
    query = query.contains("tags", [tag]);
  }

  const { data, error } = await query;

  if (error) {
    return {
      artworks: [],
      hasMore: false,
      error: error.message,
      configured: true,
    };
  }

  const rows = data ?? [];

  return {
    artworks: rows.slice(0, limit).map(mapArtwork),
    hasMore: rows.length > limit,
    error: null,
    configured: true,
  };
}
