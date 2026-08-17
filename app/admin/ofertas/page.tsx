import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminDiscountsPage() {
  const { data: discounts, connected } = await safeQuery(
    () => prisma.discount.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Ofertas</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Nome", "Tipo", "Escopo", "Valor", "Ativo"]}
        rows={discounts.map((d) => [d.name, d.type, d.scope, String(d.value), d.active ? "Sim" : "Não"])}
        emptyLabel="Nenhuma oferta criada ainda. Tipos disponíveis: desconto %, valor fixo, preço promocional, bundle, compre X leve Y."
      />
    </div>
  );
}
