import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Footer = () => {
  const socialLinks = [
    { href: "https://www.facebook.com/BoldREMOllc/", label: "Facebook", icon: Facebook },
    { href: "https://www.instagram.com/boldremo_llc/", label: "Instagram", icon: Instagram },
    { href: "https://www.tiktok.com/@boldremo_llc?is_from_webapp=1&sender_device=pc", label: "TikTok", icon: TikTokIcon },
    { href: "https://youtube.com/@boldremo?si=JovZ4ob_r1JAzd3j", label: "YouTube", icon: Youtube },
    { href: "https://www.linkedin.com/company/boldremo", label: "LinkedIn", icon: Linkedin },
  ];
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold text-primary-foreground">
                Bold<span className="text-secondary">REMO</span>
              </span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Houston's Premier Bathroom Remodeling Company. Proudly serving Houston, Heights, Bellaire, River Oaks & Kingwood.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
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
            © {new Date().getFullYear()} BoldREMO. All rights reserved. | Bathroom Remodeling in Houston, Heights, Bellaire, River Oaks & Kingwood
          </p>
        </div>
      </div>
    </footer>
  );
};
