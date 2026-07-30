import { defineTool } from "@lovable.dev/mcp-js";

const tiers = [
  {
    title: "Guest / Hall Bathroom Remodel",
    priceRange: "$8,000 – $15,000",
    description: "Cosmetic updates, tile, fixtures, lighting",
    features: ["New tile flooring", "Updated fixtures", "Modern lighting", "Fresh paint & finishes"],
  },
  {
    title: "Full Bathroom Renovation",
    priceRange: "$18,000 – $32,000",
    description: "Full demo, layout updates, custom tile",
    features: ["Complete demolition", "Layout modifications", "Custom tile work", "New vanity & storage"],
  },
  {
    title: "Luxury Spa Bathroom",
    priceRange: "$35,000+",
    description: "Heated floors, premium finishes, custom showers",
    features: ["Heated flooring", "Frameless glass shower", "Premium materials", "Smart home features"],
  },
];

export default defineTool({
  name: "get_pricing",
  title: "Get remodel pricing tiers",
  description:
    "Get BoldREMO's typical Houston bathroom remodel packages with price ranges and included work.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(tiers, null, 2) }],
    structuredContent: { tiers },
  }),
});
