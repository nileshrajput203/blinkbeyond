import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      name: "Blink",
      description: "Lightning-fast prototyping and MVP development. We transform your ideas into tangible products within days, not months.",
      features: ["Rapid Prototyping", "MVP Development", "Design Sprints"],
    },
    {
      name: "Build",
      description: "Full-scale development and implementation. From web apps to e-commerce, we build scalable solutions that grow with you.",
      features: ["Web Development", "E-commerce", "Custom Solutions"],
    },
    {
      name: "Boom",
      description: "Launch, scale, and grow your digital presence. We help you reach your audience and convert visitors into customers.",
      features: ["Growth Strategy", "Performance Marketing", "Analytics"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards staggered animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-heading font-bold mb-4 opacity-0"
          >
            services
          </h2>
          <p className="text-muted-foreground text-lg">what we do ?</p>
        </div>

        <div ref={cardsRef} className="max-w-4xl mx-auto space-y-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="group bg-background border-2 border-foreground rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-stretch hover-lift opacity-0 cursor-pointer"
            >
              {/* Dark Icon Box */}
              <div className="bg-service-blink rounded-2xl p-6 md:p-8 flex flex-col justify-between min-w-[200px] md:min-w-[240px] min-h-[180px] md:min-h-[200px]">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">
                  {service.name}
                </h3>
                <button className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm mt-auto group/btn">
                  Learn more...
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStack;
