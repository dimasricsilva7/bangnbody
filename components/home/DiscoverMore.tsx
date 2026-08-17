import Image from "next/image";
import Link from "next/link";
import { discoverMore } from "@/lib/demo-data";

export function DiscoverMore() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Descubra Mais</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {discoverMore.map((item) => (
          <Link key={item.title} href={item.href} className="group block">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-lg font-medium text-ink">{item.title}</h3>
            <p className="mt-1 text-[13px] text-ink-soft">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
