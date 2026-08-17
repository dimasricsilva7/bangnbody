import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { AdminTable } from "@/components/admin/AdminTable";

export default async function AdminCustomersPage() {
  const { data: customers, connected } = await safeQuery(
    () => prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    []
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Clientes</h1>
      <DbBanner connected={connected} />
      <AdminTable
        columns={["Nome", "E-mail", "Telefone", "Cadastro"]}
        rows={customers.map((c) => [c.name, c.email, c.phone ?? "—", c.createdAt.toLocaleDateString("pt-BR")])}
        emptyLabel="Nenhum cliente cadastrado ainda."
      />
    </div>
  );
}
