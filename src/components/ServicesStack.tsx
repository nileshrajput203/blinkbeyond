import { useEffect, useRef } from "react";
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
      description: "Lightning-fast prototyping and MVP development",
      bgClass: "bg-service-blink",
      textClass: "text-primary-foreground",
      height: "h-[280px] md:h-[320px]",
    },
    {
      name: "Build",
      description: "Full-scale development and implementation",
      bgClass: "bg-service-build",
      textClass: "text-primary-foreground",
      height: "h-[80px] md:h-[100px]",
    },
    {
      name: "Boom",
      description: "Launch, scale, and grow your digital presence",
      bgClass: "bg-service-boom",
      textClass: "text-foreground",
      height: "h-[100px] md:h-[120px]",
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
          { opacity: 0, y: 60, scale: 0.95 },
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
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 opacity-0"
        >
          Our Services
        </h2>

        <div ref={cardsRef} className="max-w-3xl mx-auto space-y-0">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`service-card ${service.bgClass} ${service.textClass} ${service.height} flex flex-col items-center justify-center px-8 opacity-0`}
              style={{
                borderRadius:
                  index === 0
                    ? "1.5rem 1.5rem 0 0"
                    : index === services.length - 1
                    ? "0 0 1.5rem 1.5rem"
                    : "0",
              }}
            >
              <h3 className="text-2xl md:text-4xl font-heading font-bold mb-2">
                {service.name}
              </h3>
              <p className="text-sm md:text-base opacity-80 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStack;
