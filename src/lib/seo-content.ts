// Per-route SEO content for crawlers and pre-rendering.
// Each route gets a unique title, description, and a hidden HTML
// fallback that non-JS crawlers (Bing, DuckDuckGo, AI bots) can read.

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  /** Hidden HTML body content (will be visually hidden via inline style). */
  bodyHtml: string;
};

const HIDDEN_STYLE =
  "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";

export const ROUTE_SEO: Record<string, RouteSeo> = {
  "/services": {
    path: "/services",
    title: "Bathroom Remodeling Services Houston | BoldREMO",
    description:
      "Complete bathroom remodeling, custom showers, tile installation, vanities & full home renovations in Houston, Heights, Bellaire, River Oaks & Kingwood.",
    bodyHtml: `
      <h1>Bathroom Remodeling Services in Houston, TX</h1>
      <p>BoldREMO offers comprehensive bathroom remodeling and home renovation services across Houston, Heights, Bellaire, River Oaks, and Kingwood. Every project is handled by licensed, insured craftsmen with transparent pricing and clear timelines.</p>
      <h2>Complete Bathroom Remodeling</h2>
      <p>Full bathroom renovations tailored to your style and needs. From layout redesign to fixture selection, we handle every detail of your bathroom transformation.</p>
      <h2>Tile and Flooring Installation</h2>
      <p>Expert tile installation including subway tiles, mosaic patterns, large format tiles, marble, porcelain, and natural stone. We deliver perfectly aligned grout lines and lasting craftsmanship.</p>
      <h2>Custom Showers</h2>
      <p>Walk-in showers, frameless glass enclosures, rain shower heads, and custom tile work for a spa-like bathing experience.</p>
      <h2>Vanity and Cabinetry</h2>
      <p>Custom vanity installation, bathroom cabinets, and storage solutions designed to maximize space and complement your style.</p>
      <h2>Plumbing Fixtures</h2>
      <p>Professional installation of faucets, toilets, sinks, and all plumbing fixtures with quality craftsmanship and licensed plumbers.</p>
      <h2>Full Home Renovations</h2>
      <p>Beyond bathrooms, we offer comprehensive home renovation services to transform your entire living space.</p>
      <p>Call BoldREMO at (832) 513-5737 or email info@boldremo.com to book your bathroom consult.</p>
    `,
  },
  "/gallery": {
    path: "/gallery",
    title: "Bathroom Remodel Gallery Houston | BoldREMO Project Photos",
    description:
      "Browse real bathroom remodel projects by BoldREMO across Houston, Heights, Bellaire, River Oaks & Kingwood. Walk-in showers, soaking tubs, custom tile.",
    bodyHtml: `
      <h1>BoldREMO Bathroom Remodel Gallery — Houston, TX</h1>
      <p>Explore real bathroom remodel projects completed by BoldREMO across Houston and surrounding neighborhoods. Each project showcases our craftsmanship in tile work, custom showers, vanities, and full bathroom renovations.</p>
      <h2>Featured Project Types</h2>
      <p>Master Bath Transformation in River Oaks featuring a glass walk-in shower with marble tile and freestanding tub — a $29,000 renovation.</p>
      <p>Luxury Suite Renovation in Bellaire with a chandelier, custom glass shower, and premium finishes — a $42,000 transformation.</p>
      <p>Spa-Style Retreat in River Oaks featuring a decorative tile accent wall and freestanding soaking tub — a $38,000 project.</p>
      <p>Accessible Luxury Bath in Houston Heights with a walk-in tub, LED lighting, and marble tile — designed for comfort and elegance.</p>
      <h2>What Our Gallery Showcases</h2>
      <p>Glass walk-in showers, frameless enclosures, freestanding soaking tubs, marble and porcelain tile work, custom vanities, modern fixtures, and complete spa-style bathroom retreats. Every photo represents a real BoldREMO project completed in the greater Houston area.</p>
      <p>Ready to transform your bathroom? Call BoldREMO at (832) 513-5737 or email info@boldremo.com.</p>
    `,
  },
  "/about": {
    path: "/about",
    title: "About BoldREMO | Houston Bathroom Remodeling Company",
    description:
      "Meet BoldREMO — Houston's trusted luxury bathroom remodeling team led by Stan. Licensed, insured, and committed to quality craftsmanship and transparent pricing.",
    bodyHtml: `
      <h1>About BoldREMO — Houston's Luxury Bathroom Remodeling Team</h1>
      <p>BoldREMO is Houston's trusted partner for luxury bathroom remodeling and home renovation. Founded by Stan, our team brings decades of combined craftsmanship experience to every project across Houston, Heights, Bellaire, River Oaks, and Kingwood.</p>
      <h2>Our Values</h2>
      <p>Quality craftsmanship on every project. Transparent pricing with no hidden costs. Licensed and insured professionals. Personalized designs for your unique space. Timely project completion. Customer satisfaction guarantee.</p>
      <h2>Why Homeowners Choose BoldREMO</h2>
      <p>We are a Houston-based contractor serving local neighborhoods with personalized service. Our team uses only premium materials from trusted suppliers, works with licensed plumbers and electricians, and provides detailed project schedules so you always know what to expect.</p>
      <h2>Get In Touch</h2>
      <p>Call Stan and the BoldREMO team at (832) 513-5737 or email info@boldremo.com to book your bathroom consult.</p>
    `,
  },
  "/resources": {
    path: "/resources",
    title: "Bathroom Remodeling Resources & Planning Guides | BoldREMO",
    description:
      "Free bathroom remodeling guides, cost breakdowns, planning checklists, and tips from Houston's BoldREMO team. Plan your renovation with confidence.",
    bodyHtml: `
      <h1>Bathroom Remodeling Resources and Planning Guides</h1>
      <p>BoldREMO's free planning resources help Houston homeowners make informed decisions about their bathroom renovation. Browse our guides on budgeting, layout, materials, and timelines.</p>
      <h2>Complete Bathroom Remodel Planning Guide</h2>
      <p>Everything you need to know before starting your bathroom renovation, from budgeting to timeline expectations. Measure your space accurately before shopping for fixtures, consider traffic flow and door swing, plan for ventilation, and account for plumbing locations.</p>
      <h2>Bathroom Remodeling Cost Breakdown</h2>
      <p>Labor typically accounts for 40 to 50 percent of total cost. Tile installation runs $10 to $50 per square foot installed. Vanity and fixtures range from $500 to $5,000+ depending on quality. Always add 15 to 20 percent contingency for unexpected issues.</p>
      <h2>Tile Selection and Installation Tips</h2>
      <p>Choose larger tiles to make small bathrooms appear bigger. Use slip-resistant tiles in shower areas for safety. Consider grout color carefully — it dramatically affects the final look.</p>
      <h2>Plumbing and Fixture Considerations</h2>
      <p>Plan plumbing changes early to avoid costly mid-project surprises. Choose water-efficient fixtures to reduce long-term utility bills. Always work with licensed plumbers for any major plumbing work.</p>
      <p>Download our free planning checklist or call BoldREMO at (832) 513-5737.</p>
    `,
  },
  "/contact": {
    path: "/contact",
    title: "Contact BoldREMO | Houston Bathroom Remodeling Consultation",
    description:
      "Contact BoldREMO for a free rough estimate or $75 in-home design consult. Call (832) 513-5737 or email info@boldremo.com. Houston bathroom remodeling experts.",
    bodyHtml: `
      <h1>Contact BoldREMO — Book Your Houston Bathroom Consult</h1>
      <p>Ready to transform your bathroom? Get a free rough estimate by phone or email, or book a $75 in-home design consultation with BoldREMO.</p>
      <h2>Phone</h2>
      <p>Call us at (832) 513-5737 Monday through Friday, 8:00 AM to 6:00 PM.</p>
      <h2>Email</h2>
      <p>Email us at info@boldremo.com — we typically respond within one business day.</p>
      <h2>Service Area</h2>
      <p>BoldREMO serves Houston, Heights, Bellaire, River Oaks, Kingwood, Memorial, West University, Montrose, The Woodlands, and Sugar Land.</p>
      <h2>How Our Estimates Work</h2>
      <p>Step 1: Free rough estimate by phone or email — no home visit required. Step 2: $75 in-home design consult with detailed measurements and realistic pricing — credited to your project. Step 3: Written proposal and timeline with itemized costs and material selections.</p>
    `,
  },
  "/service-areas/houston": {
    path: "/service-areas/houston",
    title: "Bathroom Remodeling Houston TX | BoldREMO",
    description:
      "Houston's premier bathroom remodeling company. BoldREMO transforms outdated bathrooms into stunning spaces. Serving all Houston neighborhoods. Call (832) 513-5737.",
    bodyHtml: `
      <h1>Bathroom Remodeling in Houston, TX</h1>
      <p>BoldREMO is Houston's premier bathroom remodeling company. We transform outdated bathrooms into stunning, functional spaces across every Houston neighborhood including Heights, Bellaire, River Oaks, Kingwood, Memorial, West University, and Montrose.</p>
      <h2>Houston Bathroom Remodeling Services</h2>
      <p>Complete bathroom renovations, custom tile installation, shower and tub conversions, vanity and countertop installation, plumbing fixture upgrades, and flooring services.</p>
      <p>Call BoldREMO at (832) 513-5737 or email info@boldremo.com to book your Houston bathroom consult.</p>
    `,
  },
  "/service-areas/heights": {
    path: "/service-areas/heights",
    title: "Bathroom Remodeling Houston Heights | BoldREMO",
    description:
      "Bathroom remodeling for Houston Heights homes. BoldREMO blends historic charm with modern luxury. Custom tile, walk-in showers, full renovations. (832) 513-5737.",
    bodyHtml: `
      <h1>Bathroom Remodeling in Houston Heights</h1>
      <p>BoldREMO specializes in bathroom remodeling for Houston Heights — a neighborhood where historic bungalows and craftsman homes meet modern luxury. We respect original architecture while delivering contemporary functionality and high-end finishes.</p>
      <h2>Heights-Specific Expertise</h2>
      <p>Working with older Heights homes requires careful planning around existing plumbing, original tile, and unique layouts. Our team has deep experience updating Heights bathrooms while preserving the character that makes the neighborhood special.</p>
      <p>Call BoldREMO at (832) 513-5737 to book your Heights bathroom consult.</p>
    `,
  },
  "/service-areas/bellaire": {
    path: "/service-areas/bellaire",
    title: "Bathroom Remodeling Bellaire TX | BoldREMO",
    description:
      "Bellaire bathroom remodeling and renovation. BoldREMO delivers luxury bathroom transformations for Bellaire family homes. Call (832) 513-5737.",
    bodyHtml: `
      <h1>Bathroom Remodeling in Bellaire, TX</h1>
      <p>BoldREMO provides premium bathroom remodeling services for Bellaire homeowners. Known for excellent schools and family-friendly atmosphere, Bellaire deserves bathrooms that match its quality of life.</p>
      <h2>Bellaire Bathroom Renovation</h2>
      <p>From master suite spa retreats to durable, family-friendly hall bathrooms, our Bellaire projects feature custom tile, walk-in showers, double vanities, and premium fixtures.</p>
      <p>Call BoldREMO at (832) 513-5737 to book your Bellaire bathroom consult.</p>
    `,
  },
  "/service-areas/river-oaks": {
    path: "/service-areas/river-oaks",
    title: "Luxury Bathroom Remodeling River Oaks | BoldREMO",
    description:
      "High-end bathroom remodeling for River Oaks estates. BoldREMO delivers spa-quality renovations with premium materials and impeccable craftsmanship. (832) 513-5737.",
    bodyHtml: `
      <h1>Luxury Bathroom Remodeling in River Oaks</h1>
      <p>BoldREMO delivers high-end bathroom renovations that match the elegance of River Oaks estates. Our River Oaks projects feature premium marble, frameless glass, freestanding soaking tubs, heated floors, and smart home integration.</p>
      <h2>Spa-Quality Craftsmanship</h2>
      <p>Every River Oaks bathroom we build is treated as a personal sanctuary. We work with the finest materials and most experienced craftsmen to deliver renovations worthy of the neighborhood.</p>
      <p>Call BoldREMO at (832) 513-5737 to book your River Oaks bathroom consult.</p>
    `,
  },
  "/press": {
    path: "/press",
    title: "Press, Partners & Recognition | BoldREMO Houston",
    description:
      "BoldREMO's media coverage, trusted Houston suppliers, designer & realtor partners, and contractor certifications. Houston luxury bathroom remodeling.",
    bodyHtml: `
      <h1>BoldREMO Press, Partners &amp; Recognition</h1>
      <p>BoldREMO partners with Houston's leading suppliers, designers, and realtors to deliver luxury bathroom remodels across Heights, Bellaire, River Oaks, Kingwood, and beyond.</p>
      <h2>As Featured In</h2>
      <p>Recent and upcoming media coverage includes Houstonia Magazine, PaperCity, Houston Chronicle Home &amp; Garden, CultureMap Houston, Houston Modern Luxury, and the Houston Business Journal.</p>
      <h2>Trusted Partners</h2>
      <p>BoldREMO sources premium tile, stone, and plumbing fixtures from Daltile Houston, Cosentino, Ferguson Bath Kitchen &amp; Lighting, and Architectural Design Resource. We work alongside Houston's top interior designers and luxury realtors.</p>
      <h2>Certifications</h2>
      <p>Licensed and insured Texas contractor (TDLR registered), BBB accredited, Houzz Pro member, NARI Houston member.</p>
      <p>Call BoldREMO at (832) 513-5737 or email info@boldremo.com.</p>
    `,
  },
  "/realtors-designers": {
    path: "/realtors-designers",
    title: "Realtor & Designer Partnerships | BoldREMO Houston",
    description:
      "Refer your clients to BoldREMO. Earn referral fees, give clients trade-priority scheduling, and partner with Houston's luxury bathroom remodeler.",
    bodyHtml: `
      <h1>For Realtors, Interior Designers &amp; Architects</h1>
      <p>BoldREMO partners with Houston's top realtors, interior designers, and architects across Heights, Bellaire, River Oaks, Kingwood, and Memorial. Refer your clients with confidence.</p>
      <h2>Why partner with BoldREMO</h2>
      <p>Generous referral fees on every closed project. Trade-priority scheduling for your clients. Professional after photos for your listings and portfolio. White-glove client experience that protects your reputation.</p>
      <h2>How partnership works</h2>
      <p>1. Apply through our partnership form. 2. Quick 15-minute intro call to align on referral terms. 3. Start referring clients and earning fees on closed projects.</p>
      <h2>Co-marketing benefits</h2>
      <p>Featured logo and link on our Press &amp; Partners page, trade pricing on the $75 in-home design consult, joint social media features, first access to project photography, and a quarterly partner email with Houston market trends.</p>
      <p>Apply today or call BoldREMO at (832) 513-5737.</p>
    `,
  },
  "/service-areas/kingwood": {
    path: "/service-areas/kingwood",
    title: "Bathroom Remodeling Kingwood TX | BoldREMO",
    description:
      "Kingwood bathroom remodeling experts. BoldREMO delivers quality craftsmanship and attention to detail for Kingwood homeowners. Call (832) 513-5737.",
    bodyHtml: `
      <h1>Bathroom Remodeling in Kingwood, TX</h1>
      <p>BoldREMO serves Kingwood homeowners with quality bathroom remodeling and renovation services. Known as Houston's "Livable Forest," Kingwood combines suburban tranquility with refined home interiors.</p>
      <h2>Kingwood Bathroom Renovation Services</h2>
      <p>Full bathroom remodels, custom tile and shower installation, vanity upgrades, accessibility renovations, and complete spa-style transformations for Kingwood homes.</p>
      <p>Call BoldREMO at (832) 513-5737 to book your Kingwood bathroom consult.</p>
    `,
  },
};

/** Render the SEO content as a hidden HTML block (for crawlers). */
export function renderSeoFallback(path: string): string {
  const seo = ROUTE_SEO[path];
  if (!seo) return "";
  return `<div style="${HIDDEN_STYLE}" aria-hidden="true">${seo.bodyHtml}</div>`;
}
