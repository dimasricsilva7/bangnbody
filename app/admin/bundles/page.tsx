import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { formatBRL } from "@/lib/format";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminBundlesPage() {
  const { data: bundles, connected } = await safeQuery(
    () => prisma.bundle.findMany({ orderBy: { createdAt: "desc" } }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Bundles</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Nome", "Preço", "Estoque", "Status"]}
        rows={bundles.map((b) => [b.name, formatBRL(Number(b.price)), b.stock, b.status])}
        emptyLabel="Nenhum bundle no banco ainda. Rode o seed para importar os kits demo."
      />
    </div>
  );
}
