import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminSettingsPage() {
  const { data: settings, connected } = await safeQuery(() => prisma.siteSettings.findMany(), []);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Configurações</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Chave", "Valor"]}
        rows={settings.map((s) => [s.key, JSON.stringify(s.value)])}
        emptyLabel="Nenhuma configuração salva ainda. Nome da loja, logo, moeda e frete grátis ficam aqui."
      />
    </div>
  );
}
