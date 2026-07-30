import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "./list-contact-submissions";

export default defineTool({
  name: "mark_submission_read",
  title: "Mark submission as read",
  description: "Mark a website contact submission as read. Requires an admin account.",
  inputSchema: {
    id: z.string().describe("The submission id (uuid)."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("contact_submissions")
      .update({ is_read: true })
      .eq("id", id)
      .select("id, is_read");
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    if (!data || data.length === 0) {
      return { content: [{ type: "text", text: `No submission updated for id ${id}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Submission ${id} marked as read.` }],
      structuredContent: { row: data[0] },
    };
  },
});
