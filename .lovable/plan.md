# Fix "Duplicate, Google chose different canonical than user"

## What Google is telling you

Google found pages where the canonical URL **you declared** doesn't match the canonical URL **Google picked**. So Google is dropping your declared URL and indexing a different one instead. The pages are still indexed — just under a URL you didn't intend.

## Root cause: three competing canonical sources fight each other

Your site declares `<link rel="canonical">` from **three different places**, and they don't agree on the same URL at the same moment:

1. **`index.html`** ships with `<link rel="canonical" href="https://www.boldremo.com/" />` (homepage, hard-coded). An inline script then rewrites it based on `window.location.pathname`.
2. **`vite-plugin-prerender.ts`** generates `dist/services/index.html`, `dist/about/index.html`, etc. and rewrites the canonical to the route URL — good. But it **only covers 12 routes**. The 5 service-area pages plus `/press` are missing from the prerender list, so those crawled URLs ship the homepage canonical until JS runs.
3. **`SeoHead.tsx`** uses `react-helmet-async` to inject yet another canonical when the React app mounts. Plus **`CanonicalUrl.tsx`** in `App.tsx` injects a fourth one on every route change.

When Googlebot fetches a URL like `/service-areas/heights`, the **initial HTML** it sees has `canonical = https://www.boldremo.com/` (the homepage). Google reads that, decides "this page claims to be the homepage," and consolidates the URL under the homepage canonical — exactly the "Google chose different canonical than user" error.

The prerendered routes have a similar but smaller version of the problem: the static HTML canonical is correct, but Helmet + CanonicalUrl + the inline script all re-write it after hydration. If any of them write a slightly different value (trailing slash, www mismatch, query string, etc.), Google logs the mismatch.

## The fix — one source of truth

**Step 1 — Make the prerender plugin cover every public route**
Add the 5 service-area routes and `/press` to the `ROUTES` array in `vite-plugin-prerender.ts` so every sitemap URL ships pre-baked HTML with its own canonical, title, and description. After this, Googlebot's first-pass crawler sees the correct canonical immediately for every URL — no JS execution required.

**Step 2 — Remove the runtime canonical rewriters**
Delete the inline canonical-rewriting `<script>` block in `index.html` (lines 92–112). Delete the `<CanonicalUrl />` component from `App.tsx` and remove the file. These were band-aids for the SPA-shell problem — once every route has its own prerendered HTML, they only cause conflicts.

**Step 3 — Stop SeoHead from emitting `<link rel="canonical">`**
Remove the canonical/og:url Helmet tags from `SeoHead.tsx`. Keep title and description (those are fine to update at runtime). The canonical now lives **only** in the prerendered HTML — exactly one declaration per URL, set at build time, never overwritten.

**Step 4 — Normalize URL format**
Audit canonicals to guarantee:
- Always `https://www.boldremo.com` (www, https) — already enforced via `_redirects`.
- No trailing slash except on root.
- No query strings or fragments.

**Step 5 — Resubmit in Search Console**
After deploying, open the affected URLs in Search Console → "Validate fix." Google typically re-crawls within 1–2 weeks. The sitemap is already correct, so no sitemap changes needed.

## Files to change

- `vite-plugin-prerender.ts` — add the 5 service-area routes + `/press` to `ROUTES`.
- `index.html` — remove the canonical-rewriting inline script (lines 92–112).
- `src/App.tsx` — remove `<CanonicalUrl />` import and usage.
- `src/components/CanonicalUrl.tsx` — delete file.
- `src/components/SeoHead.tsx` — remove the canonical and og:url Helmet tags.

## Why this works

After the fix, every URL Google crawls returns HTML with **exactly one** `<link rel="canonical">`, set at build time, pointing at itself. No runtime rewrites, no race conditions, no homepage canonical on a service-area page. Google's declared and chosen canonicals will match.

## What you'll need to do after deploy

1. Trigger a redeploy so the new prerendered HTML is live.
2. In Search Console → Pages → "Duplicate, Google chose different canonical than user" → click **Validate fix**.
3. Optionally use the URL Inspection tool on `/service-areas/heights` etc. and click **Request indexing** to speed things up.
