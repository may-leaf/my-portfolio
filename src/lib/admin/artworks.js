const imagePathPattern =
  /^uploads\/\d{4}\/\d{2}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

export const maxArtworkFileSize = 10 * 1024 * 1024;

export const artworkFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export function parseArtworkFields(formData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const rawTags = String(formData.get("tags") ?? "");
  const imagePath = String(formData.get("image_path") ?? "").trim();
  const width = Number.parseInt(String(formData.get("width") ?? ""), 10);
  const height = Number.parseInt(String(formData.get("height") ?? ""), 10);

  const tagMap = new Map();

  rawTags
    .split(",")
    .map((tag) => tag.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .forEach((tag) => {
      const key = tag.toLowerCase();

      if (!tagMap.has(key)) {
        tagMap.set(key, tag);
      }
    });

  const tags = Array.from(tagMap.values());

  if (!title || title.length > 120) {
    return {
      error: "Title is required and must be 120 characters or fewer.",
    };
  }

  if (description.length > 1000) {
    return {
      error: "Description must be 1000 characters or fewer.",
    };
  }

  if (tags.length > 12 || tags.some((tag) => tag.length > 40)) {
    return {
      error: "Use up to 12 tags, each 40 characters or fewer.",
    };
  }

  if (!imagePathPattern.test(imagePath)) {
    return {
      error: "The uploaded image path is not valid.",
    };
  }

  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    width > 20000 ||
    height > 20000
  ) {
    return {
      error: "Image dimensions could not be verified.",
    };
  }

  return {
    data: {
      title,
      description,
      tags,
      image_path: imagePath,
      width,
      height,
    },
  };
}

export function parseArtworkId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}
