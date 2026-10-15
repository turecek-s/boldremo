import stanHeadshot from "@/assets/stan-headshot.webp";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const FounderCredibility = () => (
  <section aria-label="Meet Stan" className="border-b border-border bg-background">
    <Link
      to="/about"
      aria-label="Meet Stan: read his story on the About page"
      className="container-custom group flex cursor-pointer items-center gap-4 py-5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:gap-6 md:py-6"
    >
      <img
        src={stanHeadshot}
        alt="Stan, BoldREMO owner and lead craftsman"
        width={72}
        height={72}
        className="h-16 w-16 shrink-0 rounded-full object-cover md:h-[72px] md:w-[72px]"
        decoding="async"
      />
      <div className="min-w-0 flex-1 md:flex md:items-center md:gap-8">
        <div className="shrink-0">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-foreground group-hover:text-primary">
            Meet Stan
            <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          </h2>
          <p className="text-sm text-muted-foreground">Stan · Owner &amp; Lead Craftsman</p>
        </div>
        <p className="mt-2 pr-24 text-sm leading-relaxed text-foreground sm:pr-0 md:mt-0 md:border-l md:border-border md:pl-8 md:text-base">
          I waterproof custom showers with the Schluter system and GoBoard backer.
        </p>
      </div>
    </Link>
  </section>
);