export type Partner = {
  name: string;
  type: "supplier" | "designer" | "realtor" | "certification";
  url?: string;
  description?: string;
};

export const PARTNERS: Partner[] = [
  { name: "Ferguson Bath, Kitchen & Lighting", type: "supplier", description: "Plumbing fixtures & lighting" },
];

export const CERTIFICATIONS: Partner[] = [
  { name: "Licensed & Insured", type: "certification", description: "General liability coverage on every project" },
];
