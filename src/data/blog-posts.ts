// Blog content for the BoldREMO site.
// Add new posts by appending to BLOG_POSTS. Page components render
// whatever sections are defined here, so no component changes are needed.

export type BlogBullet = {
  label: string;
  text: string;
};

export type BlogSection = {
  /** Optional h2 heading. Omit for an intro paragraph. */
  heading?: string;
  paragraph: string;
  bullets?: BlogBullet[];
};

export type BlogPost = {
  slug: string;
  title: string;
  focusKeyword: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishDate: string;
  imageAlt: string;
  tiktokUrl?: string;
  body: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "walk-in-tub-installation-houston",
    title:
      "Walk-In Tub Installation Houston: What Goes Into an Aging-in-Place Bathroom Remodel",
    focusKeyword: "walk-in tub installation Houston",
    metaDescription:
      "Considering a walk-in tub for aging in place? See what a proper walk-in tub installation actually involves in a Houston bathroom remodel, from waterproofing to door seal testing.",
    excerpt:
      "A walk-in tub is one of the most requested aging-in-place upgrades we build in Houston. Here's what actually goes into the install, and what to ask before you hire someone.",
    category: "Accessibility & Aging in Place",
    publishDate: "2026-07-30",
    imageAlt:
      "Walk-in tub installation with tile surround, Houston bathroom remodel by BoldREMO",
    tiktokUrl:
      "https://www.tiktok.com/@boldremo_llc/video/7490161974328708395",
    body: [
      {
        paragraph:
          "We recently finished a walk-in tub installation for a client in the Houston area, the kind of project we get asked about often but don't talk about enough on the site.",
      },
      {
        heading: "Why Houston Homeowners Choose Walk-In Tubs",
        paragraph:
          "Walk-in tubs solve a real problem: getting in and out of a standard tub safely gets harder with age, joint issues, or mobility limitations. A walk-in tub has a low step-in threshold and a sealed door instead of a wall you climb over. For homeowners who want to stay in their current home rather than move, it's one of the highest-impact changes you can make to a bathroom.",
      },
      {
        heading: "What a Proper Walk-In Tub Installation Actually Involves",
        paragraph:
          "A walk-in tub is not a drop-in swap. Done correctly, the install touches the floor structure, the waterproofing, the plumbing, and the finish work around the unit.",
        bullets: [
          {
            label: "Floor leveling",
            text: "Older Houston homes can have floors out of level, which has to get corrected first.",
          },
          {
            label: "Waterproofing",
            text: "The area is fully waterproofed before tile, the same standard as any shower.",
          },
          {
            label: "Door seal testing",
            text: "Every walk-in tub door gets tested for a watertight seal before the job is called done.",
          },
          {
            label: "Tile and finish work",
            text: "The surround is finished with the client's chosen tile once the tub and plumbing are set.",
          },
        ],
      },
      {
        heading: "What a Walk-In Tub Remodel Costs in Houston",
        paragraph:
          "Because a walk-in tub install includes the tub unit itself plus plumbing changes, floor leveling, waterproofing, and finish work, pricing runs closer to a full bathroom transformation than a simple swap. Labor and installation typically fall in the $8,000 to $15,000 range, with the tub unit and finish materials adding to that depending on what you choose.",
      },
      {
        heading: "Questions to Ask Before You Hire",
        paragraph:
          "If you're getting quotes for a walk-in tub, ask directly: will you test the door seal before calling the job done? Will you check and correct floor level before installation? A contractor who hesitates on either question is telling you something.",
      },
      {
        heading: "Serving Houston, Heights, Bellaire, River Oaks, and Kingwood",
        paragraph:
          "BoldREMO installs walk-in tubs and full bathroom remodels throughout the Houston area, including the Heights, Bellaire, River Oaks, and Kingwood. If you're exploring aging-in-place options for yourself or a family member, we're happy to talk through what makes sense for your bathroom.",
      },
    ],
  },
];

export function getBlogPost(slug?: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Extracts the numeric video id from a TikTok video URL. */
export function getTikTokVideoId(url: string): string | undefined {
  return url.match(/\/video\/(\d+)/)?.[1];
}
