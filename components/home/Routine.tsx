import Image from "next/image";
import Link from "next/link";
import { routine } from "@/lib/demo-data";
import { formatBRL } from "@/lib/format";

export function Routine() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <div className="mb-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sale">30% Off Rotina de 4 Passos</p>
        <h2 className="mt-2 text-3xl font-medium text-ink md:text-4xl">Rotina de 4 Etapas</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {routine.map((step) => (
          <div key={step.step} className="flex flex-col items-center text-center">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-cream">
              <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-ink">
                {step.step}
              </span>
              <Image src={step.image} alt={step.title} fill sizes="300px" className="object-cover" />
            </div>
            <h3 className="mt-4 text-base font-medium uppercase tracking-wide text-ink">{step.title}</h3>
            <p className="mt-1 text-[13px] text-ink-soft">{step.description}</p>
            <p className="mt-2 text-[13px] font-medium text-ink">{step.productName}</p>
            <p className="text-[13px] text-ink-soft">{formatBRL(step.price)}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/rotina"
          className="inline-block rounded-full bg-ink px-8 py-3.5 text-[13px] font-medium uppercase tracking-wide text-white hover:bg-ink/90"
        >
          Montar Minha Rotina
        </Link>
      </div>
    </section>
  );
}
