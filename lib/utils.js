// lib/utils.js - Utility functions

/**
 * Konwertuje WordPress path na Next.js slug
 * '/evtradnew/realizacje-2/' → 'realizacje-2'
 */
export function pathToSlug(path) {
  if (!path) return "";

  // Usuń początkowy i końcowy slash oraz prefix
  const cleanPath = path.replace(/^\/evtradnew\//, "").replace(/\/$/, "");

  // Jeśli to strona główna
  if (cleanPath === "" || cleanPath === "evtradnew") {
    return "";
  }

  return cleanPath;
}

/**
 * Konwertuje slug na title dla layout
 * 'realizacje-2' → 'Realizacje'
 */
export function slugToTitle(slug) {
  if (!slug) return "Strona Główna";

  return (
    slug
      .split("-")[0] // Weź pierwszą część przed myślnikiem
      .charAt(0)
      .toUpperCase() + slug.split("-")[0].slice(1)
  );
}

/**
 * Pobiera menu items z przygotowanymi slugami
 */
export function prepareMenuItems(menuItems) {
  return menuItems.map((item) => ({
    ...item,
    slug: pathToSlug(item.path),
    title: slugToTitle(pathToSlug(item.path)),
  }));
}

// Inne funkcje narzędziowe mogą być dodane tutaj w przyszłości
