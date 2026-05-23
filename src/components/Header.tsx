import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const resourceLinks = [
  { name: "Cost Calculator", path: "/resources#cost-calculator" },
  { name: "In-Depth Guides", path: "/resources#guides" },
  { name: "Remodel Checklist", path: "/resources#checklist" },
  { name: "Quick Tips from Pros", path: "/resources#tips" },
  { name: "Houston Remodeling Guide", path: "/resources#houston-guide" },
];

const serviceAreaLinks = [
  { name: "Houston", path: "/service-areas/houston" },
  { name: "The Heights", path: "/service-areas/heights" },
  { name: "River Oaks", path: "/service-areas/river-oaks" },
  { name: "Bellaire", path: "/service-areas/bellaire" },
  { name: "Kingwood", path: "/service-areas/kingwood" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAreasOpen, setIsAreasOpen] = useState(false);
  const [isMobileAreasOpen, setIsMobileAreasOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsAreasOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(e.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServiceAreaActive = location.pathname.startsWith("/service-areas");
  const isResourcesActive = location.pathname === "/resources";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 md:backdrop-blur-md shadow-sm py-3"
          : "bg-background/80 md:backdrop-blur-sm py-5"
      }`}
    >
      <nav className="container-custom flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2" 
          aria-label="BoldREMO Home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="text-2xl font-serif flex items-center gap-2">
            <span className="font-extrabold text-primary">Bold</span>
            <span className="h-5 w-px bg-border" aria-hidden="true" />
            <span className={`font-medium ${isScrolled ? "text-foreground" : "text-primary"}`}>REMO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  if (link.path === "/" || location.pathname === link.path) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : isScrolled
                    ? "text-foreground"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <span className="h-5 w-px bg-border" aria-hidden="true" />

          {/* Resources Dropdown */}
          <div className="relative" ref={resourcesDropdownRef}>
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                isResourcesActive
                  ? "text-primary"
                  : isScrolled
                  ? "text-foreground"
                  : "text-foreground/80"
              }`}
              aria-expanded={isResourcesOpen}
              aria-haspopup="true"
            >
              Resources
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`} />
            </button>

            {isResourcesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg z-50 py-2 animate-fade-in">
                <Link
                  to="/resources"
                  onClick={() => {
                    setIsResourcesOpen(false);
                    if (location.pathname === "/resources") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors border-b border-border mb-1"
                >
                  All Resources
                </Link>
                {resourceLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsResourcesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Service Areas Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsAreasOpen(!isAreasOpen)}
              className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                isServiceAreaActive
                  ? "text-primary"
                  : isScrolled
                  ? "text-foreground"
                  : "text-foreground/80"
              }`}
              aria-expanded={isAreasOpen}
              aria-haspopup="true"
            >
              Service Areas
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isAreasOpen ? "rotate-180" : ""}`} />
            </button>

            {isAreasOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50 py-2 animate-fade-in">
                {serviceAreaLinks.map((area) => (
                  <Link
                    key={area.path}
                    to={area.path}
                    onClick={() => setIsAreasOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-muted hover:text-primary ${
                      location.pathname === area.path
                        ? "text-primary bg-muted"
                        : "text-foreground"
                    }`}
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+18325135737"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            aria-label="Call us at (832) 513-5737"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            (832) 513-5737
          </a>
          <span className="h-5 w-px bg-border" aria-hidden="true" />
          <Button asChild variant="default" size="sm">
            <Link to="/contact">Book Bathroom Consult</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-t border-border animate-fade-in">
          <nav className="container-custom py-6 flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  setIsOpen(false);
                  if (link.path === "/" || location.pathname === link.path) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Resources Accordion */}
            <div>
              <button
                onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                className={`flex items-center justify-between w-full text-base font-medium py-2 transition-colors hover:text-primary ${
                  isResourcesActive ? "text-primary" : "text-foreground"
                }`}
                aria-expanded={isMobileResourcesOpen}
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileResourcesOpen && (
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <Link
                    to="/resources"
                    onClick={() => {
                      setIsOpen(false);
                      setIsMobileResourcesOpen(false);
                      if (location.pathname === "/resources") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
                  >
                    All Resources
                  </Link>
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileResourcesOpen(false);
                      }}
                      className="text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Service Areas Accordion */}
            <div>
              <button
                onClick={() => setIsMobileAreasOpen(!isMobileAreasOpen)}
                className={`flex items-center justify-between w-full text-base font-medium py-2 transition-colors hover:text-primary ${
                  isServiceAreaActive ? "text-primary" : "text-foreground"
                }`}
                aria-expanded={isMobileAreasOpen}
              >
                Service Areas
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileAreasOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileAreasOpen && (
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  {serviceAreaLinks.map((area) => (
                    <Link
                      key={area.path}
                      to={area.path}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileAreasOpen(false);
                      }}
                      className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                        location.pathname === area.path
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="tel:+18325135737"
              className="flex items-center gap-2 text-base font-medium text-primary py-2"
              aria-label="Call us at (832) 513-5737"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              (832) 513-5737
            </a>
            <Button asChild className="mt-4 w-full">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Book Bathroom Consult
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
