"use client";
import React from "react";
import { Link } from "react-router-dom";
import { NotepadTextDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const ModemAnimatedFooter = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        "relative bg-footer text-footer-foreground overflow-hidden",
        className
      )}
    >
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center">
            {/* Brand Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center">
                  <span className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                    {brandName}
                  </span>
                </div>
              </div>

              <p className="text-footer-foreground/70 max-w-md mx-auto text-sm md:text-base">
                {brandDescription}
              </p>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 mb-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-secondary/40 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                    aria-label={link.label}
                  >
                    <span className="text-footer-foreground/80 group-hover:text-primary transition-colors duration-300">
                      {link.icon}
                    </span>
                    <span className="sr-only">{link.label}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Navigation Links */}
            {navLinks.length > 0 && (
              <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-footer-foreground/70 hover:text-footer-foreground text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-footer-foreground/10">
            <p className="text-footer-foreground/60 text-sm">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>

            {creatorName && creatorUrl && (
              <p className="text-footer-foreground/60 text-sm">
                <a
                  href={creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Crafted by {creatorName}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[20vw] font-heading font-bold text-footer-foreground/[0.03] whitespace-nowrap select-none">
            {brandName.toUpperCase()}
          </span>
        </div>

        {/* Bottom logo watermark */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="opacity-10">
            {brandIcon || (
              <NotepadTextDashed className="w-16 h-16 text-footer-foreground" />
            )}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Bottom shadow glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-primary/10 blur-3xl rounded-full" />
      </div>
    </footer>
  );
};
