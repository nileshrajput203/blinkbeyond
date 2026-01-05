import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, Zap } from "lucide-react";
import { MagneticText } from "@/components/ui/morphing-cursor";

gsap.registerPlugin(ScrollTrigger);

const AboutServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const aboutServices = [
    { text: "Creative", hoverText: "Innovative" },
    { text: "Strategic", hoverText: "Results-Driven" },
    { text: "Reliable", hoverText: "Always There" },
  ];

  const ourServices = [
    { text: "Shopify", hoverText: "E-Commerce" },
    { text: "Web Dev", hoverText: "Custom Sites" },
    { text: "Social Media", hoverText: "Engagement" },
    { text: "Branding", hoverText: "Identity" },
  ];

  const cards = [
    {
      title: "ABOUT US",
      subtitle: "The minds behind the magic",
      description: "A team of creative thinkers and tech enthusiasts building digital experiences that matter.",
      href: "/about",
      icon: Users,
      magneticItems: aboutServices,
      gradient: "from-primary/20 via-primary/10 to-transparent",
      accentColor: "bg-primary",
    },
    {
      title: "OUR SERVICES", 
      subtitle: "What we bring to the table",
      description: "From concept to launch, we craft digital solutions that drive growth and engagement.",
      href: "/services",
      icon: Zap,
      magneticItems: ourServices,
      gradient: "from-accent/20 via-accent/10 to-transparent",
      accentColor: "bg-accent",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current?.children;
      if (cardElements) {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 100, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="group relative bg-card rounded-3xl p-8 md:p-10 min-h-[380px] md:min-h-[440px] flex flex-col justify-between hover-lift opacity-0 overflow-hidden border border-border/50 hover:border-border transition-all duration-500"
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Accent line */}
                <div className={`absolute top-0 left-8 right-8 h-1 ${card.accentColor} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${card.accentColor}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-foreground" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    {card.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-muted-foreground text-sm font-medium mb-4">
                    {card.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-foreground/70 text-base leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Magnetic Text Items */}
                  <div className="flex flex-wrap gap-3">
                    {card.magneticItems.map((item, index) => (
                      <MagneticText
                        key={index}
                        text={item.text}
                        hoverText={item.hoverText}
                        className="text-sm md:text-base px-4 py-2 rounded-full bg-muted/50 border border-border/50"
                      />
                    ))}
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center justify-between mt-6">
                  {/* CTA Link */}
                  <Link
                    to={card.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Learn more
                  </Link>
                  
                  {/* Arrow */}
                  <Link
                    to={card.href}
                    className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-110"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
