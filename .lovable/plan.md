# Move BoldREMO to TanStack Start on Lovable hosting, then drop Netlify

## 1. Eligibility
- Yes. This is a Classic project (Vite 5, React Router, react-helmet-async), which is what the migration is built for.
- You can start it from this chat. Approve this plan or tell me "migrate this project to TanStack Start" and I'll run it. You don't have to use Settings, though that works too. It costs credits, and you can undo it by reverting that message in chat history.

## 2. What changes or might break
| Area | What happens |
|---|---|
| Routes (24 in App.tsx, including /blog/:slug) | Each one moves to its own route file. URLs stay the same. Main risk: a link or route getting missed. |
| vite-plugin-prerender.ts | Removed. The server renders each page now, so this plugin isn't needed. |
| src/lib/seo-content.ts | Kept as the one source of truth. Each route's title, description, canonical and OG tags get read from it, so the duplicate copies in the plugin and index.html go away. |
| react-helmet / SeoHead | Replaced by TanStack's built-in head handling. Visitors see the same tags, but now crawlers get them in the first HTML response. |
| JSON-LD schema components | They move into each route's head scripts. Needs checking so no schema is duplicated or missing. |
| Cost calculator | Should keep working. It runs in the browser, and the pricing test stays in place. |
| Forms / edge functions | No change. They still call the same backend functions, and the CRM forwarding still works. |
| Admin page | Login only works in the browser. Low risk, but I'll check sign-in and the leads list. |
| MCP / OAuth consent (/.lovable/oauth/consent) | Medium risk. The route has to keep its exact path and render only in the browser. I'll test the consent flow. |
| Images | Static imports keep working. The hero preload trick in the plugin gets rebuilt in the route head. |
| Sitemap / robots / llms.txt | The static files carry over as they are. The sitemap gets checked against the final routes. |
| GA4, HubSpot, fonts in index.html | Move into the root layout. I'll check that they still fire. |

## 3. Netlify-only files
- **public/_redirects**: Lovable hosting ignores this file. The only rules in it are /path and /path/ to the prerendered page, plus a 404 catch-all. With the server rendering pages, the server handles all of that. We pick one trailing-slash style. Today's sitemap and canonicals use trailing slashes, and the server will 301 the other form to match. Unknown URLs will return a real 404 status. The file then gets deleted.
- **public/_headers**: Lovable hosting doesn't read it either. Your file only holds cache rules (no security headers). Lovable already serves hashed files with long-term caching, so nothing needs carrying over. If you want security headers later (HSTS, X-Content-Type-Options, Referrer-Policy), the server can add them. I'll confirm with a live header check rather than assume. The file then gets deleted.

## 4. Steps, smallest risk first
1. **Freeze**: no content edits during the move. Netlify keeps serving boldremo.com the whole time, so visitors aren't affected.
2. **Run the migration** in this project. The build has to pass and the calculator pricing test has to pass.
3. **SEO port**: wire up per-route head tags from seo-content.ts, move the JSON-LD, add the trailing-slash 301s and the real 404, and remove the prerender plugin, _redirects and _headers.
4. **Test on the preview, then publish to boldremo.lovable.app** (still not on your domain). For each of the 24 URLs, check the raw HTML (what Google sees, with no JavaScript) for the right title, description, canonical pointing to www.boldremo.com, OG tags, schema and the H1 text. Also check: /path and /path/ (one 301s to the other), a fake URL returns 404, calculator estimate and email, contact and guide forms (lead arrives in email and CRM), Admin login, OAuth consent, GA4 page_view, and the comparison photos.
5. **Domain switch** (your step, a few minutes of work): in Lovable, go to Project Settings → Domains and reconnect boldremo.com and www. At your DNS provider, point the apex A record to 185.158.133.1 and point www to the Lovable target shown there, replacing the Netlify records. Keep Netlify running until the domain shows "Active" in Lovable.
6. **Verify on www.boldremo.com**: repeat the raw-HTML spot checks, check that SSL works, check that the apex redirects to www, and check that Lovable visitor analytics starts counting.
7. **Shut down Netlify** after about a week of clean results.

## After the switch, in Search Console
- Use URL Inspection → Test live URL on the homepage and the 4 unindexed area pages (Heights, River Oaks, Bellaire, Kingwood), then Request indexing.
- Resubmit the sitemap. I can do this through the connector.
- Watch Pages (indexing) for "Duplicate, Google chose different canonical", soft 404s and 404 spikes over 2–4 weeks.
- Check that Performance clicks and impressions don't drop and that Enhancements show no schema errors.

## Open question
- Trailing slash: I plan to keep it (it matches today's sitemap and indexed URLs). Tell me if you'd rather drop it.
