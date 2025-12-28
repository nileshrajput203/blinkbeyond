import { Linkedin, Facebook, Instagram, Phone } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Phone, href: "#", label: "WhatsApp" },
  ];

  return (
    <footer id="contact" className="bg-footer text-footer-foreground py-16 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-10">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-heading font-bold tracking-tight">
              <span className="text-footer-foreground">▸▸</span>
              <span className="text-footer-foreground ml-1">Blink</span>
              <span className="text-footer-foreground/60">Beyond</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-footer-foreground/80 hover:text-footer-foreground transition-colors duration-200 text-sm uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6 bg-secondary/50 px-6 py-3 rounded-full">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-footer-foreground/80 hover:text-footer-foreground transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-footer-foreground/60 text-sm">
            @2025 blinkbeyond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
