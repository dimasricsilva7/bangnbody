import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { formatBRL } from "@/lib/format";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminOrdersPage() {
  const { data: orders, connected } = await safeQuery(
    () => prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Pedidos</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["#", "Data", "Cliente", "Valor", "Status"]}
        rows={orders.map((o) => [
          o.number,
          o.createdAt.toLocaleDateString("pt-BR"),
          o.customerName,
          formatBRL(Number(o.total)),
          o.status,
        ])}
        emptyLabel="Nenhum pedido ainda. Os pedidos aparecem aqui assim que os webhooks de pagamento forem configurados."
      />
    </div>
  );
}
