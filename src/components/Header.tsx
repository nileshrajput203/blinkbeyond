import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDarkPage = location.pathname === "/services" || location.pathname === "/about";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ];

  // On homepage: transparent initially, backdrop on scroll
  // On dark pages: dark background
  // On other pages: light background
  const getHeaderStyles = () => {
    if (isDarkPage) {
      return "bg-service-blink/80 border-primary-foreground/10 backdrop-blur-md";
    }
    if (isHomePage) {
      return isScrolled 
        ? "bg-background/80 border-border/50 backdrop-blur-md" 
        : "bg-transparent border-transparent";
    }
    return "bg-background/80 border-border/50 backdrop-blur-md";
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${getHeaderStyles()}`}>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl font-heading font-bold tracking-tight">
                <span className={(isDarkPage || (isHomePage && !isScrolled)) ? "text-white" : "text-foreground"}>▸▸</span>
                <span className={`ml-1 ${(isDarkPage || (isHomePage && !isScrolled)) ? "text-white" : "text-foreground"}`}>Blink</span>
                <span className={(isDarkPage || (isHomePage && !isScrolled)) ? "text-white/60" : "text-muted-foreground"}>Beyond</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`nav-link text-lg ${
                  (isDarkPage || (isHomePage && !isScrolled))
                    ? "text-white hover:text-white/80" 
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${(isDarkPage || (isHomePage && !isScrolled)) ? "text-white" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-20 left-0 right-0 border-b animate-fade-in ${
          isDarkPage 
            ? "bg-service-blink border-primary-foreground/10" 
            : "bg-background border-border"
        }`}>
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-lg font-medium py-2 ${
                  isDarkPage ? "text-primary-foreground" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
