import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-4 md:px-8">
      <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-cream px-6 py-16 text-center">
        <Image
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&h=700&q=80"
          alt="Rotina de 4 passos Bangn Body"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">Oferta por tempo limitado</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink md:text-5xl">30% Off Rotina de 4 Passos</h2>
          <Link
            href="/rotina"
            className="mt-6 inline-block rounded-full bg-ink px-8 py-3.5 text-[13px] font-medium uppercase tracking-wide text-white hover:bg-ink/90"
          >
            Montar Minha Rotina
          </Link>
        </div>
      </div>
    </section>
  );
}
