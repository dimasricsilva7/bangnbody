"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Caveat } from "next/font/google";
import { Menu, Search, User, ShoppingBag, Truck, Gift } from "lucide-react";
import { megaMenu, navLinks, siteSettings } from "@/lib/demo-data";
import { useUIStore } from "@/lib/ui-store";
import { useCartStore, cartCount } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const logoFont = Caveat({ subsets: ["latin"], weight: ["700"] });

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const openMobileMenu = useUIStore((s) => s.openMobileMenu);
  const openSearch = useUIStore((s) => s.openSearch);
  const openCart = useCartStore((s) => s.open);
  const lines = useCartStore((s) => s.lines);
  const count = cartCount(lines);

  return (
    <div className="sticky top-0 z-40">
      <AnnouncementBar />
      <header className="border-b border-border-soft bg-white">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-4 md:px-8">
          <button
            type="button"
            onClick={openMobileMenu}
            className="flex items-center justify-center md:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className={cn("flex items-center gap-2 text-3xl leading-none text-ink", logoFont.className)}
          >
            {siteSettings.logoUrl ? (
              <Image src={siteSettings.logoUrl} alt={siteSettings.storeName} width={150} height={40} />
            ) : (
              siteSettings.storeName
            )}
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            onMouseLeave={() => setOpenMenu(null)}
          >
            {Object.entries(megaMenu).map(([key, menu]) => (
              <div key={key} className="relative" onMouseEnter={() => setOpenMenu(key)}>
                <button
                  type="button"
                  className={cn(
                    "py-6 text-[13px] font-medium uppercase tracking-wide text-ink transition-colors hover:text-ink-soft",
                    openMenu === key && "text-ink-soft"
                  )}
                >
                  {menu.label}
                </button>

                {openMenu === key && (
                  <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 border border-border-soft bg-white p-8 shadow-xl">
                    <div className="grid grid-cols-2 gap-8">
                      {menu.columns.map((col) => (
                        <div key={col.title}>
                          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                            {col.title}
                          </p>
                          <ul className="space-y-2.5">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="text-[13px] text-ink transition-colors hover:text-ink-soft"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-wide text-ink hover:text-ink-soft"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <Link
              href="/fidelidade"
              className="hidden items-center gap-1.5 text-[12px] font-medium uppercase tracking-wide text-ink hover:text-ink-soft lg:flex"
            >
              <Gift size={16} />
              Fidelidade
            </Link>
            <Truck size={20} className="hidden text-ink md:block" aria-hidden />
            <button type="button" onClick={openSearch} aria-label="Buscar">
              <Search size={20} />
            </button>
            <Link href="/conta/login" className="hidden md:block" aria-label="Entrar">
              <User size={20} />
            </Link>
            <button type="button" onClick={openCart} className="relative" aria-label="Carrinho">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
