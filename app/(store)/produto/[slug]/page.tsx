import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalog, getCatalogItem, relatedItems } from "@/lib/catalog";
import { reviewsWithPhotos } from "@/lib/demo-data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { Accordion } from "@/components/product/Accordion";
import { RatingBreakdown } from "@/components/product/RatingBreakdown";
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
    description: item.description,
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

  const accordionItems =
    item.kind === "produto"
      ? [
          {
            title: "Saiba Mais",
            content: (
              <ul className="list-disc space-y-1.5 pl-4">
                {item.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ),
          },
          { title: "Modo de Uso", content: item.howToUse },
          {
            title: "Ingredientes",
            content: (
              <dl className="space-y-3">
                {item.ingredients.map((ing) => (
                  <div key={ing.name}>
                    <dt className="text-[12px] font-medium uppercase tracking-wide text-ink">{ing.name}</dt>
                    <dd className="mt-0.5">{ing.description}</dd>
                  </div>
                ))}
              </dl>
            ),
          },
        ]
      : [
          {
            title: "O Que Está Incluso",
            content: (
              <ul className="list-disc space-y-1.5 pl-4">
                {item.includes.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ),
          },
          {
            title: "Fragrância e Economia",
            content: (
              <p>
                Fragrância: {item.fragrance}. De {formatBRL(item.compareAtPrice)} por {formatBRL(item.price)}{" "}
                comprando o kit completo.
              </p>
            ),
          },
        ];

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-6 text-[11px] uppercase tracking-wide text-ink-soft">
        Início / {item.kind === "produto" ? item.category : "Kits e Ofertas"} / {item.name}
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery images={item.gallery} name={item.name} />

        <div>
          {item.kind === "produto" ? (
            <ProductBuyBox
              slug={item.slug}
              name={item.name}
              subtitle={item.subtitle}
              description={item.description}
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
              description={item.description}
              badge={item.badge}
              reviewCount={item.reviewCount}
              options={[{ label: "Kit", price: item.price, compareAtPrice: item.compareAtPrice, sku: item.slug }]}
              image={item.image}
            />
          )}

          <div className="mt-8">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[720px]">
        <h2 className="mb-6 text-center font-display text-2xl font-medium text-ink">Avaliações e Resultados</h2>
        <RatingBreakdown reviewCount={item.reviewCount} />

        {productReviews.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {productReviews.map((review) => (
              <article key={review.title} className="rounded-2xl border border-border-soft p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">{review.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{review.comment}</p>
                <p className="mt-3 text-[12px] font-medium text-ink">{review.author}</p>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-20">
        <h2 className="mb-8 text-center font-display text-2xl font-medium text-ink">Compre Também</h2>
        <ProductCarousel products={related} />
      </div>
    </main>
  );
}
