"use client";

import { useState, type ReactNode } from "react";
import { Plus, Minus } from "lucide-react";

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border-soft border-y border-border-soft">
      {items.map((item, i) => (
        <div key={item.title}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-ink"
          >
            {item.title}
            {open === i ? <Minus size={16} /> : <Plus size={16} />}
          </button>
          {open === i && <div className="pb-4 text-[13px] leading-relaxed text-ink-soft">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}
