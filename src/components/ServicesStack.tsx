import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      name: "Blink",
      bgClass: "bg-service-blink",
      textClass: "text-primary-foreground",
      height: "h-[200px] md:h-[260px]",
      speed: 100, // Fastest - moves most
    },
    {
      name: "Build",
      bgClass: "bg-service-build",
      textClass: "text-primary-foreground",
      height: "h-[60px] md:h-[80px]",
      speed: 60, // Medium speed
    },
    {
      name: "Boom",
      bgClass: "bg-service-boom",
      textClass: "text-muted-foreground",
      height: "h-[50px] md:h-[60px]",
      speed: 30, // Slowest - moves least
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

      // Parallax effect for each card - they scroll up at different speeds
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const speed = services[index].speed;

        gsap.to(card, {
          yPercent: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Initial fade-in animation
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-16 px-6 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="text-2xl md:text-3xl font-heading font-bold text-center mb-10 opacity-0"
        >
          Our Services
        </h2>

        <div className="relative">
          {services.map((service, index) => (
            <div
              key={service.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`service-card ${service.bgClass} ${service.textClass} ${service.height} flex items-center justify-center px-8 opacity-0 cursor-pointer relative`}
              style={{
                borderRadius:
                  index === 0
                    ? "1.5rem 1.5rem 0 0"
                    : index === services.length - 1
                    ? "0 0 1.5rem 1.5rem"
                    : "0",
                zIndex: services.length - index,
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
