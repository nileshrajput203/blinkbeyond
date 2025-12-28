import { useEffect, useRef } from "react";
import { Linkedin, Facebook, Instagram, Phone, ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (children) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-footer text-footer-foreground py-16 px-6 relative"
    >
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-footer-foreground/20 transition-colors duration-200 group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-footer-foreground group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-200" />
      </button>

      <div className="container mx-auto">
        <div ref={contentRef} className="flex flex-col items-center gap-10">
          {/* Logo */}
          <div className="flex items-center opacity-0">
            <span className="text-2xl font-heading font-bold tracking-tight">
              <span className="text-footer-foreground">▸▸</span>
              <span className="text-footer-foreground ml-1">Blink</span>
              <span className="text-footer-foreground/60">Beyond</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8 opacity-0">
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
          <div className="flex items-center gap-6 bg-secondary/50 px-6 py-3 rounded-full opacity-0">
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
          <p className="text-footer-foreground/60 text-sm opacity-0">
            @2025 blinkbeyond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
