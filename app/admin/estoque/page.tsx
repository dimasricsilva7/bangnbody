import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminInventoryPage() {
  const { data: products, connected } = await safeQuery(
    () => prisma.product.findMany({ orderBy: { stock: "asc" } }),
    []
  );

  const lowStock = products.filter((p) => p.stock <= p.minStock);

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold uppercase tracking-wide text-ink">Estoque</h1>
      {lowStock.length > 0 && (
        <p className="mb-4 text-[13px] text-sale">{lowStock.length} produto(s) com estoque baixo ou zerado.</p>
      )}
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Produto", "SKU", "Estoque", "Estoque Mínimo", "Status"]}
        rows={products.map((p) => [
          p.name,
          p.sku,
          p.stock,
          p.minStock,
          p.stock === 0 ? "Sem Estoque" : p.stock <= p.minStock ? "Estoque Baixo" : "OK",
        ])}
        emptyLabel="Nenhum produto no banco ainda."
      />
    </div>
  );
}
