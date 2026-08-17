import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";
import { BannerForm } from "@/components/admin/BannerForm";

export default async function AdminBannersPage() {
  const { data: banners, connected } = await safeQuery(
    () => prisma.banner.findMany({ orderBy: { order: "asc" } }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Banners</h1>
      <DbBanner connected={connected} />
      <BannerForm />
      <AdminTable
        columns={["Título", "Link", "Ordem", "Status"]}
        rows={banners.map((b) => [b.title ?? "—", b.link ?? "—", b.order, b.status])}
        emptyLabel="Nenhum banner cadastrado ainda."
      />
    </div>
  );
}
