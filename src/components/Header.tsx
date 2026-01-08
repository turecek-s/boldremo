import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const BoldRemoLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="currentColor" />
    <path 
      d="M12 10H22C24.5 10 26.5 11 27.8 12.5C29 14 29.5 16 29 18C28.5 20 27 21.5 25 22.5C27.5 23 29.5 24.5 30 27C30.5 29.5 29 32 26 33H12V10ZM17 14V19H21C22.5 19 23.5 18 23.5 16.5C23.5 15 22.5 14 21 14H17ZM17 23V29H22C24 29 25.5 28 25.5 26C25.5 24 24 23 22 23H17Z" 
      fill="white"
    />
  </svg>
);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Resources", path: "/resources" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-custom flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="BoldREMO Home">
          <BoldRemoLogo className="h-9 w-9 text-primary" />
          <span className="text-2xl font-serif">
            <span className="font-extrabold text-primary">Bold</span>
            <span className={`font-medium ${isScrolled ? "text-foreground" : "text-primary"}`}>REMO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
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
          <Button asChild variant="default" size="sm">
            <Link to="/contact">Contact Us</Link>
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
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium py-2 transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
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
                Contact Us
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
