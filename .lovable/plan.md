

## Why Google isn't seeing all your pages

Here's what's actually going on, in plain English. There are 4 separate causes — some are easy fixes, some need patience.

### 1. Your site is a Single Page App (SPA) — Google sees a blank page first

Your site is built in React. When Google's crawler first loads any page, the HTML it gets is essentially **empty** — all the real content (services, gallery, neighborhood pages) is rendered later by JavaScript in the browser.

Google *can* run JavaScript, but:
- It does so on a **second pass**, days or weeks later
- Smaller sites get less crawl budget, so the JS render is often delayed or skipped
- Bing, DuckDuckGo, and most AI crawlers don't render JS at all

You've worked around this on the homepage with the hidden "SEO fallback content" block (800+ words in `index.html`), but **that block only exists for the homepage**. Your `/services`, `/gallery`, `/about`, `/resources`, `/contact`, and all 5 `/service-areas/*` pages serve the *same* `index.html` — meaning Google sees the homepage content for every URL until it re-renders with JS.

### 2. Missing pages from your sitemap

Your `sitemap.xml` is missing real pages that exist in your routes:
- `/services` ✅ in sitemap (good)
- Blog posts like `/post/walk-in-showers-vs-soaking-tubs...` — **not in sitemap** (analytics shows people visiting these)
- `/blog/tags/...` — **not in sitemap**

If routes for blog posts exist but aren't in the sitemap, Google won't discover them via the sitemap.

### 3. Stale `lastmod` dates

Every URL in `sitemap.xml` says `<lastmod>2026-01-07</lastmod>`. Google uses this signal to decide whether to re-crawl. If the date never changes, Google deprioritizes re-crawling.

### 4. The site is brand new with very few backlinks

Analytics shows: **47 visitors in 7 days, only 1 from Google, 2 from Yelp**. Google's index trust takes 3–6 months for a new domain to build, especially without inbound links.

### What I recommend fixing (in priority order)

1. **Pre-render or SSR the key pages** so Google sees real HTML on the first crawl. The cleanest fix is adding `vite-plugin-prerender` or `react-snap` to generate static HTML files for `/services`, `/gallery`, `/about`, `/contact`, and all 5 service-area pages at build time. This is the single biggest win.
2. **Update `sitemap.xml`**: add any blog/post routes that exist, refresh all `lastmod` dates to today, and verify every URL returns content.
3. **Submit the sitemap in Google Search Console** and use "Request Indexing" on each priority URL. (You need to do this — I can't do it for you.)
4. **Check Google Search Console "Coverage" report** to see exactly which pages Google has tried to crawl and what errors it found. This tells us the real story instead of guessing.

### What I'd do in code if you approve

```text
[fix 1] Add static pre-rendering at build (vite-plugin-prerender)
        → /services, /gallery, /about, /resources, /contact,
          /service-areas/houston, /heights, /bellaire,
          /river-oaks, /kingwood
        → each gets unique <title>, <meta description>, real <body> HTML

[fix 2] Rewrite public/sitemap.xml
        → refresh lastmod to today's date
        → audit routes vs sitemap, add any missing pages

[fix 3] Add a per-route SEO content fallback (similar to the
        homepage hidden block) for non-JS crawlers
```

### What needs your action (I can't do these)

- **Google Search Console**: verify ownership of `boldremo.com`, submit `sitemap.xml`, request indexing for each page, watch the Coverage report.
- **Build backlinks**: get listed on Houzz, Angi, BBB, local Houston business directories, and your Yelp profile. Backlinks are the single biggest factor in how fast Google trusts and indexes a new site.
- **Patience**: even with everything perfect, full indexing for a new domain takes 4–12 weeks.

Want me to proceed with fixes 1–3 (pre-rendering, sitemap rewrite, per-route SEO fallbacks)?

