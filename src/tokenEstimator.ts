export function estimateTokens(input: string): number {
  return Math.ceil(input.length / 4);
}
