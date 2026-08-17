import { catalog, toCarouselItem } from "@/lib/catalog";
import { ProductCarousel } from "@/components/home/ProductCarousel";

export function BestSellers() {
  const bestSellers = catalog.filter((item) => item.badge === "MAIS_VENDIDO").slice(0, 6).map(toCarouselItem);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <div className="mb-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sale">30% Off Mais Vendidos</p>
        <h2 className="mt-2 font-display text-3xl font-medium text-ink md:text-4xl">Mais Vendidos</h2>
      </div>
      <ProductCarousel products={bestSellers} />
    </section>
  );
}
