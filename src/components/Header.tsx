import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const serviceLinks = [
  { name: "Tub to Shower Conversion", path: "/tub-to-shower-conversion-houston" },
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
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
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServiceAreaActive = location.pathname.startsWith("/service-areas");
  const isResourcesActive = location.pathname === "/resources";
  const isServicesActive =
    location.pathname === "/services" ||
    serviceLinks.some((s) => s.path === location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 lg:py-5 transition-colors duration-300 ${
        isScrolled
          ? "bg-background/95 md:backdrop-blur-md shadow-sm"
          : "bg-background/80 md:backdrop-blur-sm"
      }`}
    >
      <nav className="container-custom relative flex items-center justify-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6" aria-label="Main navigation">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
          aria-label="BoldREMO Home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="flex flex-col items-center bg-primary px-3 py-1.5 rounded-lg shadow-lg shadow-primary/20 ring-1 ring-primary-foreground/10">
            <span className="text-2xl font-serif tracking-tight leading-none">
              <span className="font-extrabold text-primary-foreground">Bold</span>
              <span className="font-semibold text-secondary">REMO</span>
            </span>
            <span className="flex justify-between w-full text-[6px] font-medium uppercase text-primary-foreground/70 mt-0.5 leading-tight whitespace-nowrap">
              {"LUXURY BATHROOM REMODELING".split("").map((ch, i) => (
                <span key={i}>{ch === " " ? "\u00A0" : ch}</span>
              ))}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center gap-6">
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


          {/* Services Dropdown */}
          <div className="relative" ref={servicesDropdownRef}>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                isServicesActive
                  ? "text-primary"
                  : isScrolled
                  ? "text-foreground"
                  : "text-foreground/80"
              }`}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-md shadow-lg z-50 py-2 animate-fade-in">
                <Link
                  to="/services"
                  onClick={() => {
                    setIsServicesOpen(false);
                    if (location.pathname === "/services") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors border-b border-border mb-1"
                >
                  All Services
                </Link>
                {serviceLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsServicesOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-muted hover:text-primary ${
                      location.pathname === item.path ? "text-primary bg-muted" : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

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



        {/* Desktop right spacer to balance grid */}
        <div className="hidden lg:block" aria-hidden="true" />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden absolute right-0 p-2 text-foreground"
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

            {/* Mobile Services Accordion */}
            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`flex items-center justify-between w-full text-base font-medium py-2 transition-colors hover:text-primary ${
                  isServicesActive ? "text-primary" : "text-foreground"
                }`}
                aria-expanded={isMobileServicesOpen}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileServicesOpen && (
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <Link
                    to="/services"
                    onClick={() => {
                      setIsOpen(false);
                      setIsMobileServicesOpen(false);
                      if (location.pathname === "/services") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
                  >
                    All Services
                  </Link>
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className={`text-sm font-medium py-2 transition-colors hover:text-primary ${
                        location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
          </nav>
        </div>
      )}
    </header>
  );
};
