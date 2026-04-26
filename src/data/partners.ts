// Trusted partners, suppliers, and certifications.
// Edit this file as new partnerships are signed.

export type Partner = {
  name: string;
  type: "supplier" | "designer" | "realtor" | "certification";
  /** Optional URL to the partner's website. */
  url?: string;
  /** Optional one-line description shown under the name. */
  description?: string;
};

export const PARTNERS: Partner[] = [
  // Suppliers
  { name: "Daltile Houston", type: "supplier", description: "Tile & natural stone" },
  { name: "Cosentino Houston", type: "supplier", description: "Quartz & surface materials" },
  { name: "Ferguson Bath, Kitchen & Lighting", type: "supplier", description: "Plumbing fixtures" },
  { name: "Architectural Design Resource", type: "supplier", description: "Specialty hardware" },

  // Designers & realtors
  { name: "Houston Interior Designers Network", type: "designer", description: "Referral partner" },
  { name: "Greater Houston Realtor Partners", type: "realtor", description: "Luxury home referrals" },
];

export const CERTIFICATIONS: Partner[] = [
  { name: "Licensed & Insured Texas Contractor", type: "certification", description: "TDLR registered" },
  { name: "BBB Accredited Business", type: "certification", description: "A+ Rating Pending" },
  { name: "Houzz Pro Member", type: "certification", description: "Verified professional" },
  { name: "NARI Houston Member", type: "certification", description: "Membership pending" },
];
