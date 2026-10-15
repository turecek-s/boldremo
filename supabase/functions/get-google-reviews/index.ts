// Public edge function: fetches Google Place reviews and caches in-memory for 12h.
// Review totals are an optional enhancement, so an unavailable lookup answers as a
// normal response with available:false instead of surfacing a failed request to the page.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PLACE_ID = "ChIJC2de_m7HQIYRNyLNGz8FSNg";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

type ReviewsPayload = {
  available: boolean;
  name: string | null;
  rating: number | null;
  totalReviews: number;
  googleUrl: string | null;
  reviews: Array<Record<string, unknown>>;
};

type CachedReviews = {
  fetchedAt: number;
  payload: ReviewsPayload;
};

let cache: CachedReviews | null = null;

const unavailableResponse = (reason: string) => {
  const payload: ReviewsPayload = {
    available: false,
    name: null,
    rating: null,
    totalReviews: 0,
    googleUrl: null,
    reviews: [],
  };
  return new Response(JSON.stringify({ ...payload, reason }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      console.error("get-google-reviews: GOOGLE_PLACES_API_KEY is not configured");
      return unavailableResponse("missing_api_key");
    }

    // Serve from cache if fresh
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      return new Response(JSON.stringify({ ...cache.payload, cached: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", PLACE_ID);
    url.searchParams.set(
      "fields",
      "name,rating,user_ratings_total,reviews,url",
    );
    // Surface the most-helpful reviews
    url.searchParams.set("reviews_sort", "most_relevant");
    url.searchParams.set("reviews_no_translations", "true");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status, data.error_message);
      return unavailableResponse("google_unavailable");
    }

    const result = data.result ?? {};
    const payload: ReviewsPayload = {
      available: true,
      name: result.name ?? null,
      rating: result.rating ?? null,
      totalReviews: result.user_ratings_total ?? 0,
      googleUrl: result.url ?? null,
      reviews: Array.isArray(result.reviews)
        ? result.reviews.map((r: Record<string, unknown>) => ({
            authorName: r.author_name,
            authorUrl: r.author_url,
            profilePhotoUrl: r.profile_photo_url,
            rating: r.rating,
            relativeTime: r.relative_time_description,
            time: r.time,
            text: r.text,
            language: r.language,
          }))
        : [],
    };

    cache = { fetchedAt: Date.now(), payload };

    return new Response(JSON.stringify({ ...payload, cached: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("get-google-reviews error:", message);
    return unavailableResponse("unexpected_error");
  }
});
