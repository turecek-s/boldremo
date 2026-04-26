import type { Plugin } from "vite";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";

/**
 * Per-route SEO content used during build to generate static HTML files
 * for each public route. This ensures non-JS crawlers (Bing, DuckDuckGo,
 * AI bots, and Google's first-pass crawler) see real content for every
 * URL — not the homepage shell.
 *
 * IMPORTANT: keep this list in sync with src/lib/seo-content.ts.
 */
type RouteSeo = { path: string; title: string; description: string; bodyHtml: string };

const HIDDEN_STYLE =
  "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";

const ROUTES: RouteSeo[] = [
  {
    path: "/services",
    title: "Bathroom Remodeling Services Houston | BoldREMO",
    description:
      "Complete bathroom remodeling, custom showers, tile installation, vanities & full home renovations in Houston, Heights, Bellaire, River Oaks & Kingwood.",
    bodyHtml: `<h1>Bathroom Remodeling Services in Houston, TX</h1><p>BoldREMO offers comprehensive bathroom remodeling and home renovation services across Houston, Heights, Bellaire, River Oaks, and Kingwood. Every project is handled by licensed, insured craftsmen with transparent pricing and clear timelines.</p><h2>Complete Bathroom Remodeling</h2><p>Full bathroom renovations tailored to your style and needs.</p><h2>Tile and Flooring Installation</h2><p>Expert tile installation including subway tiles, mosaic patterns, large format tiles, marble, porcelain, and natural stone.</p><h2>Custom Showers</h2><p>Walk-in showers, frameless glass enclosures, rain shower heads, and custom tile work.</p><h2>Vanity and Cabinetry</h2><p>Custom vanity installation, bathroom cabinets, and storage solutions.</p><h2>Plumbing Fixtures</h2><p>Professional installation of faucets, toilets, sinks, and all plumbing fixtures.</p><h2>Full Home Renovations</h2><p>Beyond bathrooms, we offer comprehensive home renovation services.</p><p>Call BoldREMO at (832) 513-5737 or email info@boldremo.com.</p>`,
  },
  {
    path: "/gallery",
    title: "Bathroom Remodel Gallery Houston | BoldREMO Project Photos",
    description:
      "Browse real bathroom remodel projects by BoldREMO across Houston, Heights, Bellaire, River Oaks & Kingwood. Walk-in showers, soaking tubs, custom tile.",
    bodyHtml: `<h1>BoldREMO Bathroom Remodel Gallery — Houston, TX</h1><p>Explore real bathroom remodel projects completed by BoldREMO across Houston and surrounding neighborhoods.</p><h2>Featured Projects</h2><p>Master Bath Transformation in River Oaks — $29,000. Luxury Suite Renovation in Bellaire — $42,000. Spa-Style Retreat in River Oaks — $38,000. Accessible Luxury Bath in Houston Heights with walk-in tub and LED lighting.</p><p>Call BoldREMO at (832) 513-5737.</p>`,
  },
  {
    path: "/about",
    title: "About BoldREMO | Houston Bathroom Remodeling Company",
    description:
      "Meet BoldREMO — Houston's trusted luxury bathroom remodeling team led by Stan. Licensed, insured, and committed to quality craftsmanship and transparent pricing.",
    bodyHtml: `<h1>About BoldREMO — Houston's Luxury Bathroom Remodeling Team</h1><p>BoldREMO is Houston's trusted partner for luxury bathroom remodeling and home renovation. Founded by Stan, our team brings decades of combined craftsmanship experience.</p><h2>Our Values</h2><p>Quality craftsmanship, transparent pricing, licensed and insured professionals, personalized designs, timely project completion, customer satisfaction guarantee.</p><p>Call BoldREMO at (832) 513-5737 or email info@boldremo.com.</p>`,
  },
  {
    path: "/resources",
    title: "Bathroom Remodeling Resources & Planning Guides | BoldREMO",
    description:
      "Free bathroom remodeling guides, cost breakdowns, planning checklists, and tips from Houston's BoldREMO team.",
    bodyHtml: `<h1>Bathroom Remodeling Resources and Planning Guides</h1><p>BoldREMO's free planning resources help Houston homeowners make informed decisions.</p><h2>Cost Breakdown</h2><p>Labor 40-50% of total. Tile $10-$50/sq ft installed. Vanity and fixtures $500-$5,000+. Add 15-20% contingency.</p><h2>Planning Tips</h2><p>Measure space accurately, consider traffic flow, plan for ventilation, account for plumbing locations.</p><p>Call BoldREMO at (832) 513-5737.</p>`,
  },
  {
    path: "/contact",
    title: "Contact BoldREMO | Houston Bathroom Remodeling Consultation",
    description:
      "Contact BoldREMO for a free rough estimate or $75 in-home design consult. Call (832) 513-5737 or email info@boldremo.com.",
    bodyHtml: `<h1>Contact BoldREMO — Book Your Houston Bathroom Consult</h1><p>Get a free rough estimate by phone or email, or book a $75 in-home design consultation.</p><p>Call (832) 513-5737 Monday-Friday 8AM-6PM. Email info@boldremo.com.</p><p>Service area: Houston, Heights, Bellaire, River Oaks, Kingwood, Memorial, West University, Montrose, The Woodlands, Sugar Land.</p>`,
  },
  {
    path: "/realtors-designers",
    title: "Realtor & Designer Partnerships | BoldREMO Houston",
    description:
      "Refer your clients to BoldREMO. Earn referral fees and partner with Houston's luxury bathroom remodeler.",
    bodyHtml: `<h1>For Realtors, Interior Designers &amp; Architects</h1><p>Refer your clients to BoldREMO with confidence. Generous referral fees, trade-priority scheduling, professional after photos, white-glove client experience.</p><h2>How partnership works</h2><p>Apply, 15-minute intro call, start referring.</p><h2>Co-marketing benefits</h2><p>Featured logo on our Press page, trade pricing, joint social features, project photography access.</p><p>Apply today or call (832) 513-5737.</p>`,
  },
  {
    path: "/cost-calculator",
    title: "Houston Bathroom Remodel Cost Calculator | BoldREMO",
    description:
      "Free Houston bathroom remodel cost calculator. Get an instant price range based on size, scope, neighborhood & finishes. Built on real Houston project data.",
    bodyHtml: `<h1>Houston Bathroom Remodel Cost Calculator</h1><p>Get a realistic price range for your Houston bathroom remodel in under 60 seconds. Pricing based on real Houston-area labor and material costs from our completed projects.</p><h2>How It Works</h2><p>Answer 7 quick questions about size, scope, neighborhood, shower, vanity, tile grade, and plumbing changes. Returns a low–high range with full cost breakdown.</p><h2>Houston Cost Ranges</h2><p>Half bath refresh: $4,500–$9,000. Standard mid-range remodel: $18,000–$28,000. Large master luxury renovation: $45,000–$85,000+. River Oaks and Memorial projects typically 15-25% higher.</p><h2>What Drives Cost</h2><p>Labor 40-50% of total. Tile material and coverage. Walk-in glass showers and double vanities. Moving plumbing fixtures adds $1,200–$4,500.</p><p>For an exact written proposal, book a $75 in-home consult. Call (832) 513-5737.</p>`,
  },
  {
    path: "/service-areas/houston",
    title: "Bathroom Remodeling Houston TX | BoldREMO",
    description:
      "Houston's premier bathroom remodeling company. BoldREMO transforms outdated bathrooms into stunning spaces. Call (832) 513-5737.",
    bodyHtml: `<h1>Bathroom Remodeling in Houston, TX</h1><p>BoldREMO is Houston's premier bathroom remodeling company serving every Houston neighborhood. Complete bathroom renovations, custom tile installation, shower and tub conversions, vanity installation, plumbing upgrades, and flooring services.</p><p>Call (832) 513-5737.</p>`,
  },
  {
    path: "/service-areas/heights",
    title: "Bathroom Remodeling Houston Heights | BoldREMO",
    description:
      "Bathroom remodeling for Houston Heights homes. BoldREMO blends historic charm with modern luxury. Call (832) 513-5737.",
    bodyHtml: `<h1>Bathroom Remodeling in Houston Heights</h1><p>BoldREMO specializes in bathroom remodeling for Houston Heights — historic bungalows and craftsman homes meet modern luxury. We respect original architecture while delivering contemporary functionality.</p><p>Call (832) 513-5737.</p>`,
  },
  {
    path: "/service-areas/bellaire",
    title: "Bathroom Remodeling Bellaire TX | BoldREMO",
    description:
      "Bellaire bathroom remodeling and renovation. BoldREMO delivers luxury bathroom transformations for Bellaire family homes. Call (832) 513-5737.",
    bodyHtml: `<h1>Bathroom Remodeling in Bellaire, TX</h1><p>BoldREMO provides premium bathroom remodeling services for Bellaire homeowners — from master suite spa retreats to durable family-friendly hall bathrooms.</p><p>Call (832) 513-5737.</p>`,
  },
  {
    path: "/service-areas/river-oaks",
    title: "Luxury Bathroom Remodeling River Oaks | BoldREMO",
    description:
      "High-end bathroom remodeling for River Oaks estates. BoldREMO delivers spa-quality renovations with premium materials. Call (832) 513-5737.",
    bodyHtml: `<h1>Luxury Bathroom Remodeling in River Oaks</h1><p>BoldREMO delivers high-end bathroom renovations for River Oaks estates featuring premium marble, frameless glass, freestanding soaking tubs, heated floors, and smart home integration.</p><p>Call (832) 513-5737.</p>`,
  },
  {
    path: "/service-areas/kingwood",
    title: "Bathroom Remodeling Kingwood TX | BoldREMO",
    description:
      "Kingwood bathroom remodeling experts. Quality craftsmanship and attention to detail for Kingwood homeowners. Call (832) 513-5737.",
    bodyHtml: `<h1>Bathroom Remodeling in Kingwood, TX</h1><p>BoldREMO serves Kingwood homeowners with quality bathroom remodeling — full remodels, custom tile and shower installation, vanity upgrades, accessibility renovations, and complete spa-style transformations.</p><p>Call (832) 513-5737.</p>`,
  },
];

