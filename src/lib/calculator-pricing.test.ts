// @ts-nocheck -- run with `bun test`; bun types are not installed
import { describe, expect, test } from "bun:test";
import { calculateEstimate, type CalculatorInputs, type Neighborhood } from "./calculator-pricing";

const AREAS: Neighborhood[] = ["houston", "heights", "bellaire", "river-oaks", "kingwood", "memorial", "other"];

describe("area never changes the estimate", () => {
  test("same inputs give identical prices in every area", () => {
    const base: Omit<CalculatorInputs, "neighborhood"> = {
      size: "standard", scope: "midrange", shower: "walk-in", vanityCount: "double", tileGrade: "porcelain", plumbing: "minor",
    };
    const ref = calculateEstimate({ ...base, neighborhood: "houston" });
    for (const area of AREAS) {
      const r = calculateEstimate({ ...base, neighborhood: area });
      expect(r.low).toBe(ref.low);
      expect(r.high).toBe(ref.high);
      expect(r.breakdown).toEqual(ref.breakdown);
    }
  });
});
