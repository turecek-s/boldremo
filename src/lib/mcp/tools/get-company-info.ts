import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_company_info",
  title: "Get company info",
  description:
    "Get BoldREMO's contact details, service areas, and consultation process.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      company: "BoldREMO",
      focus: "Luxury bathroom remodeling in Houston, Texas",
      owner: "Stan",
      phone: "(832) 513-5737",
      email: "info@boldremo.com",
      website: "https://www.boldremo.com",
      serviceAreas: ["Houston", "Heights", "Bellaire", "River Oaks", "Kingwood"],
      process: [
        "Free rough estimate",
        "$75 in-home design consult",
        "Detailed proposal and project schedule",
      ],
      cta: "Book Bathroom Consult",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
