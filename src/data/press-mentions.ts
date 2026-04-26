// Press mentions and media coverage of BoldREMO.
// Edit this file to add real mentions as they're earned.
// Until then, slots render as "Coming soon" placeholders.

export type PressMention = {
  outlet: string;
  /** Optional pull-quote shown under the outlet name. */
  quote?: string;
  /** Optional URL to the article. If absent, item renders as a "Coming soon" placeholder. */
  url?: string;
  /** Optional ISO date (YYYY-MM-DD). */
  date?: string;
};

export const PRESS_MENTIONS: PressMention[] = [
  {
    outlet: "Houstonia Magazine",
    quote: "Coming soon — pending feature.",
  },
  {
    outlet: "PaperCity Magazine",
    quote: "Coming soon — pending feature.",
  },
  {
    outlet: "Houston Chronicle Home & Garden",
    quote: "Coming soon — pending feature.",
  },
  {
    outlet: "CultureMap Houston",
    quote: "Coming soon — pending feature.",
  },
  {
    outlet: "Houston Modern Luxury",
    quote: "Coming soon — pending feature.",
  },
  {
    outlet: "Houston Business Journal",
    quote: "Coming soon — pending feature.",
  },
];