/**
 * Vite plugin: after the SPA build finishes, copy index.html into a
 * subdirectory for each route and rewrite <title>, meta description,
 * canonical URL, and append a hidden SEO body block.
 *
 * Result: dist/services/index.html, dist/about/index.html, etc.
 * Lovable's hosting will serve these directly when crawlers (or users)
 * hit those URLs, instead of falling back to the SPA shell.
 */
export function prerenderRoutes(): Plugin {
  return {
    name: "boldremo-prerender-routes",
    apply: "build",
    closeBundle() {
      const distDir = resolve(process.cwd(), "dist");
      const indexPath = resolve(distDir, "index.html");
      if (!existsSync(indexPath)) {
        // eslint-disable-next-line no-console
        console.warn("[prerenderRoutes] dist/index.html not found, skipping");
        return;
      }
      const baseHtml = readFileSync(indexPath, "utf-8");

      for (const route of ROUTES) {
        let html = baseHtml;
        const canonical = `https://www.boldremo.com${route.path}`;

        // Replace <title>
        html = html.replace(
          /<title>[\s\S]*?<\/title>/,
          `<title>${escapeHtml(route.title)}</title>`,
        );

        // Replace primary description meta
        html = html.replace(
          /<meta name="description" content="[^"]*" \/>/,
          `<meta name="description" content="${escapeAttr(route.description)}" />`,
        );

        // Replace OG title/description/url and Twitter equivalents + canonical
        html = html.replace(
          /<meta property="og:title" content="[^"]*" \/>/,
          `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
        );
        html = html.replace(
          /<meta property="og:description" content="[^"]*" \/>/,
          `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
        );
        html = html.replace(
          /<meta property="og:url" content="[^"]*" \/>/,
          `<meta property="og:url" content="${canonical}" />`,
        );
        html = html.replace(
          /<meta name="twitter:title" content="[^"]*" \/>/,
          `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
        );
        html = html.replace(
          /<meta name="twitter:description" content="[^"]*" \/>/,
          `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
        );
        html = html.replace(
          /<link rel="canonical" href="[^"]*" \/>/,
          `<link rel="canonical" href="${canonical}" />`,
        );

        // Inject route-specific hidden body content right after <div id="root">
        const routeBlock = `<div style="${HIDDEN_STYLE}" aria-hidden="true">${route.bodyHtml}</div>`;
        html = html.replace(
          /<div id="root">/,
          `<div id="root">${routeBlock}`,
        );

        // Write to dist/<route>/index.html
        const outPath = resolve(distDir, `.${route.path}/index.html`);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, html, "utf-8");
        // eslint-disable-next-line no-console
        console.log(`[prerenderRoutes] wrote ${route.path}/index.html`);
      }
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
