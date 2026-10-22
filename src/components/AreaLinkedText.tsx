import { Fragment } from "react";
import { Link } from "react-router-dom";

const AREA_ROUTES: Record<string, string> = {
  Houston: "/service-areas/houston",
  Heights: "/service-areas/heights",
  Bellaire: "/service-areas/bellaire",
  "River Oaks": "/service-areas/river-oaks",
  Kingwood: "/service-areas/kingwood",
  Memorial: "/service-areas/memorial",
};

const pattern = new RegExp(`\\b(${Object.keys(AREA_ROUTES).join("|")})\\b`, "g");

/** Renders text with each service-area name linked to its area page (first mention only). */
export const AreaLinkedText = ({ text }: { text: string }) => {
  const seen = new Set<string>();
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) => {
        const route = AREA_ROUTES[part];
        if (!route || seen.has(part)) return <Fragment key={i}>{part}</Fragment>;
        seen.add(part);
        return (
          <Link key={i} to={route} className="text-primary underline underline-offset-2 hover:text-primary/80">
            {part}
          </Link>
        );
      })}
    </>
  );
};
