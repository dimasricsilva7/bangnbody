type MarqueeBarProps = {
  items: string[];
  variant?: "announcement" | "trust";
};

export function MarqueeBar({ items, variant = "trust" }: MarqueeBarProps) {
  const bg = variant === "announcement" ? "bg-accent-dark" : "bg-white border-y border-border-soft";
  const loop = [...items, ...items];

  return (
    <div className={`overflow-hidden py-3 ${bg}`}>
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap text-[12px] font-medium uppercase tracking-wide text-ink">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span aria-hidden className="text-ink-soft">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
