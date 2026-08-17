"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { formatBRL, formatSavings } from "@/lib/format";
import { badgeLabels, type DemoBadge } from "@/lib/demo-data";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

type Option = { label: string; price: number; compareAtPrice?: number; sku: string };

export function ProductBuyBox({
  slug,
  name,
  subtitle,
  badge,
  reviewCount,
  options,
  image,
  checkoutUrl,
}: {
  slug: string;
  name: string;
  subtitle: string;
  badge?: DemoBadge;
  reviewCount: number;
  options: Option[];
  image: string;
  checkoutUrl?: string;
}) {
  const [selected, setSelected] = useState(0);
  const addLine = useCartStore((s) => s.addLine);
  const open = useCartStore((s) => s.open);
  const option = options[selected];
  const onSale = !!option.compareAtPrice && option.compareAtPrice > option.price;

  return (
    <div>
      <p className="text-[12px] uppercase tracking-wide text-ink-soft">{subtitle}</p>
      <h1 className="mt-1 text-2xl font-medium uppercase tracking-wide text-ink md:text-3xl">{name}</h1>

      <div className="mt-3 flex items-center gap-2">
        <div className={cn("flex items-center gap-0.5", reviewCount === 0 && "opacity-30")}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className="text-accent-dark" fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <span className="text-[12px] text-ink-soft">
          {reviewCount > 0 ? `${reviewCount.toLocaleString("pt-BR")} avaliações` : "Seja a primeira a avaliar"}
        </span>
        {badge && (
          <span className="rounded-full bg-accent-dark px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink">
            {badgeLabels[badge]}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {onSale && <span className="text-lg text-ink-soft line-through">{formatBRL(option.compareAtPrice!)}</span>}
        <span className="text-2xl font-medium text-ink">{formatBRL(option.price)}</span>
        {onSale && (
          <span className="rounded-full bg-accent-dark px-2.5 py-1 text-[11px] font-medium uppercase text-ink">
            Economize {formatSavings(option.compareAtPrice!, option.price)}
          </span>
        )}
      </div>

      {options.length > 1 && (
        <div className="mt-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Escolha o tamanho</p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
              <button
                key={opt.sku}
                type="button"
                onClick={() => setSelected(i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[12px] font-medium uppercase tracking-wide transition-colors",
                  selected === i
                    ? "border-ink bg-ink text-white"
                    : "border-border-soft text-ink hover:border-ink"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() =>
            addLine({
              id: `product:${slug}:${option.sku}`,
              productId: slug,
              variantId: option.sku,
              name,
              variantName: `${subtitle} · ${option.label}`,
              image,
              price: option.price,
              checkoutUrl,
            })
          }
          className="w-full rounded-full bg-accent py-3.5 text-[13px] font-medium uppercase tracking-wide text-ink transition-colors hover:bg-accent-dark"
        >
          {badge === "PRE_VENDA" ? "Pré-Venda" : "Adicionar ao Carrinho"}
        </button>
        <button
          type="button"
          onClick={() => {
            addLine({
              id: `product:${slug}:${option.sku}`,
              productId: slug,
              variantId: option.sku,
              name,
              variantName: `${subtitle} · ${option.label}`,
              image,
              price: option.price,
              checkoutUrl,
            });
            open();
          }}
          className="w-full rounded-full border border-ink py-3.5 text-[13px] font-medium uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
}
