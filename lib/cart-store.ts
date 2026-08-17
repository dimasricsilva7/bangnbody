"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string;
  productId: string;
  variantId?: string;
  bundleId?: string;
  name: string;
  variantName?: string;
  image: string;
  price: number;
  quantity: number;
  /** Link de checkout hospedado pelo gateway (cadastrado por produto no admin). */
  checkoutUrl?: string;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  pendingReplace: CartLine | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /**
   * Carrinho de 1 produto por vez: cada gateway gera um link de checkout fixo
   * por produto, então não é possível somar itens diferentes num único link.
   * Adicionar um produto diferente do que já está no carrinho pede confirmação.
   */
  addLine: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  confirmReplace: () => void;
  cancelReplace: () => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

export const FREE_SHIPPING_THRESHOLD = 250;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      pendingReplace: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addLine: (line) => {
        const current = get().lines[0];
        const newLine: CartLine = { ...line, quantity: 1 };
        if (current && current.id !== newLine.id) {
          set({ pendingReplace: newLine, isOpen: true });
          return;
        }
        set({ lines: [newLine], isOpen: true, pendingReplace: null });
      },
      confirmReplace: () =>
        set((state) => ({
          lines: state.pendingReplace ? [state.pendingReplace] : state.lines,
          pendingReplace: null,
        })),
      cancelReplace: () => set({ pendingReplace: null }),
      removeLine: (id) =>
        set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.id !== id)
              : state.lines.map((l) => (l.id === id ? { ...l, quantity } : l)),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "bangnbody-cart", partialize: (state) => ({ lines: state.lines }) }
  )
);

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}
