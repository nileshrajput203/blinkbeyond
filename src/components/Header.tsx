import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Briefcase, Users, Mail } from "lucide-react";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isDarkPage = location.pathname === "/services" || location.pathname === "/about";

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Services", url: "/services", icon: Briefcase },
    { name: "About", url: "/about", icon: Users },
    { name: "Contact", url: "/#contact", icon: Mail },
  ];

  return (
    <>
      {/* Top Header with Logo */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${
        isDarkPage 
          ? "bg-service-blink/80 border-primary-foreground/10" 
          : "bg-background/80 border-border/50"
      }`}>
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-2xl font-heading font-bold tracking-tight">
                  <span className={isDarkPage ? "text-primary-foreground" : "text-foreground"}>▸▸</span>
                  <span className={`ml-1 ${isDarkPage ? "text-primary-foreground" : "text-foreground"}`}>Blink</span>
                  <span className={isDarkPage ? "text-primary-foreground/60" : "text-muted-foreground"}>Beyond</span>
                </span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 ${isDarkPage ? "text-primary-foreground" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop - Empty space for symmetry */}
            <div className="hidden md:block w-32" />
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`text-lg font-medium py-2 flex items-center gap-3 ${
                    isDarkPage ? "text-primary-foreground" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Floating Anime NavBar - Desktop Only */}
      <div className="hidden md:block">
        <AnimeNavBar items={navItems} defaultActive="Home" />
      </div>
    </>
  );
};

export default Header;
