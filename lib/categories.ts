export const categoryDefs = [
  { slug: "locoes-oleos", label: "Loções e Óleos", match: (cat: string) => cat === "Loções e Óleos" },
  { slug: "limpeza-esfoliacao", label: "Limpeza e Esfoliação", match: (cat: string) => cat === "Limpeza e Esfoliação" },
  { slug: "serums-mascaras", label: "Séruns e Máscaras", match: (cat: string) => cat === "Séruns e Máscaras" },
  { slug: "gloss-balms", label: "Gloss Balms", match: (cat: string) => cat === "Gloss Balms" },
  { slug: "kits-ofertas", label: "Kits e Ofertas", match: () => true, kitsOnly: true },
  { slug: "mais-vendidos", label: "Mais Vendidos", match: () => true, bestSellersOnly: true },
] as const;

export function findCategory(slug: string) {
  return categoryDefs.find((c) => c.slug === slug);
}
