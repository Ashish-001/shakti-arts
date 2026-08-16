export const CATEGORIES = [
  { slug: "wide-leg", label: "Wide-Leg" },
  { slug: "flared", label: "Flared" },
  { slug: "embroidered", label: "Embroidered & Cutwork" },
  { slug: "metallic-wash", label: "Metallic Wash" },
  { slug: "skirts", label: "Denim Skirts" },
  { slug: "avant-garde", label: "Avant-Garde" },
];

export function categoryLabel(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
