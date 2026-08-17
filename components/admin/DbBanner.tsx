export function DbBanner({ connected }: { connected: boolean }) {
  if (connected) return null;
  return (
    <div className="mb-6 rounded-lg border border-accent-dark bg-cream px-4 py-3 text-[13px] text-ink">
      <strong>Banco de dados não conectado.</strong> Mostrando dados de demonstração (somente leitura). Adicione{" "}
      <code className="rounded bg-white px-1.5 py-0.5">DATABASE_URL</code> nas variáveis de ambiente e rode{" "}
      <code className="rounded bg-white px-1.5 py-0.5">npx prisma migrate deploy && npx prisma db seed</code> para
      ativar edição real.
    </div>
  );
}
