export function getContactUrl() {
  const url = process.env.NEXT_PUBLIC_CONTACT_URL;

  if (!url || !url.trim()) {
    return null;
  }

  return url.trim();
}

export function getContactHref() {
  return getContactUrl() || "/commission#contact";
}
