"use client";

import { useActionState } from "react";
import { updateProductAction, type ProductFormState } from "@/actions/products";

const initialState: ProductFormState = {};

export function ProductEditForm({
  productId,
  price,
  compareAtPrice,
  stock,
  status,
  checkoutUrl,
}: {
  productId: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  status: string;
  checkoutUrl: string;
}) {
  const action = updateProductAction.bind(null, productId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-lg rounded-xl border border-border-soft bg-white p-6">
      <div className="mb-4">
        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">
          Link de Checkout (gateway de pagamento)
        </label>
        <input
          type="url"
          name="checkoutUrl"
          defaultValue={checkoutUrl}
          placeholder="https://checkout.mercadopago.com.br/..."
          className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
        <p className="mt-1 text-[11px] text-ink-soft">
          Cole aqui o link de pagamento gerado pelo seu gateway para este produto.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={price}
            required
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">
            Preço Anterior (R$)
          </label>
          <input
            type="number"
            step="0.01"
            name="compareAtPrice"
            defaultValue={compareAtPrice}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">Estoque</label>
          <input
            type="number"
            name="stock"
            defaultValue={stock}
            required
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">Status</label>
          <select
            name="status"
            defaultValue={status}
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
          >
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
            <option value="ARQUIVADO">Arquivado</option>
          </select>
        </div>
      </div>

      {state.error && <p className="mb-3 text-[12px] text-sale">{state.error}</p>}
      {state.success && <p className="mb-3 text-[12px] text-ink">Alterações salvas.</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink py-3 text-[13px] font-medium uppercase tracking-wide text-white hover:bg-ink/90 disabled:opacity-60"
      >
        {pending ? "Salvando..." : "Salvar Alterações"}
      </button>
    </form>
  );
}
