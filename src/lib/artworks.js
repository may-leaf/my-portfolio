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

export async function fetchArtworkTags() {
  const client = getSupabaseClient();

  if (!client) {
    return {
      tags: ["All"],
      error: null,
      configured: false,
    };
  }

  const { data, error } = await client.rpc("get_artwork_tags");

  if (error) {
    return {
      tags: ["All"],
      error: error.message,
      configured: true,
    };
  }

  const seenTags = new Set();
  const tags = [];

  (data ?? []).forEach((row) => {
    const tag = typeof row.tag === "string" ? row.tag.trim() : "";

    if (!tag) {
      return;
    }

    const key = tag.toLowerCase();

    if (!seenTags.has(key)) {
      seenTags.add(key);
      tags.push(tag);
    }
  });

  tags.sort((a, b) => a.localeCompare(b));

  return {
    tags: ["All", ...tags],
    error: null,
    configured: true,
  };
}

export async function fetchArtworkById(id) {
  const client = getSupabaseClient();

  if (!client) {
    return {
      artwork: null,
      error: null,
      configured: false,
    };
  }

  const { data, error } = await client
    .from("artworks")
    .select(artworkColumns)
    .eq("id", id)
    .maybeSingle();

  return {
    artwork: data ? mapArtwork(data) : null,
    error: error?.message ?? null,
    configured: true,
  };
}

export async function fetchAdminArtworks({ page = 1, pageSize = 24 } = {}) {
  const client = getSupabaseClient();

  if (!client) {
    return {
      artworks: [],
      total: 0,
      error: null,
      configured: false,
    };
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await client
    .from("artworks")
    .select(artworkColumns, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  return {
    artworks: (data ?? []).map(mapArtwork),
    total: count ?? 0,
    error: error?.message ?? null,
    configured: true,
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
