import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold text-primary-foreground">
                BOLD<span className="text-secondary">REMO</span>
              </span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Houston's Premier Bathroom Remodeling Company. Transform your space into a reflection of your style.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/boldremo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/boldremo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Gallery", path: "/gallery" },
                  { name: "About Us", path: "/about" },
                  { name: "Services", path: "/services" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Bathroom Remodeling",
                "Tile & Flooring",
                "Custom Showers",
                "Vanity Installation",
                "Full Renovations",
              ].map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/80 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic space-y-4">
              <a
                href="tel:+18325135737"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                (832) 513-5737
              </a>
              <a
                href="mailto:info@boldremo.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                info@boldremo.com
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Houston, Texas</span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} BoldRemo. All rights reserved. | Luxury Bathroom Remodeling in Houston, TX
          </p>
        </div>
      </div>
    </footer>
  );
};
