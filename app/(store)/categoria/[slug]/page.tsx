import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalog } from "@/lib/catalog";
import { findCategory, categoryDefs } from "@/lib/categories";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";

type Params = { slug: string };

export function generateStaticParams() {
  return categoryDefs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return {};
  return { title: `${category.label} | Sua Marca` };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const items = catalog.filter((item) => {
    if ("kitsOnly" in category && category.kitsOnly) return item.kind === "kit";
    if ("bestSellersOnly" in category && category.bestSellersOnly) return item.badge === "MAIS_VENDIDO";
    return item.kind === "produto" && category.match(item.category);
  });

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <CatalogGrid items={items} title={category.label} />
    </main>
  );
}
