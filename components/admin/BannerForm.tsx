"use client";

import { useActionState } from "react";
import { createBannerAction, type BannerFormState } from "@/actions/banners";

const initialState: BannerFormState = {};

export function BannerForm() {
  const [state, formAction, pending] = useActionState(createBannerAction, initialState);

  return (
    <form action={formAction} className="mb-8 rounded-xl border border-border-soft bg-white p-6">
      <p className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-ink">Novo Banner</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">
            Imagem Desktop (URL)
          </label>
          <input
            type="url"
            name="imageDesktop"
            required
            placeholder="https://..."
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">Título</label>
          <input
            type="text"
            name="title"
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">Link</label>
          <input
            type="text"
            name="link"
            placeholder="/categoria/kits-ofertas"
            className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>

      {state.error && <p className="mt-3 text-[12px] text-sale">{state.error}</p>}
      {state.success && <p className="mt-3 text-[12px] text-ink">Banner criado.</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-full bg-ink px-6 py-2.5 text-[12px] font-medium uppercase tracking-wide text-white hover:bg-ink/90 disabled:opacity-60"
      >
        {pending ? "Salvando..." : "Criar Banner"}
      </button>
    </form>
  );
}
