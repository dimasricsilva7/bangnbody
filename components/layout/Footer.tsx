import Link from "next/link";

const columns = [
  {
    title: "Loja",
    links: [
      { label: "Todos os Produtos", href: "/produtos" },
      { label: "Mais Vendidos", href: "/categoria/mais-vendidos" },
      { label: "Kits e Ofertas", href: "/categoria/kits-ofertas" },
      { label: "Monte sua Rotina", href: "/rotina" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Fale Conosco", href: "/contato" },
      { label: "Perguntas Frequentes", href: "/faq" },
      { label: "Rastrear Pedido", href: "/conta/pedidos" },
      { label: "Trocas e Devoluções", href: "/politicas/trocas-devolucoes" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre Nós", href: "/sobre/nossa-historia" },
      { label: "Nossos Ingredientes", href: "/sobre/ingredientes" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Políticas",
    links: [
      { label: "Política de Privacidade", href: "/politicas/privacidade" },
      { label: "Termos de Serviço", href: "/politicas/termos" },
      { label: "Política de Envio", href: "/politicas/envio" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <p className="text-lg font-semibold uppercase tracking-[0.15em] text-ink">Bangn Body</p>
            <p className="mt-3 max-w-xs text-[13px] text-ink-soft">
              Skincare natural, firmadora e iluminadora — criada para quem quer cuidar da pele sem
              abrir mão de resultado real.
            </p>
            <div className="mt-5 flex items-center gap-4 text-[12px] font-medium uppercase tracking-wide text-ink-soft">
              <Link href="https://facebook.com" target="_blank" className="hover:text-ink">
                Facebook
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-ink">
                Instagram
              </Link>
              <Link href="https://tiktok.com" target="_blank" className="hover:text-ink">
                TikTok
              </Link>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] text-ink-soft hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-soft pt-8 text-[12px] text-ink-soft md:flex-row">
          <p>&copy; {new Date().getFullYear()} Bangn Body. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 uppercase tracking-wide">
            <span className="rounded border border-border-soft px-2 py-1">Pix</span>
            <span className="rounded border border-border-soft px-2 py-1">Visa</span>
            <span className="rounded border border-border-soft px-2 py-1">Mastercard</span>
            <span className="rounded border border-border-soft px-2 py-1">Boleto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
