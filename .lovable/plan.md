

## Plan: Add Houston to Service Areas Navigation & Footer

Houston has a page and route but is missing from the header dropdown and footer links.

### Changes

1. **`src/components/Header.tsx`** — Add `{ name: "Houston", path: "/service-areas/houston" }` as the first item in the `serviceAreaLinks` array (line ~18).

2. **`src/components/Footer.tsx`** — Add `{ name: "Houston", path: "/service-areas/houston" }` as the first item in the `serviceAreaLinks` array (line ~14).

Two small edits, no other files affected.

