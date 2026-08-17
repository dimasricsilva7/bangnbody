"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

type Ingredient = { name: string; description: string };

export function WhatsInIt({ ingredients, image }: { ingredients: Ingredient[]; image: string }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="border-t border-border-soft py-16">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-medium text-ink">O Que Contém?</h2>
          <p className="mt-2 text-[13px] text-ink-soft">
            Nossos produtos são feitos com ingredientes naturais, veganos e livres de crueldade.
          </p>

          <div className="mt-6 divide-y divide-border-soft border-t border-border-soft">
            {ingredients.map((ing, i) => (
              <div key={ing.name}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between py-4 text-left text-[13px] font-semibold uppercase tracking-wide text-ink"
                >
                  {ing.name}
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                {open === i && (
                  <p className="pb-4 text-[13px] leading-relaxed text-ink-soft">{ing.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream">
          <Image src={image} alt="Ingredientes" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
