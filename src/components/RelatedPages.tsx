import { Link } from "@/lib/router-compat";

export type RelatedLink = { label: string; to: string };

/** Small crawlable "Related pages" link list used at the end of content pages. */
export const RelatedPages = ({ links, className = "" }: { links: RelatedLink[]; className?: string }) => (
  <nav aria-label="Related pages" className={className}>
    <h2 className="text-xl font-serif font-semibold text-foreground mb-3">Related pages</h2>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className="text-primary underline underline-offset-2 hover:text-primary/80">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
