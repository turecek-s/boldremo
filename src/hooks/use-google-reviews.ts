import { useEffect, useState } from "react";

type GoogleReviewSummary = {
  rating: number;
  totalReviews: number;
};

export function useGoogleReviews() {
  const [summary, setSummary] = useState<GoogleReviewSummary | null>(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    async function loadReviews() {
      try {
        // Use a plain request so an optional service failure does not become an
        // invocation error in the preview's runtime error reporting.
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-google-reviews`, {
          method: "POST",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            "Content-Type": "application/json",
          },
          body: "{}",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = await response.json();
        if (
          active &&
          typeof data?.rating === "number" && Number.isFinite(data.rating) &&
          data.rating >= 0 && data.rating <= 5 &&
          Number.isInteger(data.totalReviews) && data.totalReviews > 0
        ) {
          setSummary({ rating: data.rating, totalReviews: data.totalReviews });
        }
      } catch {
        // The static trust statistics remain visible when reviews are unavailable.
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void loadReviews();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return summary;
}