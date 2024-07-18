export function percentage(price: number, percent: number): number {
  const p = (percent / 100) * price;
  return price - p;
}
