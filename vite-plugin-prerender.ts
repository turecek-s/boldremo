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
type RouteSeo = { path: string; title: string; description: string; bodyHtml: string; noindex?: boolean };

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
    path: "/tub-to-shower-conversion-houston",
    title:
      "Tub to Shower Conversion Houston TX | Full Bathroom Transformation | BoldREMO",
    description:
      "BoldREMO transforms Houston bathrooms — replace your unused tub with a custom shower and refresh the whole space. Honest pricing, quality work. Call (832) 513-5737.",
    bodyHtml: `<h1>Tub to Shower Conversion in Houston, TX</h1><p>BoldREMO turns your unused tub into a custom walk-in shower and transforms the whole bathroom — new floor tile, vanity, toilet, fixtures, mirror, and paint.</p><h2>What's Included</h2><p>Custom shower with Schluter waterproofing and GoBoard backer, tile walls, center drain, frameless glass. New floor tile, vanity, toilet, light fixtures, mirror, paint. All labor and installation materials included.</p><h2>What You Supply</h2><p>Tile, toilet, vanity, faucet and hardware, light fixtures, mirror, paint color.</p><h2>Cost</h2><p>Labor and installation materials $8,000–$15,000. Finish materials typically $2,000–$6,000 on top. Total all-in $10,000–$21,000.</p><h2>Timeline</h2><p>7 to 12 days for most projects.</p><h2>FAQs</h2><p>Shower-only conversions start at $7,000. We work with tile you've purchased. We install frameless glass through a local Houston supplier.</p><p>Call (832) 513-5737 or email info@boldremo.com. Serving Heights, Bellaire, River Oaks, Kingwood, and all of Houston.</p>`,
  },
  {
    path: "/bathroom-remodel-cost-houston",
    title: "How Much Does a Bathroom Remodel Cost in Houston? | BoldREMO",
    description:
      "Real bathroom remodel cost data for Houston homeowners from BoldREMO. What you pay BoldREMO, what you spend on materials, and what to expect total. Call (832) 513-5737.",
    bodyHtml: `<h1>How Much Does a Bathroom Remodel Cost in Houston?</h1><p>Here's how BoldREMO breaks it down so you know what to expect.</p><h2>How BoldREMO Pricing Works</h2><p>BoldREMO charges for labor and installation materials. You purchase your own finish materials — tile, toilet, vanity, faucets, fixtures, mirror, and hardware.</p><h2>What You Pay BoldREMO</h2><p>Shower-only conversion starting at $7,000. Full bathroom transformation $8,000–$15,000. Master bathroom renovation $15,000–$35,000. Luxury spa build $35,000 and up.</p><h2>What You Budget for Finish Materials</h2><p>Smaller bathroom $2,000–$6,000. Master bathroom $5,000–$20,000+.</p><h2>Total All-In Investment</h2><p>Smaller full bathroom $10,000–$21,000. Master bathroom $20,000–$55,000+. Luxury spa build $50,000 and up.</p><h2>What Drives Cost Up</h2><p>Layout changes, larger tile formats, custom shower details, heated floors, high-end stone, bathroom size.</p><h2>FAQs</h2><p>Why do quotes vary? Scope, materials, layout changes. Supply own materials? Yes. How long? 7–12 days smaller bath, 3–6 weeks master.</p><h2>Get an Accurate Number</h2><p>Call (832) 513-5737 for a free rough estimate. $75 in-person consultation credited to your project.</p>`,
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
      "Free Houston bathroom remodel cost calculator. Instant price range by size, scope, neighborhood & finishes. Built on real Houston project data.",
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
  {
    path: "/press",
    title: "Press, Partners & Recognition | BoldREMO Houston",
    description:
      "BoldREMO's media coverage, trusted Houston suppliers, designer & realtor partners, and contractor certifications.",
    bodyHtml: `<h1>BoldREMO Press, Partners &amp; Recognition</h1><p>BoldREMO partners with Houston's leading suppliers, designers, and realtors to deliver luxury bathroom remodels across Heights, Bellaire, River Oaks, Kingwood, and beyond.</p><h2>As Featured In</h2><p>Houstonia Magazine, PaperCity, Houston Chronicle Home &amp; Garden, CultureMap Houston, Houston Modern Luxury, Houston Business Journal.</p><h2>Trusted Partners</h2><p>Daltile Houston, Cosentino, Ferguson Bath Kitchen &amp; Lighting, Architectural Design Resource.</p><h2>Certifications</h2><p>Licensed and insured Texas contractor (TDLR registered), BBB accredited, Houzz Pro member, NARI Houston member.</p><p>Call (832) 513-5737.</p>`,
  },
  {
    path: "/admin",
    title: "Admin Dashboard | BoldREMO",
    description:
      "Private admin dashboard for BoldREMO staff. Authentication required.",
    bodyHtml: `<h1>Admin</h1><p>Private staff area.</p>`,
    noindex: true,
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
        // Trailing slash form — Lovable hosting resolves /services/ to
        // dist/services/index.html. The extensionless /services hits the
        // SPA fallback, so canonical and sitemap MUST advertise the slash form.
        const canonical = `https://www.boldremo.com${route.path}/`;


        // Inject route-specific head tags right after <head>. Browsers and
        // crawlers honor the FIRST occurrence of <title> and the first
        // <link rel="canonical">, so this overrides whatever is later in
        // the static index.html head without needing fragile regex replaces.
        html = html.replace(
          '<head>',
          `<head>
  <title>${escapeHtml(route.title)}</title>
  <meta name="description" content="${escapeAttr(route.description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${escapeAttr(route.title)}" />
  <meta property="og:description" content="${escapeAttr(route.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:title" content="${escapeAttr(route.title)}" />
  <meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
        );

        // Add noindex robots meta for private routes
        if (route.noindex) {
          html = html.replace(
            /<\/head>/,
            `  <meta name="robots" content="noindex,nofollow" />\n  </head>`,
          );
        }

        // Inject route-specific hidden body content right after <div id="root">
        const routeBlock = `<div style="${HIDDEN_STYLE}" aria-hidden="true">${route.bodyHtml}</div>`;
        html = html.replace(
          /<div id="root">/,
          `<div id="root">${routeBlock}`,
        );

        // Write to BOTH dist/<route>/index.html AND dist/<route>.html
        // The flat .html file is what Lovable's static hosting resolves when
        // a request comes in for /<route> (without trailing slash), before
        // the SPA fallback to root index.html fires.
        const dirPath = resolve(distDir, `.${route.path}/index.html`);
        mkdirSync(dirname(dirPath), { recursive: true });
        writeFileSync(dirPath, html, "utf-8");

        const flatPath = resolve(distDir, `.${route.path}.html`);
        mkdirSync(dirname(flatPath), { recursive: true });
        writeFileSync(flatPath, html, "utf-8");

        // eslint-disable-next-line no-console
        console.log(`[prerenderRoutes] wrote ${route.path}.html and ${route.path}/index.html`);

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
