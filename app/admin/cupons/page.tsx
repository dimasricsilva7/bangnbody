import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminCouponsPage() {
  const { data: coupons, connected } = await safeQuery(
    () => prisma.coupon.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Cupons</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Código", "Tipo", "Valor", "Usos", "Ativo"]}
        rows={coupons.map((c) => [
          c.code,
          c.type,
          String(c.value),
          `${c.uses}${c.maxUses ? ` / ${c.maxUses}` : ""}`,
          c.active ? "Sim" : "Não",
        ])}
        emptyLabel="Nenhum cupom criado ainda. Tipos: percentual, valor fixo, frete grátis."
      />
    </div>
  );
}
