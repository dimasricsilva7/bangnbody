import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { formatBRL } from "@/lib/format";
import { DbBanner } from "@/components/admin/DbBanner";

export default async function AdminProductsPage() {
  const { data: products, connected } = await safeQuery(
    () => prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold uppercase tracking-wide text-ink">Produtos</h1>
        <span className="text-[12px] text-ink-soft">{products.length} produtos no banco</span>
      </div>

      <DbBanner connected={connected} />

      {products.length === 0 ? (
        <div className="rounded-xl border border-border-soft bg-white p-8 text-center">
          <p className="text-sm text-ink-soft">
            Nenhum produto no banco ainda. Rode <code className="rounded bg-cream px-1.5 py-0.5">npx prisma db seed</code>{" "}
            para importar o catálogo demo (definido em <code className="rounded bg-cream px-1.5 py-0.5">lib/catalog.ts</code>) para o Postgres.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border-soft bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-border-soft text-[11px] uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Estoque</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Link de Checkout</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border-soft last:border-none">
                  <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{p.sku}</td>
                  <td className="px-4 py-3">{formatBRL(Number(p.price))}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">{p.status}</td>
                  <td className="px-4 py-3">
                    {p.checkoutUrl ? (
                      <span className="text-[11px] text-ink-soft">configurado</span>
                    ) : (
                      <span className="text-[11px] text-sale">não configurado</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/produtos/${p.slug}`} className="text-[12px] font-medium text-ink underline">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
