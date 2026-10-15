# Architecture rules
- Keep homepage Google review fetching in a dedicated client hook; unavailable review data must not block the hero or display invented ratings.
- Keep the compact founder introduction separate from the hero and before homepage pricing so it remains independently reusable.
- Keep the homepage before/after photographs in a labeled two-column comparison separate from hero copy so visitors can inspect both states without text obscuring the work.
- Import the homepage vanity comparison photos as bundled static WebP files so their URLs are emitted with the production deployment rather than relying on asset proxy delivery.