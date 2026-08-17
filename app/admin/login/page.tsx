"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form action={formAction} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-xl font-semibold uppercase tracking-wide text-ink">Painel Admin</h1>
        <p className="mt-1 text-center text-[12px] text-ink-soft">Acesso restrito à equipe</p>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-soft">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-lg border border-border-soft px-3 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>

          {state.error && <p className="text-[12px] text-sale">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-full bg-ink py-3 text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-ink/90 disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </main>
  );
}
