import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:px-8 md:py-0">
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-sale">Última Chance!</p>
          <h1 className="mt-3 text-4xl font-medium leading-tight text-ink md:text-6xl">
            30% OFF
            <br />
            Sitewide
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft md:mx-0">
            Somos líderes, criadoras e inovadoras em skincare multifuncional, firmador e
            anti-idade.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="/categoria/mais-vendidos"
              className="w-full rounded-full bg-ink px-8 py-3.5 text-center text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-ink/90 sm:w-auto"
            >
              30% OFF Mais Vendidos
            </Link>
            <Link
              href="/categoria/kits-ofertas"
              className="w-full rounded-full border border-ink px-8 py-3.5 text-center text-[13px] font-medium uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-white sm:w-auto"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden md:order-2 md:aspect-auto md:h-[640px]">
          <Image
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&h=1500&q=80"
            alt="Campanha Bangn Body"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
