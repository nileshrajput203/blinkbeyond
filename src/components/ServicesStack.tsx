import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = useMemo(
    () => [
      {
        name: "Blink",
        bgClass: "bg-service-blink",
        textClass: "text-primary-foreground",
        description:
          "Rapid ideation & strategy — we turn your vision into actionable plans in record time.",
      },
      {
        name: "Build",
        bgClass: "bg-service-build",
        textClass: "text-primary-foreground",
        description:
          "Development & execution — bringing your digital product to life with precision and care.",
      },
      {
        name: "Boom",
        bgClass: "bg-service-boom",
        textClass: "text-muted-foreground",
        description:
          "Launch & growth — amplifying your reach with data-driven marketing strategies.",
      },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
      
      if (cards.length !== services.length) return;

      // Initial state - stack cards with offset, first card expanded
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i * 60, // Stack offset
          zIndex: services.length - i,
          scale: 1 - i * 0.02,
        });
        
        // First card content visible, rest hidden
        if (i === 0) {
          gsap.set(contents[i], { autoAlpha: 1, y: 0 });
        } else {
          gsap.set(contents[i], { autoAlpha: 0, y: 30 });
        }
      });

      const totalScroll = window.innerHeight * 2.5;

      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Card 1 (Blink) - shrink and move up as Build comes
      tl.to(cards[0], {
        y: -80,
        scale: 0.9,
        filter: "blur(2px)",
        duration: 1,
        ease: "power2.inOut",
      }, 0);
      
      tl.to(contents[0], {
        autoAlpha: 0,
        y: -20,
        duration: 0.4,
      }, 0);

      // Card 2 (Build) - slide up and overlap
      tl.to(cards[1], {
        y: 0,
        scale: 1,
        zIndex: 10,
        duration: 1,
        ease: "power2.inOut",
      }, 0);
      
      tl.to(contents[1], {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      }, 0.5);

      // Card 3 (Boom) - move closer
      tl.to(cards[2], {
        y: 60,
        scale: 0.98,
        duration: 1,
        ease: "power2.inOut",
      }, 0);

      // === Second phase: Boom overlaps Build ===
      
      // Build shrinks and moves up
      tl.to(cards[1], {
        y: -80,
        scale: 0.9,
        filter: "blur(2px)",
        duration: 1,
        ease: "power2.inOut",
      }, 1.2);
      
      tl.to(contents[1], {
        autoAlpha: 0,
        y: -20,
        duration: 0.4,
      }, 1.2);

      // Boom slides up and overlaps
      tl.to(cards[2], {
        y: 0,
        scale: 1,
        zIndex: 20,
        duration: 1,
        ease: "power2.inOut",
      }, 1.2);
      
      tl.to(contents[2], {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      }, 1.7);

      // Blink moves further up
      tl.to(cards[0], {
        y: -160,
        scale: 0.85,
        filter: "blur(4px)",
        duration: 1,
        ease: "power2.inOut",
      }, 1.2);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen bg-background overflow-hidden isolate relative z-30 py-20"
      aria-label="Our services"
    >
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
          Our Services
        </h2>

        {/* Cards container */}
        <div className="relative h-[450px] perspective-1000">
          {services.map((service, index) => (
            <div
              key={service.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`absolute inset-x-0 ${service.bgClass} ${service.textClass} rounded-3xl shadow-2xl overflow-hidden will-change-transform`}
              style={{
                height: "420px",
                transformOrigin: "center top",
              }}
            >
              {/* Card inner content */}
              <div className="h-full p-8 md:p-10 flex flex-col">
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  {service.name}
                </h3>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-6">
                    <p className="text-base md:text-lg opacity-90 leading-relaxed">
                      {service.description}
                    </p>
                    <button
                      className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold bg-background/20 hover:bg-background/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      type="button"
                    >
                      Learn More →
                    </button>
                  </div>

                  <div className="w-full h-48 md:h-64 rounded-2xl bg-background/10 backdrop-blur-sm overflow-hidden border border-white/10">
                    <div className="w-full h-full bg-gradient-to-br from-background/30 to-background/5 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 mx-auto rounded-xl bg-background/20 flex items-center justify-center">
                          <span className="text-2xl">
                            {index === 0 ? "⚡" : index === 1 ? "🔧" : "🚀"}
                          </span>
                        </div>
                        <span className="text-sm opacity-60 block">
                          {service.name} Preview
                        </span>
                      </div>
                    </div>
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
