import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      name: "Blink",
      bgClass: "bg-service-blink",
      textClass: "text-primary-foreground",
      description: "Rapid ideation & strategy — we turn your vision into actionable plans in record time.",
      collapsedHeight: 80,
      expandedHeight: 400,
    },
    {
      name: "Build",
      bgClass: "bg-service-build",
      textClass: "text-primary-foreground",
      description: "Development & execution — bringing your digital product to life with precision and care.",
      collapsedHeight: 60,
      expandedHeight: 350,
    },
    {
      name: "Boom",
      bgClass: "bg-service-boom",
      textClass: "text-muted-foreground",
      description: "Launch & growth — amplifying your reach with data-driven marketing strategies.",
      collapsedHeight: 50,
      expandedHeight: 300,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calculate total scroll distance
      const totalScrollHeight = services.length * 100; // vh units

      // Create master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScrollHeight}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate each card sequentially
      services.forEach((service, index) => {
        const card = cardsRef.current[index];
        const content = contentRefs.current[index];
        if (!card || !content) return;

        const position = index * 0.33; // Distribute animations across timeline

        // Expand card height
        tl.to(
          card,
          {
            height: service.expandedHeight,
            duration: 0.3,
            ease: "power2.inOut",
          },
          position
        );

        // Fade in and slide up content
        tl.fromTo(
          content,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          position + 0.1
        );
      });

      // Initial fade-in for cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-16 px-6 min-h-screen">
      <div ref={containerRef} className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
          Our Services
        </h2>

        <div className="relative">
          {services.map((service, index) => (
            <div
              key={service.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`service-card ${service.bgClass} ${service.textClass} px-6 md:px-10 py-6 opacity-0 cursor-pointer relative overflow-hidden`}
              style={{
                height: service.collapsedHeight,
                borderRadius:
                  index === 0
                    ? "1.5rem 1.5rem 0 0"
                    : index === services.length - 1
                    ? "0 0 1.5rem 1.5rem"
                    : "0",
                zIndex: services.length - index,
              }}
            >
              {/* Title - Always visible */}
              <h3 className="text-xl md:text-2xl font-heading font-bold mb-4">
                {service.name}
              </h3>

              {/* Content - Revealed on scroll */}
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="opacity-0 flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Text content */}
                <div className="flex-1 space-y-4">
                  <p className="text-sm md:text-base opacity-90 leading-relaxed">
                    {service.description}
                  </p>
                  <button className="px-4 py-2 bg-background/20 hover:bg-background/30 rounded-lg text-sm font-medium transition-colors">
                    Learn More →
                  </button>
                </div>

                {/* Image placeholder */}
                <div className="w-full md:w-1/2 h-32 md:h-48 rounded-xl bg-background/10 flex items-center justify-center">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
                    <span className="text-sm opacity-50">Image Mockup</span>
                  </div>
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
