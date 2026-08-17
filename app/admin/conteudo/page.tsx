const staticPages = [
  { label: "Sobre Nós", href: "/sobre/nossa-historia" },
  { label: "Nossos Ingredientes", href: "/sobre/ingredientes" },
  { label: "FAQ", href: "/faq" },
  { label: "Política de Privacidade", href: "/politicas/privacidade" },
  { label: "Termos de Serviço", href: "/politicas/termos" },
  { label: "Política de Envio", href: "/politicas/envio" },
  { label: "Trocas e Devoluções", href: "/politicas/trocas-devolucoes" },
];

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold uppercase tracking-wide text-ink">Conteúdo</h1>
      <p className="mb-6 text-[13px] text-ink-soft">
        Páginas institucionais e de blog. A edição de texto rico fica disponível assim que o banco estiver conectado.
      </p>
      <div className="overflow-hidden rounded-xl border border-border-soft bg-white">
        {staticPages.map((page) => (
          <div key={page.href} className="flex items-center justify-between border-b border-border-soft px-5 py-4 last:border-none">
            <p className="text-[13px] font-medium text-ink">{page.label}</p>
            <span className="text-[11px] text-ink-soft">{page.href}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
