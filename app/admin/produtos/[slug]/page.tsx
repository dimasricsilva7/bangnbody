import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductEditForm } from "@/components/admin/ProductEditForm";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await prisma.product.findUnique({ where: { slug } });
  } catch {
    return (
      <div className="rounded-xl border border-border-soft bg-white p-8 text-center text-sm text-ink-soft">
        Banco de dados não conectado. Configure <code className="rounded bg-cream px-1.5 py-0.5">DATABASE_URL</code> para
        editar produtos.
      </div>
    );
  }

  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">{product.name}</h1>
      <ProductEditForm
        productId={product.id}
        price={Number(product.price)}
        compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : undefined}
        stock={product.stock}
        status={product.status}
        checkoutUrl={product.checkoutUrl ?? ""}
      />
    </div>
  );
}
