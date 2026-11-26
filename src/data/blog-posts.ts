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
  seoTitle?: string;
  focusKeyword: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishDate: string;
  imageAlt: string;
  heroImage?: string;
  gallery?: { src: string; alt: string; label: "Before" | "After" }[];
  tiktokUrl?: string;
  body: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "walk-in-tub-installation-houston",
    title:
      "Walk-In Tub Installation Houston: What Goes Into an Aging-in-Place Bathroom Remodel",
    seoTitle: "Walk-In Tub Installation Houston | BoldREMO",
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
        heading: "Serving Houston, Heights, Bellaire, River Oaks, Kingwood, and Memorial",
        paragraph:
          "BoldREMO installs walk-in tubs and full bathroom remodels throughout the Houston area, including the Heights, Bellaire, River Oaks, Kingwood, and Memorial. If you're exploring aging-in-place options for yourself or a family member, we're happy to talk through what makes sense for your bathroom.",
      },
    ],
  },
  {
    slug: "kingwood-bathroom-remodel",
    title: "Kingwood Bathroom Remodel: Dated Tile Tub Surround to a Bright Modern Bath",
    seoTitle: "Kingwood Bathroom Remodel: Before and After | BoldREMO",
    focusKeyword: "Kingwood bathroom remodel",
    metaDescription:
      "See a Kingwood bathroom remodel by BoldREMO: dated tile and an old tub replaced with large-format wall tile, a full-width niche, gold fixtures and a new vanity.",
    excerpt:
      "In this Kingwood bathroom remodel, we replaced a dated square-tile tub surround, speckled floor tile and a tired vanity with large-format wall tile to the ceiling, a full-width blush tile niche, brushed gold fixtures and a furniture-style vanity.",
    category: "Bathroom Remodels",
    publishDate: "2026-11-17",
    heroImage: "/blog/kingwood-bathroom-remodel/kingwood-bathroom-remodel-after-tub-shower.webp",
    imageAlt: 'Kingwood bathroom remodel with large-format light beige wall tile to the ceiling, full-width blush tile niche and brushed gold rain shower over a new tub',
    body: [
      {
        heading: 'About This Kingwood Bathroom Remodel',
        paragraph: 'For this Kingwood bathroom remodel, the goal was a bathroom that feels bright and calm, is easy to clean in Houston humidity, and shows the kind of finish work we do for clients every day.',
      },
      {
        heading: 'Before: What We Started With',
        paragraph: 'The bathroom was solid but showing its age:',
        bullets: [
          { label: 'Tub surround', text: 'Small white square tile that stopped short of the ceiling.' },
          { label: 'Tub and shower', text: 'An old tub and a basic shower head.' },
          { label: 'Floor', text: 'Speckled terrazzo-style floor tile.' },
          { label: 'Walls and ceiling', text: 'Textured finish throughout.' },
          { label: 'Vanity', text: 'A white vanity with a dark top and a glass mosaic backsplash.' },
          { label: 'Mirror and light', text: 'A framed mirror and a three-light bar.' },
        ],
      },
      {
        heading: 'The New Tub and Shower',
        paragraph: 'The tub wall is now the focal point of the room:',
        bullets: [
          { label: 'Tub', text: 'A new Kohler alcove tub.' },
          { label: 'Wall tile', text: 'Large-format porcelain wall tile in light beige and off-white with a soft linear pattern, installed horizontally all the way to the ceiling.' },
          { label: 'Niche', text: 'A full-width shower niche lined with blush subway-style tile.' },
          { label: 'Trim', text: 'Brushed gold edge trim.' },
          { label: 'Fixtures', text: 'A brushed gold rain head, a handheld shower on a slide bar and a matching tub spout, all on a Kohler shower valve.' },
          { label: 'Lighting', text: 'Recessed lights over the tub.' },
        ],
      },
      {
        heading: 'Kingwood Bathroom Remodel Details: Vanity Wall and Lighting',
        paragraph: 'We tiled the vanity wall floor to ceiling as an accent wall and built the space around it:',
        bullets: [
          { label: 'Vanity', text: 'A freestanding espresso vanity with gold hardware and an open shelf.' },
          { label: 'Countertop', text: 'A white quartz countertop with an undermount sink and a brushed gold widespread faucet.' },
          { label: 'Mirror', text: 'An arched backlit mirror with a medicine cabinet recessed into the wall, so storage stays hidden.' },
          { label: 'Sconces', text: 'Two brushed gold sconces.' },
          { label: 'Accessories', text: 'A gold towel ring, hooks and toilet paper holder.' },
        ],
      },
      {
        heading: 'Floors, Paint and Finish',
        paragraph: 'The rest of the room got the same attention:',
        bullets: [
          { label: 'Floor', text: 'Large-format light-colored porcelain floor tile.' },
          { label: 'Walls and ceiling', text: 'The old texture was removed, then the walls and ceiling were finished smooth and painted soft lavender.' },
          { label: 'Trim', text: 'New baseboards.' },
          { label: 'Ventilation', text: 'A new exhaust fan to pull out shower steam.' },
          { label: 'Timeline', text: 'The whole remodel took two weeks.' },
        ],
      },
      {
        heading: 'Planning a Bathroom Remodel in Kingwood or Houston?',
        paragraph: 'Our team has remodeled 200+ bathrooms across the Houston area, including Kingwood, the Heights, Bellaire, Memorial and River Oaks. If your bathroom has dated tile, an old tub or a vanity that no longer works for you, contact BoldREMO to talk about your Kingwood bathroom remodel and get an estimate.',
      },
    ],
    gallery: [
      { label: "After", src: "/blog/kingwood-bathroom-remodel/kingwood-bathroom-remodel-after-tub-shower.webp", alt: 'Kingwood bathroom remodel with large-format light beige wall tile to the ceiling, full-width blush tile niche and brushed gold rain shower over a new tub' },
      { label: "After", src: "/blog/kingwood-bathroom-remodel/kingwood-bathroom-remodel-after-shower-side.webp", alt: 'Side view of a remodeled tub surround with a long shower niche and brushed gold shower fixtures' },
      { label: "After", src: "/blog/kingwood-bathroom-remodel/kingwood-bathroom-remodel-after-vanity.webp", alt: 'Espresso freestanding vanity with white top, arched backlit mirror cabinet and gold sconces on a tile accent wall' },
      { label: "Before", src: "/blog/kingwood-bathroom-remodel/kingwood-bathroom-remodel-before-tub.webp", alt: 'Before the remodel: old tub with small white square tile surround' },
      { label: "Before", src: "/blog/kingwood-bathroom-remodel/kingwood-bathroom-remodel-before-full-room.webp", alt: 'Before the remodel: full view of the dated bathroom with textured walls and three-light fixture' },
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
