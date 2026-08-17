import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminAuditPage() {
  const { data: logs, connected } = await safeQuery(
    () => prisma.adminAuditLog.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { admin: true } }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Auditoria</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Data", "Admin", "Ação", "Entidade"]}
        rows={logs.map((l) => [
          l.createdAt.toLocaleString("pt-BR"),
          l.admin.name,
          l.action,
          `${l.entity}${l.entityId ? ` #${l.entityId.slice(0, 8)}` : ""}`,
        ])}
        emptyLabel="Nenhuma ação registrada ainda."
      />
    </div>
  );
}
