export const TRANSITION_LABELS = {
  "/": "HOME",
  "/portfolio": "ARCHIVE",
  "/commission": "COMMISSION",
  "/terms": "PROTOCOL",
};

export function getTransitionLabel(pathname) {
  if (!pathname) {
    return "PAGE";
  }

  if (TRANSITION_LABELS[pathname]) {
    return TRANSITION_LABELS[pathname];
  }

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, " ").toUpperCase());

  if (segments.length === 0) {
    return "HOME";
  }

  return segments[segments.length - 1];
}

export function getRouteIndex(pathname) {
  const routes = ["/", "/portfolio", "/commission", "/terms"];
  const index = routes.indexOf(pathname);

  if (index === -1) {
    for (let i = 0; i < routes.length; i++) {
      if (pathname.startsWith(routes[i]) && routes[i] !== "/") {
        return i + 1;
      }
    }
    return routes.length;
  }

  return index + 1;
}