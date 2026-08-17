const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatBRL(value: number): string {
  return currencyFormatter.format(value);
}

export function formatSavings(from: number, to: number): string {
  return formatBRL(Math.max(from - to, 0));
}

export function formatDiscountPercent(from: number, to: number): string {
  if (from <= 0) return "0%";
  const pct = Math.round(((from - to) / from) * 100);
  return `${pct}%`;
}
