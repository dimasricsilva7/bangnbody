"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-ink py-16 text-white">
      <div className="mx-auto max-w-[560px] px-4 text-center md:px-8">
        <h2 className="text-2xl font-medium md:text-3xl">Entre para o clube Bangn Body</h2>
        <p className="mt-2 text-sm text-white/70">
          Receba 10% de desconto na primeira compra e novidades em primeira mão.
        </p>

        {submitted ? (
          <p className="mt-6 text-sm font-medium">Obrigada por se inscrever! Confira seu e-mail.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="w-full flex-1 rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-7 py-3 text-[12px] font-medium uppercase tracking-wide text-ink hover:bg-accent-dark"
            >
              Inscrever
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
