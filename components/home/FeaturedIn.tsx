// Logos placeholder — substitua pelos veículos reais que citaram sua marca em /admin > Home > Featured In.
const pressPlaceholders = ["Revista A", "Portal B", "Blog C", "Revista D", "Coluna E", "Podcast F", "Revista G"];

export function FeaturedIn() {
  const loop = [...pressPlaceholders, ...pressPlaceholders];

  return (
    <section className="overflow-hidden border-y border-border-soft bg-cream py-10">
      <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
        Destaque Em
      </p>
      <div className="animate-marquee flex w-max items-center gap-16 whitespace-nowrap">
        {loop.map((name, i) => (
          <span key={i} className="text-2xl font-medium italic text-ink/50">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
