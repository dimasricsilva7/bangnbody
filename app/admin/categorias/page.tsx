import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminCategoriesPage() {
  const { data: categories, connected } = await safeQuery(
    () => prisma.category.findMany({ orderBy: { order: "asc" } }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Categorias</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Nome", "Slug", "Status", "Ordem"]}
        rows={categories.map((c) => [c.name, c.slug, c.status, c.order])}
        emptyLabel="Nenhuma categoria no banco ainda. Rode o seed para importar as categorias demo."
      />
    </div>
  );
}
