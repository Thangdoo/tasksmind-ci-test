import { describe, it, expect } from "vitest";
import { normalizeConfidence } from "../src/confidence.js";

describe("smoke", () => {
  it("normalizes negative scores to 0", () => {
    expect(normalizeConfidence(-5)).toBe(0);
  });

  it("passes mid-range scores through", () => {
    expect(normalizeConfidence(0.5)).toBe(0.5);
  });
});
