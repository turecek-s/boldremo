## Fix Google Search Console Image Metadata Warnings

Google flagged 4 missing fields on your image structured data. All are non-critical but adding them improves your images' presentation in search results and could prevent them from becoming critical later.

### What changes

**File: `src/components/ImageGallerySchema.tsx`**

Add these four fields to every `ImageObject` in the schema:

- `license` — URL to your copyright/terms page (we'll point to your site's about or a simple rights statement)
- `acquireLicensePage` — URL where someone can request to use your images (contact page)
- `creditText` — "BoldREMO"
- `copyrightNotice` — "© 2025 BoldREMO. All rights reserved."

No visual changes. No new pages needed. Just a small update to the JSON-LD structured data that Google already reads.