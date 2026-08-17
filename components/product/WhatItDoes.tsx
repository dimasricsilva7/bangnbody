import Image from "next/image";
import { Check } from "lucide-react";

export function WhatItDoes({ title, benefits, image }: { title: string; benefits: string[]; image: string }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-cream">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-12 md:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">O Que Faz?</p>
          <h2 className="mt-2 font-display text-2xl font-medium text-ink md:text-3xl">{title}</h2>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Pense:</p>
          <ul className="mt-3 space-y-2.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[13px] text-ink">
                <Check size={16} className="mt-0.5 flex-none text-ink" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[280px]">
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
