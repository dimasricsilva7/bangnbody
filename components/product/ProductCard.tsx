"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatBRL, formatSavings } from "@/lib/format";
import { badgeLabels, type DemoBadge } from "@/lib/demo-data";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  slug: string;
  name: string;
  subtitle?: string;
  badge?: DemoBadge;
  price: number;
  compareAtPrice?: number;
  reviewCount?: number;
  rating?: number;
  image: string;
  checkoutUrl?: string;
  className?: string;
};

export function ProductCard({
  slug,
  name,
  subtitle,
  badge,
  price,
  compareAtPrice,
  reviewCount = 0,
  rating = 5,
  image,
  checkoutUrl,
  className,
}: ProductCardProps) {
  const addLine = useCartStore((s) => s.addLine);
  const onSale = !!compareAtPrice && compareAtPrice > price;
  const isPreOrder = badge === "PRE_VENDA";
  const discountPct = onSale ? Math.round(((compareAtPrice! - price) / compareAtPrice!) * 100) : 0;

  return (
    <div className={cn("group flex w-full flex-none flex-col text-center", className)}>
      <Link href={`/produto/${slug}`} className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-cream">
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {onSale && (
            <span className="rounded-full bg-accent-dark px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-ink">
              Economize {formatSavings(compareAtPrice!, price)}
            </span>
          )}
          {badge && (
            <span className="rounded-full bg-accent-dark px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-ink">
              {badgeLabels[badge]}
            </span>
          )}
        </div>
        {onSale && (
          <span className="absolute right-3 top-3 z-10 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-accent-dark text-[11px] font-semibold leading-tight text-ink">
            {discountPct}%
            <span className="text-[9px] font-normal">OFF</span>
          </span>
        )}
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col items-center px-2">
        {subtitle && <p className="text-[11px] uppercase tracking-wide text-ink-soft">{subtitle}</p>}
        <Link href={`/produto/${slug}`} className="mt-1 text-sm font-medium uppercase tracking-wide text-ink">
          {name}
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className={cn("flex items-center gap-0.5", reviewCount === 0 && "opacity-30")}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className="text-accent-dark"
                fill={i < rating ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-[11px] text-ink-soft">
            {reviewCount > 0 ? `${reviewCount.toLocaleString("pt-BR")} avaliações` : "0 avaliações"}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm">
          {onSale && <span className="text-ink-soft line-through">{formatBRL(compareAtPrice!)}</span>}
          <span className="font-medium text-ink">{formatBRL(price)}</span>
        </div>

        <button
          type="button"
          onClick={() =>
            addLine({
              id: `product:${slug}`,
              productId: slug,
              name,
              variantName: subtitle,
              image,
              price,
              checkoutUrl,
            })
          }
          className="mt-3 w-full max-w-[220px] rounded-full bg-accent px-6 py-2.5 text-[12px] font-medium uppercase tracking-wide text-ink transition-colors hover:bg-accent-dark"
        >
          {isPreOrder ? "Pré-Venda" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  );
}
