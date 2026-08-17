"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { useUIStore } from "@/lib/ui-store";
import { catalog, toCarouselItem } from "@/lib/catalog";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

const searchable = catalog.map(toCarouselItem);

export function SearchDrawer() {
  const isOpen = useUIStore((s) => s.searchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? searchable.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    : searchable.slice(0, 4);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-white transition-opacity",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      role="dialog"
      aria-label="Buscar"
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-6 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-3 border-b border-ink pb-3">
            <Search size={18} className="text-ink-soft" />
            <input
              autoFocus={isOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="O que você está procurando?"
              className="w-full text-base text-ink outline-none placeholder:text-ink-soft"
            />
          </div>
          <button type="button" onClick={close} className="ml-6" aria-label="Fechar busca">
            <X size={22} />
          </button>
        </div>

        <div className="mt-8 flex-1 overflow-y-auto pb-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            {query.trim() ? `Resultados para "${query}"` : "Produtos em destaque"}
          </p>

          {results.length === 0 ? (
            <p className="text-sm text-ink-soft">Nenhum produto encontrado. Tente outro termo.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {results.map((product) => (
                <li key={product.slug}>
                  <Link href={`/produto/${product.slug}`} onClick={close} className="block text-center">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
                      <Image src={product.image} alt={product.name} fill sizes="200px" className="object-cover" />
                    </div>
                    <p className="mt-2 text-[12px] font-medium uppercase text-ink">{product.name}</p>
                    <p className="text-[12px] text-ink-soft">{formatBRL(product.price)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
