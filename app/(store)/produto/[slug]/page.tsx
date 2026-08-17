import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalog, getCatalogItem, relatedItems } from "@/lib/catalog";
import { reviewsWithPhotos } from "@/lib/demo-data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { formatBRL } from "@/lib/format";

type Params = { slug: string };

export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) return {};
  return {
    title: `${item.name} | Sua Marca`,
    description: item.kind === "produto" ? item.description : item.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();

  const related = relatedItems(item, 6).map((r) => ({
    slug: r.slug,
    name: r.name,
    subtitle: r.subtitle,
    badge: r.badge,
    price: r.kind === "produto" ? r.sizes[0].price : r.price,
    compareAtPrice: r.kind === "produto" ? r.sizes[0].compareAtPrice : r.compareAtPrice,
    reviewCount: r.reviewCount,
    image: r.image,
  }));

  const productReviews = reviewsWithPhotos.filter((rv) =>
    rv.productsUsed.some((p) => item.name.toLowerCase().includes(p.toLowerCase().split(" ")[0]))
  );

  const price = item.kind === "produto" ? item.sizes[0].price : item.price;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: item.gallery,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating:
      item.reviewCount > 0
        ? { "@type": "AggregateRating", ratingValue: "5", reviewCount: item.reviewCount }
        : undefined,
  };

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 text-[11px] uppercase tracking-wide text-ink-soft">
        Início / {item.kind === "produto" ? item.category : "Kits e Ofertas"} / {item.name}
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery images={item.gallery} name={item.name} />

        {item.kind === "produto" ? (
          <ProductBuyBox
            slug={item.slug}
            name={item.name}
            subtitle={item.subtitle}
            badge={item.badge}
            reviewCount={item.reviewCount}
            options={item.sizes}
            image={item.image}
          />
        ) : (
          <ProductBuyBox
            slug={item.slug}
            name={item.name}
            subtitle={item.subtitle}
            badge={item.badge}
            reviewCount={item.reviewCount}
            options={[{ label: "Kit", price: item.price, compareAtPrice: item.compareAtPrice, sku: item.slug }]}
            image={item.image}
          />
        )}
      </div>

      <div className="mx-auto mt-16 grid max-w-[840px] grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">Descrição</h2>
          <p className="text-[13px] leading-relaxed text-ink-soft">{item.description}</p>

          {item.kind === "produto" && (
            <>
              <h2 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-ink">Benefícios</h2>
              <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-ink-soft">
                {item.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </>
          )}

          {item.kind === "kit" && (
            <>
              <h2 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-ink">O que está incluso</h2>
              <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-ink-soft">
                {item.includes.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div>
          {item.kind === "produto" && (
            <>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">Modo de Uso</h2>
              <p className="text-[13px] leading-relaxed text-ink-soft">{item.howToUse}</p>

              <h2 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-ink">Ingredientes</h2>
              <dl className="space-y-3">
                {item.ingredients.map((ing) => (
                  <div key={ing.name}>
                    <dt className="text-[12px] font-medium uppercase tracking-wide text-ink">{ing.name}</dt>
                    <dd className="text-[13px] leading-relaxed text-ink-soft">{ing.description}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          {item.kind === "kit" && (
            <>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">Fragrância</h2>
              <p className="text-[13px] text-ink-soft">{item.fragrance}</p>
              <h2 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-ink">Economia</h2>
              <p className="text-[13px] text-ink-soft">
                De {formatBRL(item.compareAtPrice)} por {formatBRL(item.price)} comprando o kit completo.
              </p>
            </>
          )}
        </div>
      </div>

      {productReviews.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-medium text-ink">Avaliações deste produto</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productReviews.map((review) => (
              <article key={review.title} className="rounded-2xl border border-border-soft p-6 text-center">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">{review.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{review.comment}</p>
                <p className="mt-3 text-[12px] font-medium text-ink">{review.author}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-medium text-ink">Compre Também</h2>
        <ProductCarousel products={related} />
      </div>
    </main>
  );
}
