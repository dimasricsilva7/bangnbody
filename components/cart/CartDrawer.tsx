"use client";

import Image from "next/image";
import { X, Minus, Plus, AlertTriangle } from "lucide-react";
import { useCartStore, cartSubtotal, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-store";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const pendingReplace = useCartStore((s) => s.pendingReplace);
  const confirmReplace = useCartStore((s) => s.confirmReplace);
  const cancelReplace = useCartStore((s) => s.cancelReplace);

  const subtotal = cartSubtotal(lines);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Carrinho"
      >
        <div className="flex items-center justify-between border-b border-border-soft px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide">Seu Carrinho</h2>
          <button type="button" onClick={close} aria-label="Fechar carrinho">
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-border-soft px-6 py-4">
          {remaining > 0 ? (
            <p className="text-[12px] text-ink">
              Faltam <span className="font-semibold">{formatBRL(remaining)}</span> para você ganhar{" "}
              <span className="font-semibold">frete grátis</span>
            </p>
          ) : (
            <p className="text-[12px] font-semibold text-ink">Você ganhou frete grátis! 🎉</p>
          )}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border-soft">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {pendingReplace && (
          <div className="flex items-start gap-3 border-b border-border-soft bg-[#fff8ec] px-6 py-4">
            <AlertTriangle size={18} className="mt-0.5 flex-none text-sale" />
            <div className="flex-1">
              <p className="text-[12px] text-ink">
                Nosso checkout aceita <span className="font-semibold">um produto por vez</span>. Trocar{" "}
                <span className="font-semibold">{lines[0]?.name}</span> por{" "}
                <span className="font-semibold">{pendingReplace.name}</span>?
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={confirmReplace}
                  className="rounded-full bg-ink px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white"
                >
                  Trocar produto
                </button>
                <button
                  type="button"
                  onClick={cancelReplace}
                  className="rounded-full border border-border-soft px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-ink"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-ink">Seu carrinho está vazio</p>
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-accent px-6 py-2.5 text-[12px] font-medium uppercase tracking-wide text-ink hover:bg-accent-dark"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 border-b border-border-soft py-4 last:border-none">
                  <div className="relative h-24 w-20 flex-none overflow-hidden bg-cream">
                    <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[13px] font-medium uppercase tracking-wide text-ink">{line.name}</p>
                        {line.variantName && (
                          <p className="text-[11px] text-ink-soft">{line.variantName}</p>
                        )}
                      </div>
                      <button type="button" onClick={() => removeLine(line.id)} aria-label="Remover item">
                        <X size={14} className="text-ink-soft" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-border-soft px-2 py-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center text-[12px]">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[13px] font-medium">{formatBRL(line.price * line.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border-soft px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="font-medium uppercase tracking-wide">Subtotal estimado</span>
                <span className="font-semibold">{formatBRL(subtotal)}</span>
              </div>
              <p className="mb-4 text-[11px] text-ink-soft">
                Impostos inclusos. Você será redirecionado ao ambiente seguro de pagamento.
              </p>
              {lines[0]?.checkoutUrl ? (
                <a
                  href={lines[0].checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="block w-full rounded-full bg-ink py-3 text-center text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-ink/90"
                >
                  Finalizar Compra
                </a>
              ) : (
                <p className="rounded-full bg-border-soft py-3 text-center text-[12px] font-medium uppercase tracking-wide text-ink-soft">
                  Link de pagamento não configurado
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
