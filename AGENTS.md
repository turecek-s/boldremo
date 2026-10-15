# Architecture rules
- Keep homepage Google review fetching in a dedicated client hook; the review service must answer an unavailable lookup as a normal response with available:false rather than an error status, so an optional failure is never recorded as a page crash and never shows invented ratings.
- Keep the compact founder introduction separate from the hero and before homepage pricing so it remains independently reusable.
- Keep the homepage comparison in a reusable compact image slider with a shared position in its enlarged dialog so visitors can inspect both states without obscuring hero copy.
- Verify homepage comparison image delivery on the published domain after publication; preview-only checks cannot establish production availability.
- Bundle homepage comparison photos as static WebP imports because the asset proxy has failed image loading in browser checks.