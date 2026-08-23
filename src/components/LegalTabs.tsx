import { Link, useLocation } from "react-router-dom";

const tabs = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms" },
];

/** Underline-style tab bar linking the two legal pages. */
export const LegalTabs = () => {
  const { pathname } = useLocation();

  return (
    <div className="border-b border-border bg-background">
      <div className="container-custom">
        <nav aria-label="Legal pages" className="flex justify-center gap-8">
          {tabs.map((tab) => {
            const isActive = pathname.replace(/\/$/, "") === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                aria-current={isActive ? "page" : undefined}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
