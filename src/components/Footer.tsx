import { ModemAnimatedFooter } from "@/components/ui/modem-animated-footer";
import { Linkedin, Facebook, Instagram, Phone } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "#",
      label: "Facebook",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: "#",
      label: "WhatsApp",
    },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <ModemAnimatedFooter
      brandName="BlinkBeyond"
      brandDescription="Transforming ideas into digital excellence. We craft innovative solutions that drive growth and elevate your brand to new heights."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="BlinkBeyond Team"
      creatorUrl="/"
      brandIcon={
        <span className="text-4xl font-heading font-bold">▸▸</span>
      }
    />
  );
};

export default Footer;
