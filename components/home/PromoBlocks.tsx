import Link from "next/link";

export function PromoBlocks() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-cream px-6 py-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Quando você gasta R$ 350+
          </p>
          <h3 className="font-display text-2xl font-medium text-ink">Kit Glow de Brinde</h3>
          <p className="text-sm text-ink-soft">+ Frete Expresso Grátis</p>
          <Link
            href="/categoria/kits-ofertas"
            className="mt-3 rounded-full bg-accent px-7 py-2.5 text-[12px] font-medium uppercase tracking-wide text-ink hover:bg-accent-dark"
          >
            Aproveitar Agora
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-2xl bg-ink px-6 py-10 text-center text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Economize 30% Off
          </p>
          <h3 className="font-display text-2xl font-medium">Kits e Bundles</h3>
          <p className="text-sm text-white/70">Monte sua rotina completa por menos</p>
          <Link
            href="/categoria/kits-ofertas"
            className="mt-3 rounded-full bg-white px-7 py-2.5 text-[12px] font-medium uppercase tracking-wide text-ink hover:bg-white/90"
          >
            Ver Kits
          </Link>
        </div>
      </div>
    </section>
  );
}
