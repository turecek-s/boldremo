import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
        const { data, error } = await supabase.functions.invoke("get-google-reviews", {
          signal: controller.signal,
        });
        if (
          active && !error &&
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