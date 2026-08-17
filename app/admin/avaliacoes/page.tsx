import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminReviewsPage() {
  const { data: reviews, connected } = await safeQuery(
    () => prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Avaliações</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Cliente", "Nota", "Título", "Verificado", "Aprovado"]}
        rows={reviews.map((r) => [
          r.customerName,
          "★".repeat(r.rating),
          r.title ?? "—",
          r.verified ? "Sim" : "Não",
          r.approved ? "Sim" : "Não",
        ])}
        emptyLabel="Nenhuma avaliação enviada ainda."
      />
    </div>
  );
}
