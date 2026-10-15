import stanHeadshot from "@/assets/stan-headshot.webp";

export const FounderCredibility = () => (
  <section aria-label="Meet Stan" className="border-b border-border bg-background">
    <div className="container-custom flex items-center gap-4 py-5 md:gap-6 md:py-6">
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
          <h2 className="text-lg font-semibold text-foreground">Meet Stan</h2>
          <p className="text-sm text-muted-foreground">Stan · Owner &amp; Lead Craftsman</p>
        </div>
        <p className="mt-2 pr-24 text-sm leading-relaxed text-foreground sm:pr-0 md:mt-0 md:border-l md:border-border md:pl-8 md:text-base">
          Custom showers waterproofed with the Schluter system and GoBoard backer.
        </p>
      </div>
    </div>
  </section>
);