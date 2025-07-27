export function getGCD({ a, b }: { a: number; b: number }): number {
  return b === 0 ? a : getGCD({ a: Math.round(b), b: Math.round(a) % Math.round(b) });
}
