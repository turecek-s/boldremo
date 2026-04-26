/**
 * Houston Bathroom Remodel Cost Calculator pricing logic.
 * 
 * All prices in USD, based on Houston market labor + material rates as of 2026.
 * Adjust the constants below as market conditions change.
 */

export type BathroomSize = "half" | "small" | "standard" | "large";
export type ScopeLevel = "refresh" | "midrange" | "luxury";
export type Neighborhood = "houston" | "heights" | "bellaire" | "river-oaks" | "kingwood" | "memorial" | "other";
export type ShowerType = "keep" | "standard" | "walk-in" | "walk-in-custom";
export type VanityCount = "single" | "double";
export type TileGrade = "ceramic" | "porcelain" | "stone";
export type PlumbingChanges = "none" | "minor" | "major";

export interface CalculatorInputs {
  size: BathroomSize;
  scope: ScopeLevel;
  neighborhood: Neighborhood;
  shower: ShowerType;
  vanityCount: VanityCount;
  tileGrade: TileGrade;
  plumbing: PlumbingChanges;
}

export interface PriceBreakdown {
  labor: number;
  tile: number;
  fixtures: number;
  vanity: number;
  plumbing: number;
  contingency: number;
}

export interface CalculatorResult {
  low: number;
  high: number;
  breakdown: PriceBreakdown;
  summary: string;
}

// Base costs by size (mid-point estimate before scope/neighborhood multipliers)
const SIZE_BASE: Record<BathroomSize, number> = {
  half: 6500,
  small: 14000,
  standard: 22000,
  large: 38000,
};

// Square footage by size — used for tile calculations
const SIZE_SQFT: Record<BathroomSize, number> = {
  half: 25,
  small: 40,
  standard: 60,
  large: 110,
};

// Scope multiplier on the overall base
const SCOPE_MULTIPLIER: Record<ScopeLevel, number> = {
  refresh: 0.65,
  midrange: 1.0,
  luxury: 1.55,
};

// Neighborhood adjustment (reflects local labor + material expectations)
const NEIGHBORHOOD_MULTIPLIER: Record<Neighborhood, number> = {
  houston: 1.0,
  heights: 1.05,
  bellaire: 1.10,
  "river-oaks": 1.25,
  kingwood: 1.0,
  memorial: 1.15,
  other: 1.0,
};

// Shower add-ons (added on top of base)
const SHOWER_COST: Record<ShowerType, number> = {
  keep: 0,
  standard: 2500,
  "walk-in": 5500,
  "walk-in-custom": 9500,
};

// Vanity costs (single vs double)
const VANITY_COST: Record<VanityCount, { refresh: number; midrange: number; luxury: number }> = {
  single: { refresh: 800, midrange: 1800, luxury: 4500 },
  double: { refresh: 1600, midrange: 3500, luxury: 8500 },
};

// Tile cost per sq ft (installed: material + labor)
const TILE_PER_SQFT: Record<TileGrade, { low: number; high: number }> = {
  ceramic: { low: 12, high: 20 },
  porcelain: { low: 18, high: 32 },
  stone: { low: 35, high: 70 },
};

// Plumbing change costs
const PLUMBING_COST: Record<PlumbingChanges, number> = {
  none: 0,
  minor: 1200,
  major: 4500,
};

const NEIGHBORHOOD_LABEL: Record<Neighborhood, string> = {
  houston: "Houston",
  heights: "The Heights",
  bellaire: "Bellaire",
  "river-oaks": "River Oaks",
  kingwood: "Kingwood",
  memorial: "Memorial",
  other: "the greater Houston area",
};

const SCOPE_LABEL: Record<ScopeLevel, string> = {
  refresh: "refresh",
  midrange: "mid-range remodel",
  luxury: "full luxury renovation",
};

const SIZE_LABEL: Record<BathroomSize, string> = {
  half: "half bath",
  small: "small full bath",
  standard: "standard bathroom",
  large: "large master bathroom",
};

export function calculateEstimate(inputs: CalculatorInputs): CalculatorResult {
  const sqft = SIZE_SQFT[inputs.size];
  const baseSize = SIZE_BASE[inputs.size];
  const scopeMult = SCOPE_MULTIPLIER[inputs.scope];
  const neighborhoodMult = NEIGHBORHOOD_MULTIPLIER[inputs.neighborhood];

  // Tile (covers floor + most of shower walls — roughly 1.6× floor sqft)
  const tileSqft = Math.round(sqft * 1.6);
  const tileLow = tileSqft * TILE_PER_SQFT[inputs.tileGrade].low;
  const tileHigh = tileSqft * TILE_PER_SQFT[inputs.tileGrade].high;
  const tileMid = (tileLow + tileHigh) / 2;

  // Vanity
  const vanityCost = VANITY_COST[inputs.vanityCount][inputs.scope];

  // Shower
  const showerCost = SHOWER_COST[inputs.shower];

  // Plumbing
  const plumbingCost = PLUMBING_COST[inputs.plumbing];

  // Labor: ~45% of base
  const laborMid = baseSize * 0.45 * scopeMult;

  // Fixtures (faucets, lighting, mirrors, hardware)
  const fixturesMid = baseSize * 0.18 * scopeMult;

  // Apply neighborhood multiplier across the board
  const breakdown: PriceBreakdown = {
    labor: Math.round(laborMid * neighborhoodMult),
    tile: Math.round(tileMid * neighborhoodMult),
    fixtures: Math.round(fixturesMid * neighborhoodMult),
    vanity: Math.round(vanityCost * neighborhoodMult),
    plumbing: Math.round(plumbingCost * neighborhoodMult),
    contingency: 0,
  };

  const subtotal =
    breakdown.labor +
    breakdown.tile +
    breakdown.fixtures +
    breakdown.vanity +
    breakdown.plumbing;

  // 12% contingency baked into the upper range
  breakdown.contingency = Math.round(subtotal * 0.12);

  const mid = subtotal + breakdown.contingency;
  const low = Math.round(mid * 0.85 / 500) * 500;
  const high = Math.round(mid * 1.15 / 500) * 500;

  const summary = `Based on a ${SIZE_LABEL[inputs.size]} ${SCOPE_LABEL[inputs.scope]} in ${NEIGHBORHOOD_LABEL[inputs.neighborhood]}, your project is estimated between $${low.toLocaleString()} and $${high.toLocaleString()}. This range reflects current Houston-area labor and material costs, includes a typical 12% contingency, and assumes mid-quality finishes within your selected scope. Final pricing depends on exact material selections, on-site conditions, and any change orders during the project.`;

  return { low, high, breakdown, summary };
}

export const NEIGHBORHOOD_LABELS = NEIGHBORHOOD_LABEL;
export const SCOPE_LABELS = SCOPE_LABEL;
export const SIZE_LABELS = SIZE_LABEL;
