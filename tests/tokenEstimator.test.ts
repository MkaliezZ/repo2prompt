import { describe, expect, it } from "vitest";
import { estimateTokens } from "../src/tokenEstimator.js";

describe("estimateTokens", () => {
  it("estimates tokens from character count", () => {
    expect(estimateTokens("12345678")).toBe(2);
    expect(estimateTokens("12345")).toBe(2);
    expect(estimateTokens("")).toBe(0);
  });
});
