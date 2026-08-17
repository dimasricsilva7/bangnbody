import Image from "next/image";

export function HowToUseSection({ howToUse, image }: { howToUse: string; image: string }) {
  return (
    <section className="border-t border-border-soft py-16">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream md:order-2">
          <Image src={image} alt="Modo de uso" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="md:order-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sale">Modo de Uso</p>
          <p className="mt-3 font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
            {howToUse}
          </p>
        </div>
      </div>
    </section>
  );
}
