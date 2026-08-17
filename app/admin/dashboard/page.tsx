import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { catalog } from "@/lib/catalog";
import { formatBRL } from "@/lib/format";
import { DbBanner } from "@/components/admin/DbBanner";

export default async function AdminDashboardPage() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { data: stats, connected } = await safeQuery(
    async () => {
      const [ordersToday, paidToday, pendingToday, cancelledToday, newCustomers] = await Promise.all([
        prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
        prisma.order.count({ where: { createdAt: { gte: startOfDay }, status: "PAGO" } }),
        prisma.order.count({ where: { createdAt: { gte: startOfDay }, status: "AGUARDANDO_PAGAMENTO" } }),
        prisma.order.count({ where: { createdAt: { gte: startOfDay }, status: "CANCELADO" } }),
        prisma.customer.count({ where: { createdAt: { gte: startOfDay } } }),
      ]);
      const revenueAgg = await prisma.order.aggregate({
        where: { createdAt: { gte: startOfDay }, status: "PAGO" },
        _sum: { total: true },
      });
      return {
        ordersToday,
        paidToday,
        pendingToday,
        cancelledToday,
        newCustomers,
        revenueToday: Number(revenueAgg._sum.total ?? 0),
      };
    },
    {
      ordersToday: 0,
      paidToday: 0,
      pendingToday: 0,
      cancelledToday: 0,
      newCustomers: 0,
      revenueToday: 0,
    }
  );

  const cards = [
    { label: "Vendas Hoje", value: formatBRL(stats.revenueToday) },
    { label: "Pedidos Hoje", value: stats.ordersToday },
    { label: "Pedidos Pagos", value: stats.paidToday },
    { label: "Pedidos Pendentes", value: stats.pendingToday },
    { label: "Pedidos Cancelados", value: stats.cancelledToday },
    { label: "Clientes Novos", value: stats.newCustomers },
    { label: "Produtos no Catálogo", value: catalog.length },
    { label: "Produtos Mais Vendidos", value: catalog.filter((c) => c.badge === "MAIS_VENDIDO").length },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold uppercase tracking-wide text-ink">Dashboard</h1>
      <DbBanner connected={connected} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border-soft bg-white p-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-ink-soft">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border-soft bg-white p-5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-soft">Comparação</p>
        <p className="mt-2 text-[13px] text-ink-soft">
          Hoje x Ontem, Este Mês x Mês Anterior e 7/30 dias ficam disponíveis assim que houver pedidos reais no
          banco.
        </p>
      </div>
    </div>
  );
}
