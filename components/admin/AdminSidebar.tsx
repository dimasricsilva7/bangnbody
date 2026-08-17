"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";

const navGroups = [
  {
    items: [{ label: "Dashboard", href: "/admin/dashboard" }],
  },
  {
    title: "Vendas",
    items: [
      { label: "Pedidos", href: "/admin/pedidos" },
      { label: "Clientes", href: "/admin/clientes" },
      { label: "Cupons", href: "/admin/cupons" },
    ],
  },
  {
    title: "Catálogo",
    items: [
      { label: "Produtos", href: "/admin/produtos" },
      { label: "Categorias", href: "/admin/categorias" },
      { label: "Bundles", href: "/admin/bundles" },
      { label: "Ofertas", href: "/admin/ofertas" },
      { label: "Estoque", href: "/admin/estoque" },
      { label: "Avaliações", href: "/admin/avaliacoes" },
    ],
  },
  {
    title: "Site",
    items: [
      { label: "Banners", href: "/admin/banners" },
      { label: "Home", href: "/admin/home" },
      { label: "Conteúdo", href: "/admin/conteudo" },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Configurações", href: "/admin/configuracoes" },
      { label: "Auditoria", href: "/admin/auditoria" },
    ],
  },
];

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-none flex-col border-r border-border-soft bg-white">
      <div className="border-b border-border-soft px-5 py-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink">Sua Marca</p>
        <p className="text-[11px] text-ink-soft">Painel Admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group, i) => (
          <div key={i} className="mb-5">
            {group.title && (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
                {group.title}
              </p>
            )}
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-cream",
                  pathname?.startsWith(item.href) && "bg-cream"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-border-soft px-5 py-4">
        <p className="mb-2 truncate text-[12px] text-ink-soft">{adminName}</p>
        <form action={logoutAction}>
          <button type="submit" className="text-[12px] font-medium uppercase tracking-wide text-sale">
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
