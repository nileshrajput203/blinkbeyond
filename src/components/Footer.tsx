import { useEffect, useRef } from "react";
import { Linkedin, Facebook, Instagram, Phone, ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "HOME", href: "#" },
    { label: "About", href: "#about" },
    { label: "contact", href: "#contact" },
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
      <div className="container mx-auto">
        <div ref={contentRef} className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="flex items-center opacity-0">
            <span className="text-2xl font-heading font-bold tracking-tight flex items-center gap-2">
              <span className="text-footer-foreground">▸▸</span>
              <span>
                <span className="text-footer-foreground">Blink</span>
                <span className="text-footer-foreground/60">Beyond</span>
              </span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-12 opacity-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-footer-foreground/70 hover:text-footer-foreground transition-colors duration-200 text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links Pill */}
          <div className="flex items-center gap-5 bg-secondary/60 px-8 py-4 rounded-full opacity-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-footer-foreground/80 hover:text-footer-foreground hover:scale-110 transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-footer-foreground font-medium text-sm opacity-0 mt-4">
            @2025 blinkbeyond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
