"use client";

import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { megaMenu } from "@/lib/demo-data";
import { useUIStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const isOpen = useUIStore((s) => s.mobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-full max-w-[340px] flex-col overflow-y-auto bg-white transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border-soft px-5 py-5">
          <span className="text-sm font-semibold uppercase tracking-wide">Menu</span>
          <button type="button" onClick={close} aria-label="Fechar menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-5 py-4">
          {Object.entries(megaMenu).map(([key, menu]) => (
            <div key={key} className="border-b border-border-soft py-3">
              <button
                type="button"
                onClick={() => setExpanded(expanded === key ? null : key)}
                className="flex w-full items-center justify-between text-[13px] font-medium uppercase tracking-wide text-ink"
              >
                {menu.label}
                <ChevronDown
                  size={16}
                  className={cn("transition-transform", expanded === key && "rotate-180")}
                />
              </button>
              {expanded === key && (
                <div className="mt-3 space-y-4 pl-2">
                  {menu.columns.map((col) => (
                    <div key={col.title}>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                        {col.title}
                      </p>
                      <ul className="space-y-2">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} onClick={close} className="text-[13px] text-ink">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/blog"
            onClick={close}
            className="border-b border-border-soft py-3 text-[13px] font-medium uppercase tracking-wide text-ink"
          >
            Blog
          </Link>
          <Link
            href="/conta/login"
            onClick={close}
            className="py-3 text-[13px] font-medium uppercase tracking-wide text-ink"
          >
            Entrar
          </Link>
        </nav>
      </aside>
    </>
  );
}
