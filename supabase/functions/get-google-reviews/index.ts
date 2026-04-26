// Public edge function: fetches Google Place reviews and caches in-memory for 12h.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PLACE_ID = "ChIJC2de_m7HQIYRNyLNGz8FSNg";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

type CachedReviews = {
  fetchedAt: number;
  payload: unknown;
};

let cache: CachedReviews | null = null;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GOOGLE_PLACES_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
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
      return new Response(
        JSON.stringify({
          error: "Google Places API error",
          status: data.status,
          message: data.error_message,
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const result = data.result ?? {};
    const payload = {
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
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
