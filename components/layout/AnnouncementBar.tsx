"use client";

import { useEffect, useState } from "react";

const messages = [
  "PARCELE EM ATÉ 3X SEM JUROS",
  "BRINDE + FRETE EXPRESSO GRÁTIS ACIMA DE R$ 350",
  "30% OFF NOS MAIS VENDIDOS | COMPRE AGORA",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-9 items-center justify-center bg-accent-dark px-4 text-center text-[11px] font-medium uppercase tracking-wide text-ink">
      {messages[index]}
    </div>
  );
}
