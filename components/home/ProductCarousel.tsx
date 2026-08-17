"use client";

import { ProductCard } from "@/components/product/ProductCard";
import type { DemoBadge } from "@/lib/demo-data";

type CarouselProduct = {
  slug: string;
  name: string;
  subtitle?: string;
  badge?: DemoBadge;
  price: number;
  compareAtPrice?: number;
  reviewCount?: number;
  image: string;
  checkoutUrl?: string;
};

export function ProductCarousel({ products }: { products: readonly CarouselProduct[] }) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:grid-cols-6">
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          {...product}
          className="w-[220px] snap-start md:w-full"
        />
      ))}
    </div>
  );
}
