import { Star } from "lucide-react";

export function RatingBreakdown({ reviewCount }: { reviewCount: number }) {
  if (reviewCount === 0) return null;

  // Distribuição ilustrativa (a real virá do agregado de Review.rating quando o banco estiver conectado).
  const distribution = [
    { stars: 5, pct: 90 },
    { stars: 4, pct: 7 },
    { stars: 3, pct: 2 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];

  return (
    <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <div className="flex flex-none flex-col items-center gap-1">
        <span className="font-display text-4xl font-medium text-ink">4.9</span>
        <div className="flex items-center gap-0.5 text-accent-dark">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <span className="text-[11px] text-ink-soft">{reviewCount.toLocaleString("pt-BR")} avaliações</span>
      </div>

      <div className="w-full max-w-sm flex-1 space-y-1.5">
        {distribution.map((row) => (
          <div key={row.stars} className="flex items-center gap-2 text-[11px] text-ink-soft">
            <span className="w-3">{row.stars}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border-soft">
              <div className="h-full rounded-full bg-accent-dark" style={{ width: `${row.pct}%` }} />
            </div>
            <span className="w-8 text-right">{row.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
