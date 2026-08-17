"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { toCarouselItem, type CatalogItem } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "mais-avaliados";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevancia", label: "Relevância" },
  { key: "menor-preco", label: "Menor Preço" },
  { key: "maior-preco", label: "Maior Preço" },
  { key: "mais-avaliados", label: "Mais Avaliados" },
];

export function CatalogGrid({ items, title }: { items: CatalogItem[]; title: string }) {
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [onlyOnSale, setOnlyOnSale] = useState(false);

  const cards = useMemo(() => items.map(toCarouselItem), [items]);

  const filtered = useMemo(() => {
    let result = onlyOnSale ? cards.filter((c) => c.compareAtPrice && c.compareAtPrice > c.price) : cards;
    result = [...result];
    if (sort === "menor-preco") result.sort((a, b) => a.price - b.price);
    if (sort === "maior-preco") result.sort((a, b) => b.price - a.price);
    if (sort === "mais-avaliados") result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    return result;
  }, [cards, sort, onlyOnSale]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-border-soft pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium uppercase tracking-wide text-ink md:text-3xl">{title}</h1>
          <p className="mt-1 text-[12px] text-ink-soft">{filtered.length} produtos</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOnlyOnSale((v) => !v)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-wide transition-colors",
              onlyOnSale ? "border-ink bg-ink text-white" : "border-border-soft text-ink-soft hover:border-ink hover:text-ink"
            )}
          >
            Somente em oferta
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border-soft px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-ink outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                Ordenar: {opt.label}
              </option>
            ))}
          </select>

          {onlyOnSale && (
            <button
              type="button"
              onClick={() => setOnlyOnSale(false)}
              className="text-[11px] font-medium uppercase tracking-wide text-ink-soft underline"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-soft">Nenhum produto encontrado com esses filtros.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
