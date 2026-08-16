export const CATEGORIES = [
  { slug: "jeans", label: "Jeans & Denim" },
  { slug: "trousers", label: "Trousers & Pants" },
  { slug: "skirts", label: "Skirts & Dresses" },
  { slug: "tops", label: "Tops & Shirts" },
  { slug: "jackets", label: "Jackets & Outerwear" },
  { slug: "accessories", label: "Accessories" },
];

export function categoryLabel(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
