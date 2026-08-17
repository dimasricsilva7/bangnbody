"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { reviewsWithPhotos } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const filters = [
  { key: "TODOS", label: "Todos" },
  { key: "Cicatrizes", label: "Resultados de Cicatrizes" },
  { key: "Acne", label: "Resultados da Acne" },
  { key: "Queimaduras", label: "Resultados de Queimaduras" },
  { key: "Estrias", label: "Resultados de Estrias" },
  { key: "Textura", label: "Resultados de Textura" },
];

export function Reviews() {
  const [filter, setFilter] = useState("TODOS");
  const filtered =
    filter === "TODOS" ? reviewsWithPhotos : reviewsWithPhotos.filter((r) => r.category === filter);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-medium text-ink md:text-4xl">Avaliações e Resultados</h2>
        <p className="mx-auto mt-2 max-w-lg text-[12px] text-ink-soft">
          Fotos ilustrativas de demonstração. Resultados variam de pessoa para pessoa.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-wide transition-colors",
              filter === f.key
                ? "border-ink bg-ink text-white"
                : "border-border-soft text-ink-soft hover:border-ink hover:text-ink"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((review) => (
          <article key={review.title} className="flex flex-col overflow-hidden rounded-2xl border border-border-soft">
            <div className="grid grid-cols-2">
              <div className="relative aspect-square">
                <Image src={review.photoBefore} alt="Antes" fill sizes="240px" className="object-cover" />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                  Antes
                </span>
              </div>
              <div className="relative aspect-square">
                <Image src={review.photoAfter} alt="Depois" fill sizes="240px" className="object-cover" />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                  Depois
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-center gap-1 text-accent">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">{review.title}</h3>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-soft">{review.comment}</p>
              <div className="mt-4 border-t border-border-soft pt-4">
                <p className="text-[12px] font-medium text-ink">
                  {review.author}
                  {review.verified && <span className="ml-2 text-[10px] text-ink-soft">Compra Verificada</span>}
                </p>
                <p className="mt-1 text-[11px] text-ink-soft">Produtos usados: {review.productsUsed.join(", ")}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
