import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_contact_submissions",
  title: "List contact submissions",
  description:
    "List website contact form submissions, newest first. Requires an admin account.",
  inputSchema: {
    limit: z.number().int().default(20).describe("How many submissions to return (max 100)."),
    unread_only: z.boolean().default(false).describe("Only return unread submissions."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ limit, unread_only }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const take = Math.min(Math.max(limit ?? 20, 1), 100);
    let query = supabaseForUser(ctx)
      .from("contact_submissions")
      .select("id, first_name, last_name, email, phone, message, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(take);
    if (unread_only) query = query.eq("is_read", false);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { submissions: data ?? [] },
    };
  },
});
