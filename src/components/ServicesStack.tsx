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
      bgClass: "bg-service-blink",
      textClass: "text-primary-foreground",
      height: "h-[200px] md:h-[260px]",
    },
    {
      name: "Build",
      bgClass: "bg-service-build",
      textClass: "text-primary-foreground",
      height: "h-[60px] md:h-[80px]",
    },
    {
      name: "Boom",
      bgClass: "bg-service-boom",
      textClass: "text-muted-foreground",
      height: "h-[50px] md:h-[60px]",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section ref={sectionRef} id="services" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="text-2xl md:text-3xl font-heading font-bold text-center mb-10 opacity-0"
        >
          Our Services
        </h2>

        <div ref={cardsRef} className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.name}
              className={`service-card ${service.bgClass} ${service.textClass} ${service.height} flex items-center justify-center px-8 opacity-0 cursor-pointer`}
              style={{
                borderRadius:
                  index === 0
                    ? "1.5rem 1.5rem 0 0"
                    : index === services.length - 1
                    ? "0 0 1.5rem 1.5rem"
                    : "0",
              }}
            >
              <h3 className="text-xl md:text-2xl font-heading font-bold">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStack;
