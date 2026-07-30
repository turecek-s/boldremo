import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getCompanyInfo from "./tools/get-company-info";
import getPricing from "./tools/get-pricing";
import listContactSubmissions from "./tools/list-contact-submissions";
import markSubmissionRead from "./tools/mark-submission-read";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "boldremo-website",
  title: "BoldREMO website",
  version: "0.1.0",
  instructions:
    "Tools for the BoldREMO luxury bathroom remodeling website (Houston, TX). Use `get_company_info` and `get_pricing` for company, service-area, and package details. Use `list_contact_submissions` and `mark_submission_read` to review website leads (admin accounts only).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getCompanyInfo, getPricing, listContactSubmissions, markSubmissionRead],
});
